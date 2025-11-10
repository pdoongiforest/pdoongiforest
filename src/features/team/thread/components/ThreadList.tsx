import { useAuth } from '@/features/auth/AuthProvider';
import { IsMineProvider } from '@/shared/context/isMine';
import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';
import { useEffect, useState } from 'react';
import ThreadContent from './ThreadContent';

type ThreadReply = Tables<'thread_reply'>;
type User = Tables<'user_profile'> & {
  user_base: Tables<'user_base'>;
};
type ReplyWithUser = ThreadReply & {
  user_profile: User;
};
type ThreadWithUser = Tables<'thread'> & {
  user_profile: Tables<'user_profile'> & {
    user_base: Tables<'user_base'>;
  };
};

interface Props {
  setThreadData: React.Dispatch<React.SetStateAction<ThreadWithUser[]>>;
  threadData: ThreadWithUser[];
  id: string;
}

function ThreadList({ setThreadData, threadData, id }: Props) {
  const [replyData, setReplyData] = useState<Record<string, ReplyWithUser[]>>({});
  const { profileId } = useAuth();

  useEffect(() => {
    if (!id) throw new Error('id가 없습니다');
    if (!profileId) return;

    const fetchData = async () => {
      const { data: ThreadData, error: ThreadError } = await supabase
        .from('thread')
        .select('*')
        .eq('study_id', id)
        .order('created_at', {
          ascending: true,
        });

      if (ThreadError) throw new Error('스레드 데이터 가져오기 실패');
      setThreadData(ThreadData as ThreadWithUser[]);
    };
    fetchData();
  }, [id, profileId]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('thread')
        .select('*')
        .eq('study_id', id)
        .order('created_at', { ascending: true });
      if (error) console.error(error);
      setThreadData(data as ThreadWithUser[]);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const channel = supabase
      .channel('notify-thread')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'thread',
          filter: `study_id=eq.${id}`,
        },
        (payload) => {
          // 실시간 갱신
          setThreadData((prev) => [payload.new as ThreadWithUser, ...prev]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  useEffect(() => {
    const channel = supabase
      .channel('notify-thread_reply')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'thread_reply',
        },
        (payload) => {
          const thread_id = payload.new.thread_id;
          setThreadReplyData(thread_id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  useEffect(() => {
    const fetchInitialReplies = async () => {
      const replies = await Promise.all(
        threadData.map(async (thread) => {
          const { data, error } = await supabase
            .from('thread_reply')
            .select('*')
            .eq('thread_id', thread.thread_id)
            .order('created_at', {
              ascending: true,
            });
          if (error) console.error(error);
          return [thread.thread_id, data || []] as [string, ReplyWithUser[]];
        })
      );

      const replyMap = Object.fromEntries(replies);
      // console.log('replyMap', replyMap);
      setReplyData(replyMap);
    };

    if (threadData.length > 0) {
      fetchInitialReplies();
    }
  }, [threadData]);

  const handleDelete = (targetId: string) => {
    setThreadData(threadData.filter((item) => item.thread_id !== targetId));
  };

  const setThreadReplyData = async (thread_id: string) => {
    const { data, error } = await supabase
      .from('thread_reply')
      .select('*,user_profile(*,user_base(*))')
      .eq('thread_id', thread_id);

    if (error) {
      console.error(error.message);
      return;
    }

    setReplyData((prev) => ({
      ...prev,
      [thread_id]: data as ReplyWithUser[],
    }));
  };
  // 여기서 각 스레드가 해당 요일의 첫 스레드인지 판별하고 그걸 개별 스레드 렌더링때 플래그로 전달해야할듯
  let prevDay = '00';
  const indexingThreadData = threadData.map((thread) => {
    const day = thread.created_at?.slice(8, 10);
    // console.log(day);
    if (day !== prevDay) {
      prevDay = day ?? '';
      return {
        ...thread,
        isFirstThread: true,
      };
    } else
      return {
        ...thread,
        isFirstThread: false,
      };
  });
  // console.log(indexingThreadData);

  return (
    <div className="flex flex-col w-full">
      <ul className="space-y-[34px]">
        {indexingThreadData &&
          indexingThreadData.map((thread) => {
            return (
              <IsMineProvider key={thread.thread_id} writerProfileId={thread.profile_id}>
                <ThreadContent
                  key={thread.thread_id}
                  data={thread}
                  replyData={replyData[thread.thread_id] || []}
                  onDelete={() => handleDelete(thread.thread_id)}
                />
                {/* <ThreadReplyList replyList={replyData[thread.thread_id] || []} /> */}
              </IsMineProvider>
            );
          })}
      </ul>
    </div>
  );
}
export default ThreadList;
