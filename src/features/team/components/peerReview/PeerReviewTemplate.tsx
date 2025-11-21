import Button from '@/shared/components/button/Button';
import AdjustMember from './AdjustMember';
import type { MemberWithProfile } from '../../types/types';
import { useReview } from '../../context/useReview';

interface Props {
  member: MemberWithProfile;
  members: MemberWithProfile[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

function PeerReviewTemplate({ member, members, currentIndex, setCurrentIndex }: Props) {
  const { nickname, profile_images, profile_id } = member.user_profile;
  const { handleSaveNext, handleSavePrev, handleSubmit } = useReview();

  const handleNext = () => {
    handleSaveNext(profile_id);
    setCurrentIndex(currentIndex + 1);
  };
  const handlePrev = () => {
    handleSavePrev(profile_id, members[currentIndex - 1].profile_id);
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <>
      <header className="flex justify-between items-center">
        <button
          type="button"
          className={`flex flex-col duration-200
            ${currentIndex == 0 && 'opacity-50 pointer-events-none'} 
            `}
          aria-label="이전"
          onClick={handlePrev}
        >
          <svg
            aria-hidden="true"
            width="30"
            height="24"
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9625 5.92969L4.375 11.9997L11.9625 18.0697"
              stroke="#171717"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25.6254 12H4.58789"
              stroke="#171717"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          이전
        </button>
        <div className="flex gap-1 items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={profile_images} alt={`${nickname}님의 프로필 이미지`} />
          </div>
          <p>{nickname}</p>
        </div>
        <button
          type="button"
          className={`flex flex-col ${currentIndex == members.length - 1 && 'opacity-50 pointer-events-none'}`}
          aria-label="다음"
          onClick={handleNext}
        >
          <svg
            aria-hidden="true"
            width="30"
            height="24"
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.0375 5.92969L25.625 11.9997L18.0375 18.0697"
              stroke="#171717"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.37461 12H25.4121"
              stroke="#171717"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          다음
        </button>
      </header>
      <main className="mt-9">
        <AdjustMember />
      </main>
      <footer className="mt-9 flex justify-between">
        <span>
          {currentIndex + 1}/{members.length}
        </span>

        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={currentIndex + 1 !== members.length}
          title="모든 피어리뷰가 작성되면 활성화됩니다."
          className="text-white"
          onClick={handleSubmit}
        >
          제출
        </Button>
      </footer>
    </>
  );
}
export default PeerReviewTemplate;
