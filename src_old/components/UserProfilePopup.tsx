import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PeerReviewPopup from './PeerReviewPopup';

import S from './UserProfilePopup.module.css';
import type UserProfileProp from '@/@types/user';

interface Props {
  user: UserProfileProp;
}

function UserProfilePopup({ user }: Props) {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsClicked(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const handleOpenPR = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div ref={popupRef} className={S.popup}>
      <ul>
        <li>
          <Link to={`/mypage/${user.profileId}`}>마이페이지</Link>
        </li>
        <li>
          <a onClick={handleOpenPR} className={S.peerReview}>
            피어온도
          </a>
          {isClicked && user && <PeerReviewPopup user={user} onClose={() => setIsClicked(false)} />}
        </li>
      </ul>
    </div>
  );
}
export default UserProfilePopup;
