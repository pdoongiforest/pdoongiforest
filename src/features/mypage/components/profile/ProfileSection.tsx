import { useState } from 'react';
import ProfileButtonGroup from '../buttons/ProfileButtonGroup';
import Social from './Social';
import ProfileCard from './ProfileCard';
import ProfileSectionHeader from './ProfileSectionHeader';
import { useIsMine } from '@/shared/context/useIsMine';
import type { ProfileData } from '@/shared/components/Layout/header/components/profileModal/ProfileModal';

interface Props {
  userData: ProfileData | null;
}

function ProfileSection({ userData }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeBtn, setActiveBtn] = useState<'password' | 'info' | null>(null);
  const { isMine } = useIsMine();

  // TODO: 실제 데이터로 교체
  const profileData = {
    imageSrc: userData?.profile_images || '/images/너굴.png',
    imageAlt: userData?.nickname + '의 프로필 이미지' || 'profile',
    name: userData?.nickname || '프둥이',
    role: userData?.role || 'Developer',
    age: userData?.age || '나이 비공개',
  };

  return (
    <section className="mx-6 relative">
      <ProfileSectionHeader />
      <div className="border border-gray-300 rounded-lg px-8 py-5 md:mt-6 mt-12">
        <ProfileCard {...profileData} />
        <Social />
      </div>
      {/* 본인일 때만 버튼 그룹 표시 */}
      {isMine && <ProfileButtonGroup setActiveBtn={setActiveBtn} />}
    </section>
  );
}

export default ProfileSection;
