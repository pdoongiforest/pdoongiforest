import { useNavigate } from 'react-router-dom';
import KeywordTag from './KeywordTag';
import Scrap from './Scrap';
import Profile from './Profile';
import type { Tables } from '@/supabase/database.types';
import HashTag from '@/shared/components/HashTag';
import { useState } from 'react';

interface Props {
  boardInfo: Tables<'board'>;
}
function BoardCard({ boardInfo }: Props) {
  const [commentCount, setCommentCount] = useState(0);

  const navigate = useNavigate();
  const handleRoute = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('tags')) return;
    console.log(target);
    navigate(`/board/${boardInfo.board_id}`);
  };

  return (
    <article
      className="w-[280px] h-80 bg-white rounded-[30px] shadow-[2px_4px_15px_0_rgba(0,0,0,0.15)]"
      onClick={handleRoute}
    >
      <div className="h-80 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 ">
            <KeywordTag label={boardInfo.board_cls === 'study' ? '스터디' : '프로젝트'} />
            <KeywordTag label={boardInfo.approve_cls === 'free' ? '자유 가입' : '승인 가입'} />
          </div>
          <Scrap boardId={boardInfo.board_id} />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-sm font-light text-[#8E8E8E]">
            🔥 마감일 | {boardInfo.deadline?.slice(0, 10)}
          </div>
          <div className="text-[24px]">
            <p>{boardInfo.title}</p>
          </div>
          <div className="text-[#888888] text-[16px] flex-1 font-light">
            <p>
              {boardInfo.contents && boardInfo.contents.length > 40
                ? boardInfo.contents?.slice(0, 40) + '...'
                : boardInfo.contents}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="rounded-[30px] bg-[#F5F5F5] p-4 min-h-20">
            {boardInfo.hash_tag && (
              <HashTag
                taglist={boardInfo.hash_tag}
                defaultList={boardInfo.hash_tag}
                editable={false}
              />
            )}
          </div>
          <div className="flex justify-between">
            <Profile writerId={boardInfo.profile_id} />
            <div className="flex gap-1 text-xs font-light text-[#8E8E8E]">
              <div className="flex items-center gap-1">
                <img src="/icons/commentCount.svg" alt="댓글 수 이미지" className="w-4 h-4" />
                <p>{`(${commentCount})`}</p>
              </div>
              <div className="flex items-center gap-1">
                <img src="/icons/person.svg" alt="모집 인원 수 이미지" className="w-4 h-4" />
                <p>{boardInfo.recruitment_number}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default BoardCard;
