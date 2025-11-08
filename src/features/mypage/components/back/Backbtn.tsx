import { useNavigate } from 'react-router-dom';
import BackIcon from '/icons/back.svg';

function Backbtn() {
  const navigate = useNavigate();
  return (
    <button className="absolute top-10 left-6" onClick={() => navigate(-1)} type="button">
      <img src={BackIcon} alt="뒤로가기" className="w-6 h-6" />
    </button>
  );
}

export default Backbtn;
