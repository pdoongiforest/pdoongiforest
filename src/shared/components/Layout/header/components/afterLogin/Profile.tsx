import ProfileIcon from '@/shared/assets/character.png';
import Status from '../status/Status';
import { useState } from 'react';
import ProfileModal from '../profileModal/ProfileModal';

interface Props {
  profileId: string | null;
}

function Profile({ profileId }: Props) {
  const [showProfileModal, setShowProfileModal] = useState(false);

  // 프로필 모달 창 토글
  const handleShowProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  return (
    <>
      <button
        className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer bg-black relative"
        onClick={handleShowProfileModal}
      >
        <img src={ProfileIcon} alt="profile" className="object-cover w-full h-full" />
        <Status />
      </button>
      <ProfileModal showProfileModal={showProfileModal} profileId={profileId} />
    </>
  );
}

export default Profile;
