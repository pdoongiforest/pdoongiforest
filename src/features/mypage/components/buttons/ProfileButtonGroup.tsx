import { useNavigate, useParams } from 'react-router-dom';
import MoreIcon from '../../../../shared/assets/icons/more.svg';
import { useRef, useState } from 'react';
import useCloseOutside from '@/shared/hooks/useCloseOutside';

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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const buttonRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useCloseOutside({
    menuRef: buttonRef,
    onClose: () => {
      setShowModal(false);
    },
    triggerRef,
    isActive: showModal,
  });

  const handleButtonClick = (path: 'password' | 'info' | null) => {
    navigate(`/mypage/${id}/${path}`);
    setActiveBtn(path);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="cursor-pointer"
        onClick={() => setShowModal((prev) => !prev)}
        aria-label="프로필 더보기 버튼"
        aria-haspopup="true"
        aria-expanded={showModal}
      >
        <img src={MoreIcon} alt="more" className="w-7 h-7" aria-hidden="true" />
      </button>
      {showModal && (
        <ul
          className="absolute md:top-8 top-10 right-1 flex flex-col gap-3 items-end bg-white py-4 px-6 rounded-lg shadow-sm"
          ref={buttonRef}
        >
          {buttonList.map((button) => (
            <li key={button.path}>
              <button
                type="button"
                className="text-lg text-gray-500  hover:text-secondary transition-colors ease-in-out"
                onClick={() => handleButtonClick(button.path as 'password' | 'info')}
              >
                {button.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ProfileButtonGroup;
