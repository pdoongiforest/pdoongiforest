import { useEffect, useRef, useState } from 'react';
import ArrowIcon from '@/shared/assets/expandLeft.svg';
import StatusModal from '../../statusModal/StatusModal';

function ChangeStatusBtn({ showProfileModal }: { showProfileModal: boolean }) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!showProfileModal) setShowStatusModal(false);
  }, [showProfileModal]);

  const handleMouseEnter = () => {
    setShowStatusModal(true);
  };

  const handleMouseLeave = () => {
    setShowStatusModal(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowStatusModal((prev) => !prev);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        ref={buttonRef}
        aria-label="상태 변경 버튼"
        aria-haspopup="true"
        onTouchStart={handleTouchStart}
        className="w-full h-10 border-primary border text-primary relative rounded-lg hover:bg-primary/20 hover:text-white transition-colors flex items-center justify-between px-2"
      >
        <img src={ArrowIcon} alt="arrow" className="w-4 h-4" aria-hidden="true" />
        <span>상태 변경</span>
      </button>
      <StatusModal
        showStatusModal={showStatusModal}
        setShowStatusModal={setShowStatusModal}
        isMobile={isMobile}
        triggerRef={buttonRef}
      />
    </div>
  );
}

export default ChangeStatusBtn;
