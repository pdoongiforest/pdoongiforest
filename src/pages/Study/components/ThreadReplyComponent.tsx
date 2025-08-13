import { useState } from 'react';
import S from './ThreadReplyComponent.module.css';
import type { Tables } from '@/supabase/database.types';
import { commentTime } from './utills/commentTime';
import supabase from '@/supabase/supabase';
import { useIsMine } from '@/components/context/useIsMine';
import { showConfirmAlert } from '@/utils/sweetAlert';
import LikeBtn from '@/components/LikeBtn';

type ThreadReply = Tables<'thread_reply'>;
interface Prop {
  reply: ThreadReply;
  onDelete: () => void;
  userName: string | null;
  userImage?: string;
}

function ThreadReplyComponent({ reply, onDelete, userName, userImage }: Prop) {
  const { created_at, contents, likes, reply_id } = reply;
  const { isMine } = useIsMine();

  const [isEditing, setIsEditing] = useState(false);
  const [editReply, setEditReply] = useState(contents);
  const [content, setContent] = useState(contents);
  const commentTimeCheck = commentTime(created_at);

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

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!editReply.trim()) return;
      handleSave();
    }
  };

  return (
    <div className={S.container}>
      <div className={S.profileImage}>
        <img src={userImage} alt="유저 프로필 이미지" />
      </div>
      <div className={S.contentBox}>
        <div className={S.meta}>
          <div className={S.userInfo}>
            <span className={S.username}>{userName}</span>
            <span className={S.time}>{commentTimeCheck}</span>
          </div>
          {isMine && (
            <div className={S.edit}>
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
        {isEditing ? (
          <textarea
            value={editReply}
            onChange={(e) => setEditReply(e.target.value)}
            onKeyDown={handleEditKeyDown}
            autoFocus
            rows={4}
          />
        ) : (
          <div className={S.text}>{content}</div>
        )}

        <div className={S.actions}>
          <div className={S.likeBtn}>
            {<LikeBtn likes={likes} columnId="reply_id" targetId={reply_id} table="thread_reply" />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ThreadReplyComponent;
