import { useEffect, useState } from 'react';
import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';
import { useIsMine } from '@/shared/context/useIsMine';
import { showConfirmAlert } from '@/shared/utils/sweetAlert';
import { commentTime } from '../commentTime';
import { getUserData } from '../hooks/getUserData';
import ProfileIcon from '@/shared/assets/character.png';
import LikeBtn from './LikeBtn';

type ThreadReply = Tables<'thread_reply'>;
interface Prop {
  reply: ThreadReply;
  onDelete: () => void;
}
type UserData = Tables<'user_profile'>;

function ThreadReplyComponent({ reply, onDelete }: Prop) {
  const { created_at, contents, reply_id } = reply;
  const { isMine } = useIsMine();

  const [isEditing, setIsEditing] = useState(false);
  const [editReply, setEditReply] = useState(contents ?? '');
  const [content, setContent] = useState(contents);
  const commentTimeCheck = commentTime(created_at ?? '');
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUserData(reply.profile_id);
      setUserData(result);
    };
    fetchUserData();
  }, [reply]);

  const handleSave = async () => {
    const { error } = await supabase
      .from('thread_reply')
      .update({
        contents: editReply,
      })
      .eq('reply_id', reply_id);
    setIsEditing(!isEditing);
    setContent(editReply);
    if (error) console.log(error.message);
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
      const { error } = await supabase.from('thread_reply').delete().eq('reply_id', reply_id);
      if (error) console.error(error);
      if (!error) onDelete?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!editReply.trim()) return;
      handleSave();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center w-full">
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
            <p className="text-center text-gray-400 text-xs">{commentTimeCheck}</p>
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
              <button type="submit" onClick={() => setIsEditing(!isEditing)}>
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
            value={editReply}
            onChange={(e) => setEditReply(e.target.value)}
            onKeyDown={handleEditKeyDown}
            autoFocus
          />
        ) : (
          <p className="whitespace-pre-wrap text-xs">{content}</p>
        )}
      </div>

      <div className="flex flex-row gap-7 items-center pl-11">
        <LikeBtn
          likeUser={reply.like_user ?? []}
          targetId={reply.thread_id}
          table="thread"
          columnId="thread_id"
        />
      </div>
    </>
  );
}
export default ThreadReplyComponent;
