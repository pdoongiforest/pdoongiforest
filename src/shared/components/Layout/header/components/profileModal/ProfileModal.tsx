import { useEffect, useRef, useState } from 'react';
import ButtonGroup from './buttons/ButtonGroup';
import useCloseOutside from '@/shared/hooks/useCloseOutside';
import { useAnimationStartEnd } from '@/shared/hooks/useAnimationStartEnd';
import { useAuth } from '@/features/auth/AuthProvider';
import { getUserProfile } from '../../api/getUser';
import type { Json } from '@/supabase/database.types';

export interface ProfileData {
  nickname: string;
  profile_images: string;
  role: string;
  visibility: Json;
  age: number;
  introduce: string;
  interest: string[];
}

interface Props {
  showProfileModal: boolean;
  profileId: string | null;
  setShowProfileModal: (showProfileModal: boolean) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function ProfileModal({ showProfileModal, profileId, setShowProfileModal }: Props) {
  const profileModalRef = useRef<HTMLDivElement>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { user } = useAuth();

  const { visible } = useAnimationStartEnd({
    ref: profileModalRef,
    configOpen: {
      from: { opacity: 0, x: 50 },
      to: { opacity: 1, x: 0 },
    },
    configClose: {
      from: { opacity: 1, x: 0 },
      to: { opacity: 0, x: 50 },
    },
    showModal: showProfileModal,
  });

  useCloseOutside({
    menuRef: profileModalRef,
    onClose: () => {
      setShowProfileModal(false);
    },
    isActive: showProfileModal,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile(user?.id);
      setProfileData(profile);
    };
    if (user?.id) fetchProfile();
  }, [user?.id]);

  return (
    <div
      ref={profileModalRef}
      className={`w-55 bg-white rounded-lg absolute top-12 right-0 shadow-md shadow-black/20 px-2 py-5 ${visible ? 'block' : 'hidden pointer-events-none'}`}
      aria-label="프로필 모달"
    >
      <div className="w-full text-lg font-bold text-right" aria-label="프로필 닉네임">
        {profileData?.nickname ?? '프둥이'} 님
      </div>
      <ButtonGroup
        profileId={profileId}
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        profileData={profileData}
      />
    </div>
  );
}

export default ProfileModal;
