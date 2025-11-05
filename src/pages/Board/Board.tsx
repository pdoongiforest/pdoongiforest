import BoardGrid from '@/features/board/BoardGrid';
import BoardOption from '@/features/board/BoardOption';
import Pagination from '@/features/board/components/Pagination';

function Board() {
  return (
    <div className="w-[1200px] flex flex-col justify-between items-center gap-7">
      <div>
        <BoardOption />
        <BoardGrid />
      </div>
      <Pagination />
    </div>
  );
}
export default Board;
