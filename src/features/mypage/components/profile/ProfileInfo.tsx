import PeerTemperature from '../peerTemperature/PeerTemperature';

interface Props {
  name: string;
  role: string;
  age: string | number;
}

function ProfileInfo({ name, role, age }: Props) {
  return (
    <div className="flex flex-col py-3 gap-1 justify-end">
      <p className="text-2xl">{name}</p>
      <span className="text-md text-gray-500 ml-1 mb-2">{role}</span>
      <p className="text-lg">{age}</p>
      <div className="flex gap-2 items-center">
        <p className="text-lg md:block hidden">피어온도</p>
        <PeerTemperature />
      </div>
    </div>
  );
}

export default ProfileInfo;
