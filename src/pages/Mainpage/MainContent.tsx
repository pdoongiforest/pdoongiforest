import { useState, useEffect } from 'react';
import NewsSection from './NewsSection';
import S from './MainContent.module.css';
import SearchBar from '@/components/SearchBar';
import type { Tables } from '@/supabase/database.types';
import supabase from '@/supabase/supabase';
import Card from '@/components/Layout/Card';

type Board = Tables<'board'>;
type CardProps = Board & {
  board_tag: Tables<'board_tag'>[];
};

function MainContent() {
  const [cardData, setCardData] = useState<CardProps[]>([]);
  const [originData, setOriginData] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('board')
        .select('*,board_tag(*)')
        .eq('active', true);
      if (error) console.error();
      if (data) {
        setCardData(data);
        setOriginData(data);
      }
    };
    fetchData();
  }, []);

  const shuffledCard = [...cardData].sort(() => Math.random() - 0.5).slice(0, 6);

  return (
    <section className={S.mainContent}>
      <div className={S.bannerImage}>
        <img src="images/banner2.png" alt="모여봐요 프둥이숲" />
      </div>

      <SearchBar
        cardData={cardData}
        setCardData={setCardData}
        originData={originData}
        varient="mainVarient"
      />

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
