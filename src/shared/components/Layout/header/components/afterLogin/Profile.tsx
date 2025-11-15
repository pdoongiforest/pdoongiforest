import ProfileIcon from '@/shared/assets/character.png';
import { useState } from 'react';
import ProfileModal from '../profileModal/ProfileModal';
import Status from '../status/Status';
import { useHeaderProfile } from '../../hooks/useHeaderProfile';

interface Props {
  profileId: string | null;
}

function Profile({ profileId }: Props) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const { profileData, isLoading } = useHeaderProfile(profileId);

  // 프로필 모달 창 토글
  const handleShowProfileModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowProfileModal(!showProfileModal);
  };

  if (isLoading) {
    return (
      <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer bg-white "></div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer bg-white relative"
        onClick={handleShowProfileModal}
        aria-label={
          profileData?.nickname ? `${profileData.nickname}님의 프로필 메뉴` : '프로필 메뉴'
        }
        aria-expanded={showProfileModal}
        aria-haspopup="true"
      >
        <img
          src={profileData?.profile_images ?? ProfileIcon}
          alt={
            profileData?.nickname ? `${profileData.nickname}님의 프로필 이미지` : '프로필 이미지'
          }
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
