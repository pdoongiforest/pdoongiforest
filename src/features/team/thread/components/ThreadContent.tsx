import type { Tables } from '@/supabase/database.types';
import { useEffect, useRef, useState } from 'react';
import supabase from '@/supabase/supabase';
import ProfileIcon from '@/shared/assets/character.png';

import gsap from 'gsap';
import { useIsMine } from '@/shared/context/useIsMine';
import { useAuth } from '@/features/auth/AuthProvider';
import { showConfirmAlert } from '@/shared/utils/sweetAlert';
import { IsMineProvider } from '@/shared/context/isMine';
import ThreadReplyComponent from './ThreadReplyComponent';
import { commentTime } from '../commentTime';
import { getUserData } from '../hooks/getUserData';
import LikeBtn from './LikeBtn';
import { convertDay } from '../convertDay';
import { createPortal } from 'react-dom';

type User = Tables<'user_profile'> & {
  user_base: Tables<'user_base'>;
};

type ReplyWithUser = ThreadReply & {
  user_profile: User;
};

type Thread = Tables<'thread'> & {
  isFirstThread: boolean;
};
type ThreadReply = Tables<'thread_reply'>;
interface Props {
  data: Thread;
  onDelete: () => void;
  replyData?: ReplyWithUser[];
}

type UserData = Tables<'user_profile'>;

