import type { ProfileFormData, ProfileData } from '../FormSection';
import type { UpdateProfileData } from '@/features/mypage/api/updateUserProfile';

/**
 * 변경된 필드만 추출하여 업데이트 객체 생성
 */
export const getChangedFields = (
  formData: ProfileFormData,
  profileData: ProfileData
): UpdateProfileData => {
  const updateProfile: UpdateProfileData = {};

  if (formData.nickname !== profileData.nickname) {
    updateProfile.nickname = formData.nickname || null;
  }

  if (formData.role !== profileData.role) {
    updateProfile.role = formData.role || null;
  }

  if (formData.age !== profileData.age) {
    updateProfile.age = formData.age || null;
  }

  if (JSON.stringify(formData.interest) !== JSON.stringify(profileData.interest)) {
    updateProfile.interest = formData.interest.length > 0 ? formData.interest : null;
  }

  if (formData.introduce !== profileData.introduce) {
    updateProfile.introduce = formData.introduce || null;
  }

  // visibility 변경 체크
  if (formData.visibility !== (profileData.visibility ?? false)) {
    updateProfile.visibility = formData.visibility;
  }

  return updateProfile;
};
