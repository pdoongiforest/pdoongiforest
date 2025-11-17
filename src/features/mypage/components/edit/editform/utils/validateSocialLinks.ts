import type { ProfileFormData } from '../FormSection';

/**
 * 소셜 링크 validation
 * @throws Error - validation 실패 시
 */
export const validateSocialLinks = (social: ProfileFormData['social']): void => {
  if (social.length > 0 && social.some((item) => item.social_link === '')) {
    throw new Error('링크를 적어주세요.');
  }

  if (social.length > 0 && social.some((item) => item.social === '')) {
    throw new Error('플랫폼을 선택해주세요.');
  }
};
