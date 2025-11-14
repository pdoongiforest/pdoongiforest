import { useEffect, useState } from 'react';
import AboutSection from './AboutSection';
import ContentSection from './content/ContentSection';
import ProfileSection from './profile/ProfileSection';
import { useParams } from 'react-router-dom';
import { IsMineProvider } from '@/shared/context/isMine';
import MypageSectionSkeleton from './loading/MypageSectionSkeleton';
import type { ProfileData } from './edit/editform/FormSection';
import getProfileData from '../api/getProfileData';

function MypageSection() {
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchUrlUserId = async () => {
      setLoading(true);
      const data = await getProfileData(id);
      if (data) {
        setUserData(data);
      }
      setLoading(false);
    };
    fetchUrlUserId();
  }, [id]);

  if (loading) {
    return <MypageSectionSkeleton />;
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
