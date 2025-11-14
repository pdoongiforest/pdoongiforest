import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UseFormSetError } from 'react-hook-form';
import type { ProfileFormData, ProfileData } from '../FormSection';
import { uploadProfileImage } from '@/features/mypage/api/uploadProfileImage';
import { updateUserProfile } from '@/features/mypage/api/updateUserProfile';
import { updateUserSocial } from '@/features/mypage/api/updateUserSocial';
import { getChangedFields } from '../utils/getChangedFields';
import { validateSocialLinks } from '../utils/validateSocialLinks';

interface UseProfileSubmitProps {
  profileId: string | undefined;
  profileData: ProfileData | null;
  setError: UseFormSetError<ProfileFormData>;
}

/**
 * 프로필 폼 제출 로직 hook
 */
export const useProfileSubmit = ({ profileId, profileData, setError }: UseProfileSubmitProps) => {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: ProfileFormData) => {
      if (!profileId || !profileData) {
        throw new Error('프로필 정보를 불러올 수 없습니다.');
      }

      // 소셜 링크 validation
      try {
        validateSocialLinks(data.social);
      } catch (error) {
        const message = error instanceof Error ? error.message : '소셜 링크 validation 실패';
        setError('social', { message });
        throw error;
      }

      // 변경된 필드만 추출
      const updateProfile = getChangedFields(data, profileData);

      // 프로필 이미지 처리
      if (data.profileImage instanceof File) {
        try {
          updateProfile.profile_images = await uploadProfileImage(data.profileImage, profileId);
        } catch (error) {
          const message = error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.';
          setError('profileImage', { message });
          throw error;
        }
      } else if (data.profileImage !== profileData.profile_image) {
        updateProfile.profile_images = data.profileImage || null;
      }

      // user_profile 업데이트 (변경된 필드만)
      if (Object.keys(updateProfile).length > 0) {
        await updateUserProfile(profileId, updateProfile);
      }

      // user_social 업데이트
      const existingSocial = profileData.social || [];
      const newSocial = data.social || [];
      const socialChanged = JSON.stringify(existingSocial) !== JSON.stringify(newSocial);

      if (socialChanged) {
        await updateUserSocial(profileId, newSocial);
      }

      navigate(`/mypage/${profileId}`);
    },
    [profileId, profileData, setError, navigate]
  );

  return { onSubmit };
};
