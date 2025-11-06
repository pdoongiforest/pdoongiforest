import { useNavigate } from 'react-router-dom';

function ProfileBtn({ profileId }: { profileId: string | null }) {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate(`/mypage/${profileId}`);
  };

  return (
    <button
      type="button"
      className="w-full h-10 border-primary border text-primary text-right px-2 rounded-lg hover:bg-primary/20 hover:text-white transition-colors"
      onClick={handleProfile}
      aria-label="내 마이페이지 버튼"
    >
      내 프로필
    </button>
  );
}

export default ProfileBtn;
