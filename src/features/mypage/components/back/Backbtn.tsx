import { useNavigate, useParams } from 'react-router-dom';
import BackIcon from '/icons/back.svg';

function Backbtn() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <button
      className="absolute top-10 left-6"
      onClick={() => {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate(`/mypage/${id}`);
        }
      }}
      type="button"
    >
      <img src={BackIcon} alt="뒤로가기" className="w-6 h-6" />
    </button>
  );
}

export default Backbtn;
