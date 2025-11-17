import { useState } from 'react';
import MypageTabs from '../tab/MypageTabs';
import Container from './Container';
import PeerReviewCard from './PeerReviewCard';
import ScrapCard from './ScrapCard';
import { useIsMine } from '@/shared/context/useIsMine';

function ContentSection() {
  const [activeTab, setActiveTab] = useState<'peerReview' | 'scrap'>('peerReview');
  const { isMine } = useIsMine();

  return (
    <>
      <MypageTabs activeTab={activeTab} setActiveTab={setActiveTab} isMine={isMine} />
      <Container>
        {activeTab === 'peerReview' && <PeerReviewCard isMine={isMine} />}
        {isMine && activeTab === 'scrap' && <ScrapCard />}
      </Container>
    </>
  );
}

export default ContentSection;
