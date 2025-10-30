import ChangeStatusBtn from './ChangeStatusBtn';
import LogoutBtn from './LogoutBtn';
import ProfileBtn from './ProfileBtn';

interface Props {
  profileId: string | null;
}

function ButtonGroup({ profileId }: Props) {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <ProfileBtn profileId={profileId} />
      <ChangeStatusBtn />
      <div className="mt-5 border-t border-gray-300 pt-5">
        <LogoutBtn />
      </div>
    </div>
  );
}

export default ButtonGroup;
