import type { Database } from '@/supabase/database.types';
import S from './MypagePostAndScrap.module.css';
import { Link } from 'react-router-dom';

type Board = Pick<Database['public']['Tables']['board']['Row'], 'board_id'|'title'|'contents'>;

interface Props {
  category : string,
  data : Board[] | null
}

function RenderBoardList({category, data}:Props) {
  const translate = category === 'post' ? '포스트' : '스크랩'
  return (
    <>
    <h2 className={S.sectionName}>{ translate }</h2>
    { data && data.length>0 ? (
      <section className={S.container}>
          <ul className={S.list}>
            {
              data.map(({ board_id, title, contents }) => (
                <li key={board_id} className={S.linkList}>
                  <Link to={`/channel/${board_id}`}>
                    <div className={S.title}>{title}</div>
                    <div className={S.content}>{contents}</div>
                  </Link>
                </li>
              ))}
          </ul>
        </section>

    ) : (
        <div className={S.nothing}>
          <img src="/images/emptyContents.png" alt={`${translate} 없음`} />
          {
            category === 'post' ? (
              <p>
                아직 작성한 포스트가 없습니다 <br />
                스터디에서 모집 글을 작성해보세요!
              </p>
            ) : (
              <p>
                아직 스크랩된 글이 없습니다 <br />
                스터디에서 글을 스크랩해서 한 눈에 확인해보세요!
              </p>
            )
          }
        </div>
    )
      
    }
  </>
  )
}
export default RenderBoardList