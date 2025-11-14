import supabase from '@/supabase/supabase';

/**
 * 피어 리뷰 평균 점수 조회
 */
export const getPeerReviewScore = async (profileId: string | undefined) => {
  if (!profileId) {
    return { averageScore: 0, count: 0, error: null };
  }

  const { count, data, error } = await supabase
    .from('peer_review')
    .select('review_score', {
      count: 'exact',
    })
    .match({
      profile_id: profileId,
    });

  if (error) {
    console.error('피어리뷰 불러오기 실패', error.message);
    return { averageScore: 0, count: 0, error };
  }

  if (!data || data.length === 0) {
    return { averageScore: 0, count: 0, error: null };
  }

  const total = data.reduce((sum, item) => sum + Number(item.review_score), 0);
  const average = count ? total / count : 0;
  const percent = Math.round((average / 5) * 100); // 온도계용 퍼센트 (0-100)

  return { averageScore: percent, count, error: null };
};
