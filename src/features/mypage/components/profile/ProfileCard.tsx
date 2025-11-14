import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';

interface Props {
  profile_images: string;
  nickname: string;
  role: string;
  age: string | number;
  visibility: boolean | null;
}

function ProfileCard({ profile_images, nickname, role, age, visibility }: Props) {
  return (
    <div className="flex gap-4 md:flex-row flex-col">
      <ProfileImage src={profile_images} alt={`${nickname}의 프로필 이미지`} />
      <ProfileInfo name={nickname} role={role} age={age} visibility={visibility} />
    </div>
  );
}

export default ProfileCard;
