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
    if (!id || !profileId) return;

    const fetchData = async () => {
      const { data: ThreadData, error: ThreadError } = await supabase
        .from('thread')
        .select('*')
        .eq('study_id', id)
        .order('created_at', {
          ascending: false,
        });

      if (ThreadError) throw new Error('스레드 데이터 가져오기 실패');
      setThreadData(ThreadData as ThreadWithUser[]);
    };
    fetchData();
  }, [id, profileId]);

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
          const newThread = payload.new as ThreadWithUser;

          // 내가 만든 스레드면 무시(중복 fetch 방지)
          if (newThread.profile_id === profileId) return;

          // 최신이 하단으로 가도록
          setThreadData((prev) => {
            if (prev.some((t) => t.thread_id === newThread.thread_id)) return prev;
            return [newThread, ...prev];
          });
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
          fetchThreadReplyData(thread_id);
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
      setReplyData(replyMap);
    };

    if (threadData.length > 0) {
      fetchInitialReplies();
    }
  }, [threadData]);

  const fetchThreadReplyData = async (thread_id: string) => {
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

  const handleDelete = (targetId: string) => {
    setThreadData(threadData.filter((item) => item.thread_id !== targetId));
  };

  // 오래된순 -> 최신순으로 패치할때 쓰던 코드
  // const indexingThreadData = threadData.map((thread) => {
  //   const day = thread.created_at?.slice(8, 10);
  //   if (day !== prevDay.current) {
  //     prevDay.current = day ?? '';
  //     return {
  //       ...thread,
  //       isFirstThread: true,
  //     };
  //   } else
  //     return {
  //       ...thread,
  //       isFirstThread: false,
  //     };
  // });

  // 패치가 최신순 ->오래된순으로 가져오기때문에 다음날짜랑 비교해서 firstthread판별
  const indexingThreadData = threadData.map((thread, idx) => {
    const currentDay = thread.created_at?.slice(8, 10);
    const nextDay = threadData[idx + 1]?.created_at?.slice(8, 10);
    const isFirstThread = currentDay !== nextDay;
    return {
      ...thread,
      isFirstThread,
    };
  });
  // console.log({ indexingThreadData });

  return (
    <div className="flex flex-col w-full">
      <ul className="space-y-[10px]">
        {indexingThreadData &&
          indexingThreadData.reverse().map((thread) => {
            return (
              <IsMineProvider key={thread.thread_id} writerProfileId={thread.profile_id}>
                <ThreadContent
                  data={thread}
                  replyData={replyData[thread.thread_id] || []}
                  onDelete={() => handleDelete(thread.thread_id)}
                />
              </IsMineProvider>
            );
          })}
      </ul>
    </div>
  );
}
export default ThreadList;
