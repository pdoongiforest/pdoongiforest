import ProfileImage from './ProfileImage';
import ProfileInfo from './ProfileInfo';

interface Props {
  imageSrc: string;
  imageAlt: string;
  name: string;
  role: string;
  age: string | number;
}

function ProfileCard({ imageSrc, imageAlt, name, role, age }: Props) {
  return (
    <div className="flex gap-4 md:flex-row flex-col">
      <ProfileImage src={imageSrc} alt={imageAlt} />
      <ProfileInfo name={name} role={role} age={age} />
    </div>
  );
}

export default ProfileCard;
