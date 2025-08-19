import { useEffect, useMemo, useState } from 'react';
import Card from '@/components/Layout/Card';
import S from './studychannel.module.css';
import type { Tables } from '@/supabase/database.types';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import { useSearch } from '@/components/context/useSearch';

type Board = Tables<'board'>;
type CardProps = Board & {
  board_tag: Tables<'board_tag'>[];
};
type FilteredTab = 'recent' | 'likes';

function StudyChannel() {
  const { data, setKeyword } = useSearch();
  const [sortTab, setSortTab] = useState<FilteredTab>('recent');
  const cardPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const sorted = useMemo(() => {
    const arr = [...data];
    if (sortTab === 'recent') {
      // created_at 컬럼명 확인 필요: 스키마에 따라 create_at vs created_at
      return arr.sort(
        (a, b) => new Date(b.create_at ?? 0).getTime() - new Date(a.create_at ?? 0).getTime()
      );
    }
    // likes 기준 (nullable 방지)
    return arr.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
  }, [data, sortTab]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortTab, data]);

  const startIdx = (currentPage - 1) * cardPerPage;
  const endIdx = startIdx + cardPerPage;
  const paginatedCards = sorted.slice(startIdx, endIdx);

  const totalPages = Math.ceil(sorted.length / cardPerPage);
  const maxVisible = 5;
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);
  const adjustedStartPage = Math.max(1, endPage - maxVisible + 1);
  const visiblePage = Array.from(
    { length: endPage - adjustedStartPage + 1 },
    (_, i) => adjustedStartPage + i
  );

  return (
    <main className={S.container}>
      <div className={S.channelHeader}>
        <div className={S.filterTab}>
          <button
            type="button"
            className={`${S.filterBtn} ${sortTab === 'recent' ? S.active : ''}`}
            onClick={() => setSortTab('recent')}
          >
            최신순
          </button>
          <button
            type="button"
            className={`${S.filterBtn} ${sortTab === 'likes' ? S.active : ''}`}
            onClick={() => setSortTab('likes')}
          >
            좋아요순
          </button>
        </div>
        <SearchBar onChange={setKeyword} varient="primary" />
        <Link to="/write">
          <button type="button" className={S.postBtn}>
            글쓰기
          </button>
        </Link>
      </div>
      <section>
        <div className={S.cardGrid}>
          {paginatedCards &&
            paginatedCards?.map((card: CardProps) => <Card card={card} key={card.board_id} />)}
        </div>
      </section>
      <nav>
        <ul className={S.pagenation}>
          <li>
            <button
              className={S.pagenationNumber}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
          </li>

          {visiblePage.map((pageNum) => {
            return (
              <li key={pageNum}>
                <button
                  onClick={() => setCurrentPage(pageNum)}
                  className={currentPage === pageNum ? S.active : S.pagenationNumber}
                >
                  {pageNum}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={S.pagenationNumber}
            >
              &gt;
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
}
export default StudyChannel;
