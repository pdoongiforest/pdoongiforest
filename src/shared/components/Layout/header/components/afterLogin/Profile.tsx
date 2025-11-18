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
        {profileData?.profile_images ? (
          <img
            key={profileData.profile_images} // 이미지 URL이 변경되면 강제 리렌더링
            src={`${profileData.profile_images}?t=${Date.now()}`}
            alt={
              profileData.nickname ? `${profileData.nickname}님의 프로필 이미지` : '프로필 이미지'
            }
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200" />
        )}
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
