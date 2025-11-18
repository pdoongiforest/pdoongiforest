interface Props {
  activeTab: 'peerReview' | 'scrap';
  setActiveTab: (tab: 'peerReview' | 'scrap') => void;
  isMine: boolean;
}

function MypageTabs({ activeTab, setActiveTab, isMine }: Props) {
  return (
    <>
      <div className="flex gap-10 mx-6 px-2 mt-10 overflow-x-auto scrollbar-hide">
        <button
          type="button"
          className={`text-xl font-semibold ${activeTab === 'peerReview' ? 'text-secondary' : 'text-gray-500'}`}
          onClick={() => setActiveTab('peerReview')}
        >
          내 피어리뷰
        </button>
        {isMine && (
          <button
            type="button"
            className={`text-xl font-semibold ${activeTab === 'scrap' ? 'text-secondary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('scrap')}
          >
            내 스크랩
          </button>
        )}
      </div>
    </>
  );
}

export default MypageTabs;
