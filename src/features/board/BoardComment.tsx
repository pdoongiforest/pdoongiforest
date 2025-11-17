import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { insertComment, selectCommentList } from '@/api/comment';
import type { Tables } from '@/supabase/database.types';
import CommentItem from './components/CommentItem';
import { showErrorAlert } from '@/shared/utils/sweetAlert';

interface Props {
  boardId: string;
}

function BoardComment({ boardId }: Props) {
  const [commentList, setCommentList] = useState<Tables<'comment'>[] | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { profileId } = useAuth();

  useEffect(() => {
    if (!boardId || boardId === '') return;
    getCommentList();
  }, [boardId]);

  const getCommentList = async () => {
    const commentArr = await selectCommentList(boardId);

    if (commentArr && commentArr.length > 0) {
      setCommentList(commentArr);
    }
  };

  const handleCommentInsert = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!profileId) {
      showErrorAlert('댓글 작성 실패', '로그인이 필요한 서비스 입니다.');
      return;
    }
    e.preventDefault();
    const target = textAreaRef.current;
    if (!target?.value || target.value === '') return;
    try {
      const data = await insertComment(boardId, profileId, target?.value);
      console.log('data', data);
      if (!data) throw new Error();

      target.value = '';
      getCommentList();
    } catch (error) {
      showErrorAlert('댓글 작성 실패', '댓글 작성 중 오류가 발생하였습니다.');
    }
  };

  return (
    <div className="bg-white rounded-2xl px-7 py-4 mb-10 shadow-[2px_2px_2px_0_rgba(0,0,0,0.25)]">
      <div className="mb-8">
        <form
          className="w-full py-4 px-7 bg-[#F5F5F5] shadow-[-1px_-1px_1px_0_rgba(0,0,0,0.25)] rounded-2xl flex flex-col items-end"
          onSubmit={handleCommentInsert}
        >
          <textarea
            placeholder="댓글을 적어주세요"
            className="w-full h-min-[200px]"
            ref={textAreaRef}
          ></textarea>
          <button type="submit" className="bg-[#B99470] rounded-xl text-white py-1 px-9">
            댓글
          </button>
        </form>
      </div>
      {commentList && commentList?.length > 0 && (
        <>
          <hr className="mb-4" />
          <div className="pt-4">
            <div>
              댓글 <span className="bg-[#EADFD5] text-[#B99470] px-3">{commentList.length}</span>
            </div>
            <ul className="pt-6">
              {commentList.map((commentItem) => (
                <CommentItem commentItem={commentItem} key={commentItem.comment_id} />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default BoardComment;
