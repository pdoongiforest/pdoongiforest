import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/AuthProvider';
import { getUserProfile } from '../api/getUser';
import type { ProfileData } from '../components/profileModal/ProfileModal';
import supabase from '@/supabase/supabase';

/**
 * 헤더 프로필 데이터 조회 및 실시간 업데이트 hook
 */
export const useHeaderProfile = (profileId: string | null) => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 프로필 데이터 초기 로드
  useEffect(() => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await getUserProfile(user.id);
        if (profile) {
          setProfileData(profile);
        }
      } catch (error) {
        console.error('프로필 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  // 프로필 이미지 실시간 업데이트 구독
  useEffect(() => {
    if (!profileId) return;

    const profile_channel = supabase
      .channel(`user_profile_info_${profileId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_profile',
        },
        (payload) => {
          if (payload.new.profile_id === profileId) {
            setProfileData((prev) =>
              prev
                ? {
                    ...prev,
                    profile_images: payload.new.profile_images,
                  }
                : prev
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profile_channel);
    };
  }, [profileId]);

  return { profileData, isLoading };
};
