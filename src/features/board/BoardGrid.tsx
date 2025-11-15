import type { Tables } from '@/supabase/database.types';
import BoardCard from './components/BoardCard';

interface Props {
  boardList: Tables<'board'>[] | null;
}

function BoardGrid({ boardList }: Props) {
  return (
    <section className="w-full pt-6 flex-1">
      <h2 className="sr-only">스터디/프로젝트 찾기 카드 그리드 영역</h2>
      {(!boardList || boardList.length === 0) && (
        <div className="w-[1200px] h-2/5 flex items-center justify-center">
          <p>게시글이 없습니다.</p>
        </div>
      )}
      {boardList && (
        <div className="grid grid-cols-4 gap-4">
          {boardList.map((boardInfo) => (
            <BoardCard key={boardInfo.board_id} boardInfo={boardInfo} />
          ))}
        </div>
      )}
    </section>
  );
}
export default BoardGrid;
