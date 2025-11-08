import { useState } from 'react';
import ProfileButtonGroup from '../buttons/ProfileButtonGroup';
import Social from './Social';
import ProfileCard from './ProfileCard';
import ProfileSectionHeader from './ProfileSectionHeader';

function ProfileSection() {
  const [activeBtn, setActiveBtn] = useState<'password' | 'info' | null>(null);

  // TODO: 실제 데이터로 교체
  const profileData = {
    imageSrc: '/images/너굴.png',
    imageAlt: 'profile',
    name: '프둥이',
    role: 'Frontend Developer',
    age: '나이 비공개',
  };

  return (
    <section className="mx-6 relative">
      <ProfileSectionHeader />
      <div className="border border-gray-300 rounded-lg px-8 py-5 md:mt-6 mt-12">
        <ProfileCard {...profileData} />
        <Social />
      </div>
      <ProfileButtonGroup setActiveBtn={setActiveBtn} />
    </section>
  );
}

export default ProfileSection;
