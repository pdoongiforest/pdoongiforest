import Button from '@/shared/components/button/Button';
import { useParams } from 'react-router-dom';
import NoContent from './NoContent';
import { usePeerReviews } from './hooks/usePeerReviews';
import { getReviewImage } from './util/randomImage';

function PeerReviewCard({ isMine }: { isMine: boolean }) {
  const { id } = useParams();
  const { reviews, loading, updating, error, toggleVisibility } = usePeerReviews(id, isMine);

  if (loading) {
    return <div className="w-full text-center py-8 text-gray-500">피어리뷰 불러오는 중....</div>;
  }

  if (error) {
    return <div className="w-full text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <ul className="flex flex-col gap-4 w-full px-4 py-6">
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <li
            key={review.review_id}
            className="w-full md:flex-1 border-b border-gray-300 py-4 px-6 "
          >
            <div className="w-full rounded-lg p-4 relative min-h-[100px]">
              <div className="flex gap-5 md:flex-row flex-col items-center md:items-start">
                <img
                  src={getReviewImage(review.review_id)}
                  alt="피어리뷰 작성자 프로필"
                  className="w-20 h-20 rounded-md object-contain shrink-0"
                />
                <div className="flex flex-col flex-1 w-full md:gap-2 gap-4">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-2xl font-semibold text-secondary">{review.review_score}</p>
                    {isMine && (
                      <Button
                        disabled={updating}
                        variant={review.is_active ? 'primary' : 'sub'}
                        className={`transition-all duration-300 ${
                          review.is_active ? 'text-white' : 'text-primary'
                        }`}
                        onClick={() => toggleVisibility(review.review_id, review.is_active)}
                      >
                        {review.is_active ? '공개' : '비공개'}
                      </Button>
                    )}
                  </div>
                  <p className="text-gray-700 text-ellipsis overflow-hidden whitespace-wrap">
                    {review.review_contents}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <NoContent
          title="피어리뷰가 없습니다."
          description="스터디, 프로젝트에 가입하여 피어리뷰를 작성해보세요!"
        />
      )}
    </ul>
  );
}

export default PeerReviewCard;
