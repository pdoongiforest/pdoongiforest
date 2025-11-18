import supabase from '@/supabase/supabase';

/**
 * 프로필 이미지 업로드
 * @param file - 업로드할 이미지 파일
 * @param profileId - 프로필 ID
 * @returns 업로드된 이미지 URL
 */
export const uploadProfileImage = async (file: File, profileId: string): Promise<string> => {
  const fileName = `${profileId}-profile-${Date.now()}.jpg`;
  const { error } = await supabase.storage
    .from('profileimages')
    .upload(`profile/${fileName}`, file);

  if (error) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  return `https://tgpjaysqzywmgztzavxe.supabase.co/storage/v1/object/public/profileimages/profile/${fileName}`;
};
