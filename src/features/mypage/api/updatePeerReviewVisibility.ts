import supabase from '@/supabase/supabase';

/**
 * 피어리뷰 공개/비공개 상태 업데이트
 */
export const updatePeerReviewVisibility = async (
  reviewId: string,
  isActive: boolean
): Promise<void> => {
  const { error } = await supabase
    .from('peer_review')
    .update({ is_active: isActive })
    .eq('review_id', reviewId);

  if (error) {
    throw new Error('피어리뷰 상태를 업데이트하는데 실패했습니다.');
  }
};
