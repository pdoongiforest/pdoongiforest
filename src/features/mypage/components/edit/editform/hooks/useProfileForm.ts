import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import getProfileData from '@/features/mypage/api/getProfileData';
import type { ProfileFormData, ProfileData } from '../FormSection';

/**
 * 프로필 폼 데이터 관리 hook
 */
export const useProfileForm = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const { id: profileId } = useParams();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ProfileFormData>({
    mode: 'onBlur',
  });

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
  };
};
