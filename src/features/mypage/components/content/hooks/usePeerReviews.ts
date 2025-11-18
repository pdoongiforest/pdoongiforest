import { useState, useEffect, useCallback } from 'react';
import { getPeerReviews, type PeerReviewData } from '@/features/mypage/api/getPeerReviews';
import { updatePeerReviewVisibility } from '@/features/mypage/api/updatePeerReviewVisibility';
import { useToast } from '@/shared/utils/useToast';

/**
 * 피어리뷰 목록 조회 및 관리 hook
 */
export const usePeerReviews = (profileId: string | undefined, isMine: boolean) => {
  const [peerReviews, setPeerReviews] = useState<PeerReviewData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { success, error: errorToast } = useToast();

  const fetchPeerReviews = useCallback(async () => {
    if (!profileId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getPeerReviews(profileId);
      setPeerReviews(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '피어리뷰 목록을 불러오는데 실패했습니다.';
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => {
    fetchPeerReviews();
  }, [fetchPeerReviews]);

  const toggleVisibility = useCallback(
    async (reviewId: string, currentState: boolean) => {
      setUpdating(true);
      const newState = !currentState;

      try {
        await updatePeerReviewVisibility(reviewId, newState);

        // 로컬 상태 업데이트
        setPeerReviews((prev) =>
          prev
            ? prev.map((review) =>
                review.review_id === reviewId ? { ...review, is_active: newState } : review
              )
            : prev
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : '피어리뷰 상태를 업데이트하는데 실패했습니다.';
        setError(message);
        console.error(err);
        errorToast('피어리뷰 상태를 업데이트하는데 실패했습니다.');
      } finally {
        setUpdating(false);
        success('피어리뷰 상태가 업데이트되었습니다.');
      }
    },
    [success]
  );

  // 필터링된 리뷰 목록
  const filteredReviews = peerReviews
    ? peerReviews.filter((review) => {
        if (isMine) return true; // 내 페이지 → 전부 표시
        return review.is_active === true; // 남의 페이지 → 공개 리뷰만 표시
      })
    : null;

  return {
    reviews: filteredReviews,
    loading,
    updating,
    error,
    toggleVisibility,
    refetch: fetchPeerReviews,
  };
};
