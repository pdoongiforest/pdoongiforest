import { Link, useParams } from 'react-router-dom';
import { useScraps } from './hooks/useScraps';
import NoContent from './NoContent';

function ScrapCard() {
  const { id } = useParams();
  const { scraps, loading, error } = useScraps(id);

  if (loading) {
    return <div className="w-full text-center py-8 text-gray-500">스크랩 불러오는 중....</div>;
  }

  if (error) {
    return <div className="w-full text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <ul className="flex flex-col gap-4 w-full px-4 py-6">
      {scraps && scraps.length > 0 ? (
        scraps.map((scrap) => (
          <li key={scrap.scrap_id} className="w-full">
            <Link
              to={`/board/${scrap.board_id}`}
              className="flex flex-col md:flex-row gap-4 border-b border-gray-300  hover:bg-secondary/10 transition-colors py-4 px-6"
            >
              <p className="text-xl font-semibold md:w-1/3 text-ellipsis overflow-hidden whitespace-nowrap ">
                {scrap.board.title}
              </p>
              <p className="md:w-2/3 text-gray-700 text-ellipsis overflow-hidden whitespace-nowrap">
                {scrap.board.contents}
              </p>
            </Link>
          </li>
        ))
      ) : (
        <NoContent
          title="스크랩한 게시글이 없습니다."
          description="스터디, 프로젝트에 가입하여 스크랩해보세요!"
        />
      )}
    </ul>
  );
}

export default ScrapCard;
