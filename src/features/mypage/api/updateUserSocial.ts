import supabase from '@/supabase/supabase';

export interface SocialLink {
  social: string;
  social_link: string;
}

/**
 * user_social 테이블 업데이트 (기존 데이터 삭제 후 새로 추가)
 */
export const updateUserSocial = async (
  profileId: string,
  socialLinks: SocialLink[]
): Promise<void> => {
  // 기존 소셜 링크 삭제
  const { error: deleteError } = await supabase
    .from('user_social')
    .delete()
    .eq('profile_id', profileId);

  if (deleteError) {
    throw new Error('소셜 링크 삭제에 실패했습니다.');
  }

  // 빈 값이 아닌 것만 필터링
  const validSocialLinks = socialLinks.filter((social) => social.social && social.social_link);

  if (validSocialLinks.length > 0) {
    const socialToInsert = validSocialLinks.map((social) => ({
      profile_id: profileId,
      social: social.social,
      social_link: social.social_link,
    }));

    const { error: insertError } = await supabase.from('user_social').insert(socialToInsert);

    if (insertError) {
      throw new Error('소셜 링크 추가에 실패했습니다.');
    }
  }
};
