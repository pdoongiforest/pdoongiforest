import { selectBoardInfo } from '@/api/board';
import BoardComment from '@/features/board/BoardComment';
import BoardInfo from '@/features/board/BoardInfo';
import MarkDownConvert from '@/shared/components/MarkDownConvert';
import type { Tables } from '@/supabase/database.types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BoardDetail() {
  const { id: boardId } = useParams();
  const [boardInfo, setBoardInfo] = useState<Tables<'board'> | null>(null);

  useEffect(() => {
    if (!boardId) return;
    const getBoardInfo = async () => {
      const boardInfo = await selectBoardInfo(boardId);
      if (boardInfo) {
        setBoardInfo(boardInfo);
      }
    };
    getBoardInfo();
  }, [boardId]);

  return (
    <div className="w-screen flex flex-col justify-between items-center">
      <h2 className="sr-only">스터디/프로젝트 구인 글 상세 페이지</h2>
      <section className="w-[1200px]">
        <BoardInfo boardInfo={boardInfo} />
        <div className="p-10">
          <MarkDownConvert markdown={boardInfo?.contents ?? ''} />
        </div>
        <BoardComment boardId={boardInfo?.board_id ?? ''} />
      </section>
    </div>
  );
}
export default BoardDetail;
