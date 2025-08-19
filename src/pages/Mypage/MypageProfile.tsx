import type { User } from './Mypage';
import S from './MypageTop.module.css';
import E from './MypageEdit.module.css';
import { useState } from 'react';
import EditPencil from './components/EditPencil';
import Popup from './components/Popup';

interface Props {
  user: User | null;
  editMode: boolean;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
}

function MypageProfile({ user, editMode, setUserData }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDrop, setShowProfileDrop] = useState(false);
  const [prevImage, setPrevImage] = useState('');
  const [prevProfileImage, setPrevProfileImage] = useState('');

  const handleEditBackground = () => {
    setShowDropdown(true);
    setPrevImage(profileData.background_images);
  };

  if (!user || !user.profile) {
    return <p>프로필 정보가 없습니다.</p>;
  }

  const profileData = user.profile[0];

  const handleEditProfile = () => {
    setShowProfileDrop(true);
    setPrevProfileImage(profileData.profile_images);
  };

  return (
    <>
      <div className={S.mypageProfileContainer}>
        <div className={S.mypageBg}>
          {editMode ? (
            <>
              <img src={profileData.background_images} className={E.edit_mypageBg} />
              <EditPencil onClick={handleEditBackground} />
              {showDropdown && (
                <Popup
                  type="profile-backgrounds"
                  prevImage={prevImage}
                  setPrevImage={setPrevImage}
                  setPopup={setShowDropdown}
                  popup={showDropdown}
                  profileData={profileData}
                  setUserData={setUserData}
                />
              )}
            </>
          ) : (
            <img
              key={profileData.background_images}
              src={profileData.background_images}
              className={S.mypageBgImg}
            />
          )}
        </div>
        <div className={S.mypageProfile}>
          {editMode ? (
            <>
              <button type="button" onClick={handleEditProfile} className={E.editProfileBtn}>
                <img src={profileData.profile_images} className={E.editProfileImg} />
              </button>
              {showProfileDrop && (
                <Popup
                  type="profile"
                  prevImage={prevProfileImage}
                  setPrevImage={setPrevProfileImage}
                  setPopup={setShowProfileDrop}
                  popup={showProfileDrop}
                  profileData={profileData}
                  setUserData={setUserData}
                />
              )}
            </>
          ) : (
            <img src={profileData.profile_images} className={S.mypageProfileImg} />
          )}
        </div>
      </div>
    </>
  );
}

export default MypageProfile;
