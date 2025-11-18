import { useEffect, useState } from 'react';
import { getPeerReviewScore } from '@/features/mypage/api/getPeerReviewScore';

interface UsePeerReviewScoreReturn {
  averageScore: number;
  loading: boolean;
  error: Error | null;
}

/**
 * 피어 리뷰 평균 점수를 가져오는 hook
 */
export const usePeerReviewScore = (profileId: string | undefined): UsePeerReviewScoreReturn => {
  const [averageScore, setAverageScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      setLoading(true);
      setError(null);

      const result = await getPeerReviewScore(profileId);

      if (result.error) {
        setError(result.error);
        setAverageScore(0);
      } else {
        setAverageScore(result.averageScore);
      }

      setLoading(false);
    };

    fetchScore();
  }, [profileId]);

  return { averageScore, loading, error };
};
