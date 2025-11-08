import { useState } from 'react';
import MypageTabs from '../tab/MypageTabs';
import Container from './Container';
import PeerReviewCard from './PeerReviewCard';
import ScrapCard from './ScrapCard';

function ContentSection() {
  const [activeTab, setActiveTab] = useState<'peerReview' | 'scrap'>('peerReview');

  return (
    <>
      <MypageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container>
        {activeTab === 'peerReview' && <PeerReviewCard />}
        {activeTab === 'scrap' && <ScrapCard />}
      </Container>
    </>
  );
}

export default ContentSection;
