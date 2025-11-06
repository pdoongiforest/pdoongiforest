import { useNavigate } from 'react-router-dom';
import KeywordTag from './KeywordTag';
import Scrap from './Scrap';
import Profile from './Profile';

function BoardCard() {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate(`/board/1`);
  };
  return (
    <article
      className="w-[280px] h-80 bg-white rounded-[30px] shadow-[2px_4px_15px_0_rgba(0,0,0,0.15)]"
      onClick={handleRoute}
    >
      <div className="h-80 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 ">
            <KeywordTag label="프로젝트" />
            <KeywordTag label="자유가입" />
          </div>
          <Scrap />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-sm font-light text-[#8E8E8E]">🔥 마감일 | 2025-10-28</div>
          <div className="text-[24px]">
            <p>제목</p>
          </div>
          <div className="text-[#888888] text-[20px] flex-1">
            <p>내용</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="rounded-[30px] bg-[#F5F5F5] p-4">
            <p>해시태그 영역</p>
          </div>
          <div className="flex justify-between">
            <Profile />
            <div className="flex gap-1 text-xs font-light text-[#8E8E8E]">
              <div className="flex items-center gap-1">
                <img src="/icons/commentCount.svg" alt="" className="w-4 h-4" />
                <p>(125)</p>
              </div>
              <div className="flex items-center gap-1">
                <img src="/icons/person.svg" alt="" className="w-4 h-4" />
                <p>4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default BoardCard;