export function ThreadContent({ data, onDelete, replyData }: Props) {
  const { isMine } = useIsMine();
  const { profileId } = useAuth();
  const { contents, created_at, thread_id, like_user } = data;
  const [isEditing, setIsEditing] = useState(false);
  const [isReplyPress, setIsReplyPress] = useState(false);
  const [content, setContent] = useState(contents);
  const [editContent, setEditContent] = useState(contents ?? '');
  const [createReply, setCreateReply] = useState<string>('');
  const [reply, setReply] = useState<ReplyWithUser[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const timeStamp = commentTime(created_at ?? '');
  const threadRef = useRef<HTMLLIElement>(null);

  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUserData(data.profile_id);
      setUserData(result);
    };
    fetchUserData();
  }, [data]);
  // console.log('패치해온 유저 데이터', userData);

  useEffect(() => {
    if (threadRef.current) {
      gsap.fromTo(
        threadRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!replyData) return;
    setReply(replyData);
  }, [replyData]);

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent
  ) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (!editContent.trim()) return;

    const { error } = await supabase
      .from('thread')
      .update({
        contents: editContent,
      })
      .eq('thread_id', thread_id);
    setContent(editContent);
    setIsEditing(!isEditing);
    if (error) console.error();
  };

  const handleReplyDelete = (targetId: string) => {
    setReply(reply.filter((item) => item.reply_id !== targetId));
  };

  const handleReply = () => {
    setIsReplyPress(!isReplyPress);
  };

  const handleDelete = () => {
    showConfirmAlert('정말로 댓글을 삭제하시겠습니까', '확인을 누르면 삭제됩니다').then(
      (result) => {
        if (result.isConfirmed) dataDelete();
      }
    );
  };

  const dataDelete = async () => {
    try {
      const { error } = await supabase.from('thread').delete().eq('thread_id', thread_id);
      if (error) console.error(error);
      if (!error) onDelete?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitReply = async () => {
    if (!createReply.trim()) return;

    const { error } = await supabase.from('thread_reply').insert([
      {
        thread_id,
        profile_id: profileId,
        contents: createReply,
        like_user: '',
      },
    ]);
    if (error) console.log(error.message);
    if (!error) setCreateReply('');

    const { data: replies } = await supabase
      .from('thread_reply')
      .select('*,user_profile(*,user_base(*))')
      .eq('thread_id', thread_id);
    if (!replies) return;
    setReply(replies);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!createReply.trim()) return;
      handleSubmitReply();
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!editContent.trim()) return;
      handleSave(e);
    }
  };

  return (
    <li ref={threadRef} className="py-8">
      {data.isFirstThread === true && (
        <div className="flex w-full mb-4">
          <div className="border-b border-border-gray w-full"></div>
          <div className="absolute left-[calc(50%-108px)] top-4 px-6 w-fit bg-gray-300 rounded-2xl text-center py-1">
            <p className="whitespace-nowrap">{convertDay(created_at ?? '')}</p>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        {/* 프로필, 닉네임, 시간 */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-10 h-10 mb-1 flex items-center justify-center rounded-full cursor-pointer bg-white relative"
          >
            <img
              src={userData?.profile_images ?? ProfileIcon}
              alt={'프로필 이미지'}
              className="object-cover w-full h-full"
            />
          </button>
          <div className="flex items-center gap-1">
            <p className="text-center">{userData?.nickname}</p>
            <p className="text-center text-gray-400 text-xs">{timeStamp}</p>
          </div>
        </div>
        {isMine && (
          <div className="space-x-1 text-sm">
            {isEditing ? (
              <>
                <button type="submit" onClick={handleSave}>
                  저장
                </button>
                <button type="button" onClick={() => setIsEditing(!isEditing)}>
                  취소
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setIsEditing(!isEditing)}>
                수정
              </button>
            )}
            <button type="submit" onClick={handleDelete}>
              삭제
            </button>
          </div>
        )}
      </div>

      <div className="pl-11 pb-4">
        {isEditing ? (
          <input
            className="w-full px-3 py-2 text-sm"
            value={editContent}
            onKeyDown={handleEditKeyDown}
            onChange={(e) => setEditContent(e.target.value)}
            autoFocus
          />
        ) : (
          <p className="whitespace-pre-wrap text-xs">{content}</p>
        )}
      </div>

      <div className="flex flex-row gap-7 items-center pl-11">
        <LikeBtn
          likeUser={like_user ?? []}
          targetId={thread_id}
          table="thread"
          columnId="thread_id"
        />

        <button type="button" onClick={handleReply} className=" flex flex-row gap-2">
          <img src="/src/shared/assets/reply.svg" alt="댓글" />
          <span>{reply.length}</span>
        </button>
      </div>

      {isReplyPress &&
        createPortal(
          <div className="fixed z-10 top-20 w-1/3 right-0 h-[calc(100%-120px)] bg-bgc border-l-2 px-8">
            <div className="flex flex-row items-center gap-6 pb-5">
              <button type="button" onClick={() => setIsOpen(false)}>
                <img
                  src="/src/shared/assets/threadBack.svg"
                  alt="뒤로가기"
                  title="뒤로가기"
                  aria-label="뒤로가기"
                />
              </button>
              <p className="text-2xl">스레드</p>
            </div>
            <div className="flex justify-between items-center w-full">
              {/* 프로필, 닉네임, 시간 */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="w-10 h-10 mb-1 flex items-center justify-center rounded-full cursor-pointer bg-white relative"
                >
                  <img
                    src={userData?.profile_images ?? ProfileIcon}
                    alt={'프로필 이미지'}
                    className="object-cover w-full h-full"
                  />
                </button>
                <div className="flex items-center gap-1">
                  <p className="text-center">{userData?.nickname}</p>
                  <p className="text-center text-gray-400 text-xs">{timeStamp}</p>
                </div>
              </div>
              {isMine && (
                <div className="space-x-1 text-sm">
                  {isEditing ? (
                    <>
                      <button type="submit" onClick={handleSave}>
                        저장
                      </button>
                      <button type="button" onClick={() => setIsEditing(!isEditing)}>
                        취소
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={() => setIsEditing(!isEditing)}>
                      수정
                    </button>
                  )}
                  <button type="submit" onClick={handleDelete}>
                    삭제
                  </button>
                </div>
              )}
            </div>

            <div className="pl-11 pb-4">
              {isEditing ? (
                <input
                  className="w-full px-3 py-2 text-sm"
                  value={editContent}
                  onKeyDown={handleEditKeyDown}
                  onChange={(e) => setEditContent(e.target.value)}
                  autoFocus
                />
              ) : (
                <p className="whitespace-pre-wrap text-xs">{content}</p>
              )}
            </div>

            <div className="flex flex-row gap-7 items-center pl-11">
              <LikeBtn
                likeUser={like_user ?? []}
                targetId={thread_id}
                table="thread"
                columnId="thread_id"
              />

              <button type="button" onClick={handleReply} className=" flex flex-row gap-2">
                <img src="/src/shared/assets/reply.svg" alt="댓글" />
                <span>{reply.length}</span>
              </button>
            </div>
            <div className="flex items-center py-8 gap-2">
              <p className="whitespace-nowrap">{reply.length}개의 댓글</p>
              <div className="flex-1 border-b border-border-gray w-full"></div>
            </div>

            {reply &&
              reply.map((item) => {
                console.log('item', item);
                return (
                  <IsMineProvider key={item.reply_id} writerProfileId={item.profile_id}>
                    <ThreadReplyComponent
                      key={item.reply_id}
                      reply={item}
                      onDelete={() => handleReplyDelete(item.reply_id)}
                    />
                  </IsMineProvider>
                );
              })}
            <div className="fixed z-10 bottom-0 h-35 w-full py-10 bg-bgc">
              {isOpen && (
                <div className="absolute bottom-33 left-5.5 flex gap-3.5">
                  <button
                    type="button"
                    className="rounded-full bg-border-gray w-10 h-10 flex items-center justify-center"
                    title="사진 첨부하기"
                    aria-label="사진 첨부하기"
                  >
                    <img
                      src="/src/shared/assets/photo.svg"
                      className="w-5 h-5"
                      alt="사진 첨부"
                      title="사진 첨부하기"
                    />
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-border-gray w-10 h-10 flex items-center justify-center"
                    title="동영상 첨부하기"
                    aria-label="동영상 첨부하기"
                  >
                    <img
                      src="/src/shared/assets/video.svg"
                      className="w-5 h-5"
                      alt="동영상 첨부"
                      title="동영상 첨부하기"
                    />
                  </button>
                </div>
              )}
              <form
                onSubmit={handleSubmitReply}
                className="absolute bottom-10 w-[calc(30%-4px)] flex justify-between px-5 gap-5 items-center border py-4 rounded-lg border-gray/50"
              >
                <button
                  type="button"
                  className="rounded-full bg-border-gray min-w-10 h-10 items-center "
                  title="파일 업로드하기"
                  aria-label="파일 업로드하기"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <p className="text-3xl text-gray">+</p>
                </button>
                <input
                  type="text"
                  className="w-full min-h-10 focus:outline-none"
                  value={createReply}
                  placeholder="내용을 입력해 주세요"
                  onChange={(e) => setCreateReply(e.target.value)}
                  onKeyDown={handleKeyDown}
                ></input>{' '}
                <button type="button" onClick={handleSubmitReply}>
                  <img src="/src/shared/assets/send.svg" alt="전송" title="전송하기" />
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </li>
  );
}
export default ThreadContent;
