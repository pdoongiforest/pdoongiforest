import AboutSection from '@/features/mypage/components/AboutSection';
import ProfileSection from '@/features/mypage/components/ProfileSection';
import type { ProfileData } from '@/shared/components/Layout/header/components/profileModal/ProfileModal';
import supabase from '@/supabase/supabase';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Mypage2() {
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) return;
    const fetchUrlUserId = async () => {
      const { data, error } = await supabase
        .from('user_profile')
        .select('*')
        .eq('profile_id', id)
        .single();
      if (error) {
        console.error(error);
        return null;
      }
      setUserData(data);
    };
    fetchUrlUserId();
  }, [id]);

  return (
    <div className="page-layout max-w-1200 flex-col gap-10 mt-20">
      <ProfileSection />
      <AboutSection />
    </div>
  );
}

export default Mypage2;
