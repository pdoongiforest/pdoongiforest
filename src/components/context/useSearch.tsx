import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useFetchBoardData, type Board } from './fetchBoardData';

interface BoardContextValue {
  data: Board[];
  keyword: string;
  setKeyword: (v: string) => void;
  refetch?: () => Promise<void>;
}

const SearchContext = createContext<BoardContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [keyword, setKeyword] = useState('');
  const [filtered, setFiltered] = useState<Board[]>([]);
  const postData = useFetchBoardData();

  const next = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return postData;
    return postData.filter((card) => {
      const t = card.title.toLowerCase();
      const c = card.contents.toLowerCase();
      const a = card.address?.toLowerCase();
      const tag = (card.board_tag ?? []).some((tag) =>
        (tag.hash_tag ?? '').toLowerCase().includes(q)
      );
      return t.includes(q) || c.includes(q) || a?.includes(q) || tag;
    });
  }, [postData, keyword]);

  useEffect(() => setFiltered(next), [next]);

  return (
    <SearchContext.Provider value={{ data: filtered, keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useBoard must be used within BoardProvider');
  return ctx;
}
