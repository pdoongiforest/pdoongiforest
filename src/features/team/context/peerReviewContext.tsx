import { useAuth } from '@/features/auth/AuthProvider';
import { useToast } from '@/shared/utils/useToast';
import supabase from '@/supabase/supabase';
import { createContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface ReviewData {
  study_id?: string;
  profile_id?: number;
  writer_id?: string | null;
  communicate?: number;
  skill?: number;
  responsibility?: number;
  active?: number;
  review_contents?: string;
  review_score?: string;
}

type AllReview = Record<string, ReviewData>;

export interface PeerReview {
  review: ReviewData;
  allReview: AllReview;
  score: Record<string, number>;
  handleSubmit: () => void;
  handleScore: (id: number, name: string) => void;
  handleTextReview: (value: string) => void;
  handleSaveNext: (member: string) => void;
  handleSavePrev: (member: string, prevMember: string) => void;
}

const PeerReviewContext = createContext<PeerReview | undefined>(undefined);

export function PeerReviewProvider({
  children,
  memberId,
}: {
  children: React.ReactNode;
  memberId: number;
}) {
  const { profileId } = useAuth();
  const { id } = useParams();
  const [review, setReview] = useState<ReviewData>({});
  const [allReview, setAllReview] = useState<AllReview>({});
  const { success } = useToast();
  const navigate = useNavigate();

  // 피어리뷰 다음 버튼 누르면 선택 멤버 리뷰 저장
  const handleSaveNext = (member: string) => {
    setAllReview((prev) => ({
      ...prev,
      [member]: {
        ...score,
        study_id: id,
        profile_id: memberId,
        writer_id: profileId,
        review_contents: review.review_contents,
        review_score: getAverage(),
      },
    }));

    setReview({});
    setScore({});
  };

  // 피어리뷰 이전버튼 누르면 이전 멤버 평가가 다시 돌아옴
  const handleSavePrev = (member: string, prevMember: string) => {
    setAllReview((prev) => ({
      ...prev,
      [member]: {
        ...review,
        study_id: id,
        profile_id: memberId,
        writer_id: profileId,
        review_contents: review.review_contents,
        review_score: getAverage(),
      },
    }));

    const prevMemberReview = allReview[prevMember];
    if (prevMemberReview) {
      const { communicate, skill, active, responsibility } = prevMemberReview;

      const restoreScore: Record<string, number> = {};
      if (communicate !== undefined) restoreScore.communicate = communicate;
      if (skill !== undefined) restoreScore.skill = skill;
      if (active !== undefined) restoreScore.active = active;
      if (responsibility !== undefined) restoreScore.responsibility = responsibility;

      setScore(restoreScore);
    } else {
      setReview({});
    }
  };

  const handleSubmit = async () => {
    const currentReview = {
      study_id: id,
      profile_id: memberId,
      writer_id: profileId,
      review_contents: review.review_contents,
      review_score: getAverage(),
    };

    const finalReview = {
      ...allReview,
      [memberId]: currentReview,
    };

    const reviewArray = Object.values(finalReview);

    const { error } = await supabase.from('peer_review').insert(reviewArray);

    if (error) throw new Error('피어리뷰 전송 실패');

    success('제출이 완료되었습니다');
    await navigate(`/team/${id}`);
  };

  // 라디오버튼을 기반으로 평균값 내는 기능
  const [score, setScore] = useState<Record<string, number>>({});

  const handleScore = (id: number, name: string) => {
    setScore((prev) => ({
      ...prev,
      [name]: id,
    }));
  };

  const handleTextReview = (value: string) => {
    setReview((prev) => ({
      ...prev,
      review_contents: value,
    }));
  };

  const getAverage = () => {
    const values: number[] = Object.values(score);
    const sum = values.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    return (sum / values.length).toFixed(1);
  };

  return (
    <PeerReviewContext.Provider
      value={{
        review,
        allReview,
        score,
        handleSubmit,
        handleScore,
        handleTextReview,
        handleSaveNext,
        handleSavePrev,
      }}
    >
      {children}
    </PeerReviewContext.Provider>
  );
}

export default PeerReviewContext;
