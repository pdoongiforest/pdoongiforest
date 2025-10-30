import Notification from './Notification';
import Profile from './Profile';

interface Props {
  profileId: string | null;
}

function AfterLogin({ profileId }: Props) {
  return (
    <div className="flex gap-2 relative">
      <Notification />
      <Profile profileId={profileId} />
    </div>
  );
}

export default AfterLogin;
