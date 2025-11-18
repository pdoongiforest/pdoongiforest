import { useState } from 'react';
import Social from './Social';
import ProfileCard from './ProfileCard';
import ProfileSectionHeader from './ProfileSectionHeader';
import { useIsMine } from '@/shared/context/useIsMine';
import type { ProfileData } from '../edit/editform/FormSection';

interface Props {
  userData: ProfileData | null;
}

function ProfileSection({ userData }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeBtn, setActiveBtn] = useState<'password' | 'info' | null>(null);
  const { isMine } = useIsMine();

  // TODO: 실제 데이터로 교체
  const profileData = {
    profile_images: userData?.profile_images,
    nickname: userData?.nickname || '프둥이',
    role: userData?.role || 'Developer',
    age: userData?.age || 0,
    visibility: userData?.visibility || false,
    interest: userData?.interest || [],
    social: userData?.social || [],
  };

  return (
    <section className="mx-6 relative">
      <ProfileSectionHeader setActiveBtn={setActiveBtn} isMine={isMine} />
      <div className="border border-gray-300 rounded-lg px-8 py-10 mt-4 flex flex-col gap-5">
        <ProfileCard {...profileData} />
        <Social {...profileData} />
      </div>
    </section>
  );
}

export default ProfileSection;
