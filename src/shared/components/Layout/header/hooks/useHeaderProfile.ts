import { useState, useEffect } from 'react';
import type { ProfileData } from '../components/profileModal/ProfileModal';
import supabase from '@/supabase/supabase';

/**
 * 헤더 프로필 데이터 조회 및 실시간 업데이트 hook
 */
export const useHeaderProfile = (profileId: string | null) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 프로필 데이터 초기 로드
  useEffect(() => {
    if (!profileId) {
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('user_profile')
          .select('*')
          .eq('profile_id', profileId)
          .single();

        if (error) {
          console.error('프로필 데이터 로드 실패:', error);
          return;
        }

        if (data) {
          setProfileData(data as ProfileData);
        }
      } catch (error) {
        console.error('프로필 데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

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
            setProfileData((prev) => {
              const updated = prev
                ? { ...prev, ...payload.new }
                : ({ ...payload.new } as ProfileData);

              return updated;
            });
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
