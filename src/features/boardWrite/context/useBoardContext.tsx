import { createContext, useContext, useState } from 'react';

interface BaseTagData {
  value: string;
}
type BoardType = {
  title: string;
  contents: string;
  recruitCls: string;
  recruitTime: string;
  recruitCount: number;
  hashTag: BaseTagData[] | null;
};
interface BoardDataType {
  postData: BoardType | null;
  setPostData: React.Dispatch<React.SetStateAction<BoardType>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const BoardContext = createContext<BoardDataType | null>(null);

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [postData, setPostData] = useState<BoardType>({
    title: '',
    contents: '',
    recruitCls: 'study',
    recruitTime: '',
    recruitCount: 0,
    hashTag: null,
  });

  return (
    <BoardContext.Provider value={{ postData, setPostData }}>{children}</BoardContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBoardContext() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error('useBoardContext는 <boardContext> 안에서 사용해야합니다.');
  return ctx;
}
