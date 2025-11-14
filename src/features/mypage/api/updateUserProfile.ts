import supabase from '@/supabase/supabase';

export interface UpdateProfileData {
  nickname?: string | null;
  role?: string | null;
  age?: number | null;
  interest?: string[] | null;
  introduce?: string | null;
  profile_images?: string | null;
}

/**
 * user_profile 테이블 업데이트
 */
export const updateUserProfile = async (
  profileId: string,
  data: UpdateProfileData
): Promise<void> => {
  const { error } = await supabase.from('user_profile').update(data).eq('profile_id', profileId);

  if (error) {
    throw new Error('프로필 업데이트에 실패했습니다.');
  }
};
