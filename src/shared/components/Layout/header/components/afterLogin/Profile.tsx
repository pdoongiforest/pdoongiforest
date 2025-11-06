import ProfileIcon from '@/shared/assets/character.png';

import { useEffect, useState } from 'react';
import ProfileModal, { type ProfileData } from '../profileModal/ProfileModal';
import Status from '../status/Status';
import { useAuth } from '@/features/auth/AuthProvider';
import { getUserProfile } from '../../api/getUser';

interface Props {
  profileId: string | null;
}

function Profile({ profileId }: Props) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [visible, setVisible] = useState(false);

  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // 프로필 모달 창 토글
  const handleShowProfileModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowProfileModal(!showProfileModal);
  };

  useEffect(() => {
    if (!user?.id) return;
    const fetchProfile = async () => {
      const profile = await getUserProfile(user?.id);
      if (profile) {
        setProfileData(profile);
      }
    };
    fetchProfile();
  }, [user?.id]);

  return (
    <>
      <button
        type="button"
        className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer bg-white relative"
        onClick={handleShowProfileModal}
      >
        <img
          src={profileData?.profile_images ?? ProfileIcon}
          alt="profile"
          className="object-cover w-full h-full"
        />
        <Status />
      </button>
      <ProfileModal
        showProfileModal={showProfileModal}
        profileId={profileId}
        setShowProfileModal={setShowProfileModal}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
}

export default Profile;
