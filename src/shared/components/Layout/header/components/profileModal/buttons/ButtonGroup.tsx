import ChangeStatusBtn from './ChangeStatusBtn';
import LogoutBtn from './LogoutBtn';
import ProfileBtn from './ProfileBtn';
import type { ProfileData } from '../ProfileModal';

interface Props {
  profileId: string | null;
  showProfileModal: boolean;
  profileData: ProfileData | null;
}

function ButtonGroup({ profileId, showProfileModal }: Props) {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <ProfileBtn profileId={profileId} />
      <ChangeStatusBtn showProfileModal={showProfileModal} />
      <div className="mt-5 border-t border-gray-300 pt-5">
        <LogoutBtn />
      </div>
    </div>
  );
}

export default ButtonGroup;
