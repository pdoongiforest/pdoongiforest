import AdjustMember from '@/features/team/components/peerReview/AdjustMember';
import Button from '@/shared/components/button/Button';

function PeerReview() {
  return (
    <section className="mt-8">
      <header className="flex justify-between items-center">
        <button type="button" className="flex flex-col" aria-label="이전">
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
        <p>유저</p>
        <button type="button" className="flex flex-col" aria-label="다음">
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
        <span>1/7</span>

        <Button
          type="submit"
          size="lg"
          disabled={true}
          title="모든 피어리뷰가 제출되면 활성화됩니다."
        >
          제출
        </Button>
      </footer>
    </section>
  );
}

export default PeerReview;
