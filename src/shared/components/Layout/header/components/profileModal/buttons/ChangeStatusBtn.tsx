import { useState } from 'react';
import ArrowIcon from '@/shared/assets/expandLeft.svg';
import StatusModal from '../../statusModal/StatusModal';

function ChangeStatusBtn() {
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <>
      <button
        className="w-full h-10 border-primary border text-primary relative rounded-lg cursor-pointer hover:bg-primary/20 hover:text-white transition-colors flex items-center justify-between px-2"
        onMouseEnter={() => setShowStatusModal(true)}
        onMouseLeave={() => setShowStatusModal(false)}
      >
        <img src={ArrowIcon} alt="arrow" className="w-4 h-4" />
        <span>상태 변경</span>
      </button>
      <StatusModal showStatusModal={showStatusModal} setShowStatusModal={setShowStatusModal} />
    </>
  );
}

export default ChangeStatusBtn;
