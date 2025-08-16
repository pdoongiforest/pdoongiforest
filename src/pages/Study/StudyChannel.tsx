import { useEffect, useRef, useState } from 'react';
import Card from '@/components/Layout/Card';
import S from './studychannel.module.css';
import supabase from '@/supabase/supabase';
import type { Tables } from '@/supabase/database.types';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';

type Board = Tables<'board'>;
type CardProps = Board & {
  board_tag: Tables<'board_tag'>[];
};

function StudyChannel() {
  const cardPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [cardData, setCardData] = useState<CardProps[]>([]);
  const [originData, setOriginData] = useState<CardProps[]>([]);
  const filterTab = ['최신순', '좋아요순'];
  const filterRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [recentlyCardData, setrecentlyCardData] = useState<CardProps[]>([]);

  useEffect(() => {
    const boardTable = async () => {
      const { data } = await supabase
        .from('board')
        .select(' *, board_tag(*)')
        .eq('active', true)
        .order('create_at', { ascending: false });
      if (data) {
        setCardData(data);
        setOriginData(data);
      }
    };
    boardTable();
  }, []);
  useEffect(() => {
    setrecentlyCardData([...cardData]);
  }, [cardData]);

  function handleFilter(e: React.MouseEvent) {
    if (filterRef.current == null) return;
    if (e.currentTarget === filterRef.current[0]) {
      const sorted = [...cardData].sort(
        (a, b) => new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
      );

      setCardData(sorted);
    } else if (e.currentTarget === filterRef.current[1]) {
      const sorted = [...cardData].sort((a, b) => b.likes - a.likes);

      setCardData(sorted);
    }
  }

  const startIdx = (currentPage - 1) * cardPerPage;
  const endIdx = startIdx + cardPerPage;
  const paginatedCards = recentlyCardData.slice(startIdx, endIdx);

  const totalPages = Math.ceil(cardData.length / cardPerPage);
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
          {filterTab.map((tab, i) => (
            <button
              type="button"
              className={S.filterBtn}
              key={i}
              ref={(el) => {
                if (el) filterRef.current[i] = el;
              }}
              onClick={(e) => handleFilter(e)}
            >
              {tab}
            </button>
          ))}
        </div>
        <SearchBar
          cardData={cardData}
          setCardData={setCardData}
          originData={originData}
          varient="primary"
        />
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
