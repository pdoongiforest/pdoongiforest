import ProfileIcon from '@/shared/assets/character.png';

import { useState } from 'react';
import ProfileModal from '../profileModal/ProfileModal';
import Status from '../status/Status';

interface Props {
  profileId: string | null;
}

function Profile({ profileId }: Props) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [visible, setVisible] = useState(false);

  // 프로필 모달 창 토글
  const handleShowProfileModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowProfileModal(!showProfileModal);
  };

  return (
    <>
      <button
        type="button"
        className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer bg-black relative"
        onClick={handleShowProfileModal}
      >
        <img src={ProfileIcon} alt="profile" className="object-cover w-full h-full" />
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
