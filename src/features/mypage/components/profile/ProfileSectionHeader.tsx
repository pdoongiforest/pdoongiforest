import ProfileButtonGroup from '../buttons/ProfileButtonGroup';

interface Props {
  setActiveBtn: (btn: 'password' | 'info' | null) => void;
  isMine: boolean;
}

function ProfileSectionHeader({ setActiveBtn, isMine }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-primary px-2">내 프로필</h2>
      {isMine && <ProfileButtonGroup setActiveBtn={setActiveBtn} />}
    </div>
  );
}

export default ProfileSectionHeader;
