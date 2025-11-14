import { useEffect, useState } from 'react';
import AboutSection from './AboutSection';
import ContentSection from './content/ContentSection';
import ProfileSection from './profile/ProfileSection';
import { useParams } from 'react-router-dom';
import type { ProfileData } from '@/shared/components/Layout/header/components/profileModal/ProfileModal';
import supabase from '@/supabase/supabase';
import { IsMineProvider } from '@/shared/context/isMine';

function MypageSection() {
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchUrlUserId = async () => {
      setLoading(true);
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
      setLoading(false);
    };
    fetchUrlUserId();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <IsMineProvider writerProfileId={id || null}>
      <ProfileSection userData={userData} />
      <AboutSection userData={userData} />
      <ContentSection />
    </IsMineProvider>
  );
}

export default MypageSection;
