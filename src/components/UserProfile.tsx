import S from './UserProfile.module.css';
import { useEffect, useRef, useState } from 'react';
import UserProfilePopup from './UserProfilePopup';

import type UserProfileProp from '@/@types/user';

interface Props {
  user: UserProfileProp;
}

export type StatusCode = 0 | 1 | 2 | 3 | null;

function UserProfile({ user }: Props) {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const openPopupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !openPopupRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpenPopup(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handlePopupToggle = () => {
    setOpenPopup((prev) => !prev);
  };

  const statusClassName = (status: StatusCode) => {
    const statusNum = Number(status);
    switch (statusNum) {
      case 0:
        return S.online;
      case 1:
        return S.offline;
      case 2:
        return S.dnd;
      case 3:
        return S.away;
      default:
        return S.offline; // 기본은 오프라인
    }
  };

  return (
    <>
      <button className={S.enterUser} ref={buttonRef} onClick={handlePopupToggle}>
        <div className={S.profileImage}>
          {user.profileImage ? (
            <img src={user.profileImage} alt="" />
          ) : (
            <img
              src="	https://i.pinimg.com/1200x/bf/9f/7a/bf9f7a293c4f8c82ca424a8bc556e463.jpg"
              alt=""
            />
          )}
          <div
            className={`${S.statusDot} ${statusClassName(Number(user.status) as StatusCode)}`}
          ></div>
        </div>
        <p>{user.nickName ? user.nickName : '프둥이'}</p>
      </button>
      {openPopup && (
        <div ref={openPopupRef}>
          <UserProfilePopup user={user} />
        </div>
      )}
    </>
  );
}
export default UserProfile;
