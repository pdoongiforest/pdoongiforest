import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  setActiveBtn: (btn: 'password' | 'info' | null) => void;
}

const buttonList = [
  {
    label: '비밀번호 변경',
    path: 'password',
  },
  {
    label: '내 정보 수정',
    path: 'info',
  },
];

function ProfileButtonGroup({ setActiveBtn }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleButtonClick = (path: 'password' | 'info' | null) => {
    navigate(`/mypage/${id}/${path}`);
    setActiveBtn(path);
  };

  return (
    <ul className="absolute md:top-8 top-14 right-3 flex gap-3">
      {buttonList.map((button) => (
        <li key={button.path}>
          <button
            type="button"
            className="text-sm text-gray-500 underline-offset-4 underline hover:text-secondary transition-colors ease-in-out"
            onClick={() => handleButtonClick(button.path as 'password' | 'info')}
          >
            {button.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ProfileButtonGroup;
