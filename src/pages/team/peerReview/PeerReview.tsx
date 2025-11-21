import { useAuth } from '@/features/auth/AuthProvider';
import PeerReviewTemplate from '@/features/team/components/peerReview/PeerReviewTemplate';
import { PeerReviewProvider } from '@/features/team/context/peerReviewContext';
import type { TeamOutlet } from '@/features/team/types/types';
import supabase from '@/supabase/supabase';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

function PeerReview() {
  const { members } = useOutletContext<TeamOutlet>();
  const { profileId } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const member = members.filter((member) => member.profile_id !== profileId);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('peer_review').select('writer_id').eq('study_id', id);
      if (data) {
        const hasWritten = data.some((review) => review.writer_id == profileId);

        if (hasWritten) {
          alert('이미 피어리뷰를 작성하셨습니다.');
          navigate(`/team/${id}`);
        }
      }
    };
    fetch();
  }, [id, profileId]);

  return (
    <PeerReviewProvider memberId={members[currentIndex].profile_id}>
      <section className="mt-8 w-full">
        <div>
          <PeerReviewTemplate
            members={member}
            member={member[currentIndex]}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </section>
    </PeerReviewProvider>
  );
}

export default PeerReview;
