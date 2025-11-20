import PeerReviewTemplate from '@/features/team/components/peerReview/PeerReviewTemplate';
import { PeerReviewProvider } from '@/features/team/context/peerReviewContext';
import type { TeamOutlet } from '@/features/team/types/types';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function PeerReview() {
  const { members } = useOutletContext<TeamOutlet>();
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <PeerReviewProvider memberId={members[currentIndex].profile_id}>
      <section className="mt-8 w-full">
        <div>
          <PeerReviewTemplate
            members={members}
            member={members[currentIndex]}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </section>
    </PeerReviewProvider>
  );
}

export default PeerReview;
