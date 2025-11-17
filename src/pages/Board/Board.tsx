import { selectBoardList } from '@/api/board';
import BoardGrid from '@/features/board/BoardGrid';
import BoardOption from '@/features/board/BoardOption';
import Pagination from '@/features/board/components/Pagination';
import type { Tables } from '@/supabase/database.types';
import { useEffect, useState } from 'react';

interface FilterData {
  boardCls: 'all' | 'study' | 'project';
  isScrap: boolean;
}

function Board() {
  const [boardList, setBoardList] = useState<Tables<'board'>[] | null>(null);
  const [filterData, setFilterData] = useState<Tables<'board'>[] | null>(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const getBoardList = async () => {
      const boardList = await selectBoardList();
      setBoardList(boardList);
      setFilterData(boardList);
    };
    getBoardList();
  }, []);

  const handleSearch = (searchText: string) => {
    const filterData = boardList?.filter((boardInfo) => {
      if (boardInfo.title?.includes(searchText) || boardInfo.contents?.includes(searchText)) {
        return boardInfo;
      }
    });
    setFilterData(filterData ?? null);
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center gap-7">
      <div className="max-w-[1200px] w-full flex flex-col gap-4 items-center">
        <div>
          <BoardOption onSearch={handleSearch} />
          <BoardGrid boardList={filterData} />
        </div>
        <Pagination />
      </div>
    </div>
  );
}
export default Board;
