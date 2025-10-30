import { useNavigate } from 'react-router-dom';

function ProfileBtn({ profileId }: { profileId: string | null }) {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate(`/mypage/${profileId}`);
  };

  return (
    <button
      className="w-full h-10 border-primary border text-primary text-right px-2 rounded-lg cursor-pointer hover:bg-primary/20 hover:text-white transition-colors"
      onClick={handleProfile}
    >
      내 프로필
    </button>
  );
}

export default ProfileBtn;
