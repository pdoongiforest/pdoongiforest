import NewsSection from './NewsSection';
import S from './MainContent.module.css';
import SearchBar from '@/components/SearchBar';
import Card from '@/components/Layout/Card';
import { useSearch } from '@/components/context/useSearch';
import fetchBoardData from '@/components/context/fetchBoardData';

function MainContent() {
  const { setKeyword } = useSearch();
  const data = fetchBoardData();
  const shuffledCard = [...data].sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <section className={S.mainContent}>
      <div className={S.bannerImage}>
        <img src="images/banner2.png" alt="모여봐요 프둥이숲" />
      </div>

      <SearchBar onChange={setKeyword} varient="mainVarient" />

      {shuffledCard.length > 0 ? (
        <div className={S.mainStudyCard}>
          {shuffledCard.map((card) => (
            <Card card={card} key={card.board_id} />
          ))}
        </div>
      ) : (
        <div className={S.nothing}>
          <p>
            앗… 아직 관련 글이 없습니다.
            <br />
            🍃🍃🍃
          </p>
          <img src="/images/서치이미지.png" alt="검색 결과 없음" />
        </div>
      )}

      <div className={S.newsSection}>
        <NewsSection />
      </div>
    </section>
  );
}

export default MainContent;
