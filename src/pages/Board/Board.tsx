import BoardGrid from '@/features/board/BoardGrid';
import BoardOption from '@/features/board/BoardOption';
import Pagination from '@/features/board/components/Pagination';

function Board() {
  return (
    <div className="w-screen flex flex-col justify-between items-center gap-7">
      <div className="w-[1200px]">
        <div>
          <BoardOption />
          <BoardGrid />
        </div>
        <Pagination />
      </div>
    </div>
  );
}
export default Board;
