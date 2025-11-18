import supabase from '@/supabase/supabase';

export interface PeerReviewData {
  review_id: string;
  review_score: number;
  review_contents: string;
  writer_id: string;
  writer_profile_image: string;
  writer_nickname: string;
  writer_role: string;
  is_active: boolean;
  created_at: string;
  profile_id: string;
  study_id: string;
}

/**
 * 프로필 ID로 피어리뷰 목록 조회
 */
export const getPeerReviews = async (profileId: string): Promise<PeerReviewData[]> => {
  const { data, error } = await supabase
    .from('peer_review')
    .select('*')
    .eq('profile_id', profileId);

  if (error) {
    throw new Error('피어리뷰 목록을 불러오는데 실패했습니다.');
  }

  return data || [];
};
