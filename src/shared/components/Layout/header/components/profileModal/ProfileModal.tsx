import ButtonGroup from './buttons/ButtonGroup';

interface Props {
  showProfileModal: boolean;
  profileId: string | null;
}

function ProfileModal({ showProfileModal, profileId }: Props) {
  return (
    <div
      className={`w-55 bg-white rounded-lg absolute top-12 right-0 shadow-md shadow-black/20 px-2 py-5 ${showProfileModal ? 'block' : 'hidden'}`}
    >
      <div className="w-full text-lg font-bold text-right">프둥이 님</div>
      <ButtonGroup profileId={profileId} />
    </div>
  );
}

export default ProfileModal;
