import Button from '@/shared/components/button/Button';

function PeerReviewCard() {
  return (
    <ul className="flex flex-col gap-4 m-4">
      <li>
        <div className="w-full border border-gray-300 rounded-lg p-4 relative">
          <p className="text-xl font-semibold">3.4점</p>
          <div className="flex gap-5 md:flex-row flex-col">
            <img
              src="/images/너굴.png"
              alt="피어리뷰 작성자 프로필"
              className="min-w-30 min-h-10"
            />
            <div className="flex flex-col">
              <p>닉네임</p>
              <p>직무</p>
              <p>내용</p>
            </div>
          </div>
          <Button variant="primary" className="absolute top-4 right-4 text-white">
            공개
          </Button>
        </div>
      </li>
      <li>
        <div className="w-full border border-gray-300 rounded-lg p-4 relative">
          <p className="text-xl font-semibold">3.4점</p>
          <div className="flex gap-5 md:flex-row flex-col">
            <img
              src="/images/너굴.png"
              alt="피어리뷰 작성자 프로필"
              className="min-w-30 min-h-10"
            />
            <div className="flex flex-col">
              <p>닉네임</p>
              <p>직무</p>
              <p>내용</p>
            </div>
          </div>
          <Button variant="sub" className="absolute top-4 right-4 text-primary">
            비공개
          </Button>
        </div>
      </li>
    </ul>
  );
}

export default PeerReviewCard;
