import ProfilePeer from './ProfilePeer';

interface Props {
  name: string;
  role: string;
  age: string | number;
  visibility: boolean | null;
}

function ProfileInfo({ name, role, age, visibility }: Props) {
  return (
    <div className="flex flex-col py-3 gap-1 justify-end">
      <p className="text-2xl">{name}</p>
      <span className="text-md text-gray-500 ml-1 mb-2">{role}</span>
      <p className="text-lg">{visibility ? age : '나이 비공개'}</p>
      <ProfilePeer />
    </div>
  );
}

export default ProfileInfo;
