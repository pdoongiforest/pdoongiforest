import type { Tables } from '@/supabase/database.types';
import S from './Recomment.module.css';
import { commentTime } from './utills/commentTime';
import { useState } from 'react';
import supabase from '@/supabase/supabase';
import { useIsMine } from '@/components/context/useIsMine';
import { showConfirmAlert } from '@/utils/sweetAlert';
import LikeBtn from '@/components/LikeBtn';

type Props = {
  reply: Tables<'comment_reply'>;
  onDelete: () => void;
  userName: string | null;
  userImage?: string;
};
function Recomment({ reply, onDelete, userName, userImage }: Props) {
  const { isMine } = useIsMine();
  const { reply_id, contents, created_at, likes } = reply;
  const [isEditing, setIsEditing] = useState(false);
  const [editReply, setEditReply] = useState(contents);
  const [content, setContent] = useState(contents);

  const commentTimeCheck = commentTime(created_at);

  const handleSave = async () => {
    const { error } = await supabase
      .from('comment_reply')
      .update({ contents: editReply })
      .eq('reply_id', reply_id);
    setIsEditing(!isEditing);
    setContent(editReply);
    if (error) console.log(error.message);
  };

  const handleDelete = async () => {
    showConfirmAlert('정말로 댓글을 삭제하시겠습니까', '확인을 누르면 삭제됩니다').then(
      (result) => {
        if (result.isConfirmed) dataDelete();
      }
    );
  };

  const dataDelete = async () => {
    try {
      const { error } = await supabase.from('comment_reply').delete().eq('reply_id', reply_id);
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
    <div className={S.container} key={reply_id}>
      <div className={S.profileImage}>
        <img src={userImage} alt="프로필" />
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
            rows={3}
          />
        ) : (
          <div className={S.text}>{content}</div>
        )}

        <div className={S.actions}>
          <div className={S.likeBtn}>
            <LikeBtn likes={likes} targetId={reply_id} table='comment_reply' columnId='reply_id'/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Recomment;
