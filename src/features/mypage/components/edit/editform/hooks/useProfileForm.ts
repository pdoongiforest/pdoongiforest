import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import getProfileData from '@/features/mypage/api/getProfileData';
import type { ProfileFormData, ProfileData } from '../FormSection';
import { useAuth } from '@/features/auth/AuthProvider';
import { useToast } from '@/shared/utils/useToast';

/**
 * 프로필 폼 데이터 관리 hook
 */
export const useProfileForm = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const { id: profileId } = useParams();
  const { profileId: loginId } = useAuth();
  const navigate = useNavigate();
  const { error: errorToast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (loginId !== profileId) {
      navigate(`/mypage/${profileId}`);
      errorToast('잘못된 접근 입니다.');
      return;
    }
  }, [loginId, profileId]);

  // 프로필 데이터 가져오기
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      const data = await getProfileData(profileId);
      if (data) {
        setProfileData(data);
      }
      setLoading(false);
    };
    fetchProfileData();
  }, [profileId]);

  // 폼 초기값 설정
  useEffect(() => {
    if (profileData) {
      setValue('profile_images', profileData.profile_images);
      setValue('nickname', profileData.nickname);
      setValue('role', profileData.role);
      setValue('age', profileData.age);
      setValue('interest', profileData.interest);
      setValue('introduce', profileData.introduce);
      setValue('social', profileData.social || []);
      setValue('visibility', profileData.visibility ?? false);
    }
  }, [profileData, setValue]);

  return {
    profileData,
    profileId,
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    errors,
    loading,
    isSubmitting,
    isDirty,
  };
};
