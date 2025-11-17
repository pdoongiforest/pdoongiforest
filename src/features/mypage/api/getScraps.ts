import supabase from '@/supabase/supabase';

export interface ScrapData {
  board_id: string;
  profile_id: string;
  scrap_id: string;
  board: {
    title: string;
    contents: string;
  };
}

/**
 * 프로필 ID로 스크랩 목록 조회
 */
export const getScraps = async (profileId: string): Promise<ScrapData[]> => {
  const { data, error } = await supabase
    .from('scrap')
    .select(
      `
      *,
      board:board_id (
        title,
        contents
      )
    `
    )
    .eq('profile_id', profileId);

  if (error) {
    throw new Error('스크랩 목록을 불러오는데 실패했습니다.');
  }

  return data || [];
};
