import PeerTemperature from '../peerTemperature/PeerTemperature';

function ProfilePeer() {
  return (
    <div className="flex gap-2 items-center">
      <p className="text-lg md:block hidden">피어온도</p>
      <PeerTemperature />
    </div>
  );
}

export default ProfilePeer;
