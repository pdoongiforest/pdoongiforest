import { useAnimationStartEnd } from '@/shared/hooks/useAnimationStartEnd';
import useCloseOutside from '@/shared/hooks/useCloseOutside';
import { useRef, useState } from 'react';
import { statusList } from '../status/statusList';

interface Props {
  showStatusModal: boolean;
  setShowStatusModal: (showStatusModal: boolean) => void;
  isMobile: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

function StatusModal({ showStatusModal, setShowStatusModal, isMobile, triggerRef }: Props) {
  const statusModalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useAnimationStartEnd({
    ref: statusModalRef,
    config: {
      from: { opacity: 0, y: -30 },
      to: { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
    },
    showModal: showStatusModal,
    setVisible: setVisible,
  });

  useCloseOutside({
    menuRef: statusModalRef,
    onClose: () => {
      setShowStatusModal(false);
    },
    isActive: showStatusModal && !isMobile,
    triggerRef,
  });

  return (
    <div
      ref={statusModalRef}
      className={`bg-white md:w-50 w-[220px] h-auto absolute md:-bottom-45 md:-left-52 -right-2 -bottom-65 shadow-md shadow-black/20 rounded-lg px-2 py-5 ${visible ? 'block' : 'hidden'}`}
    >
      <ul className="flex flex-col gap-2">
        {statusList.map((status) => (
          <li
            key={status.code}
            className="flex items-center justify-between gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
          >
            <img src={status.icon} alt={status.name} className="w-4 h-4" />
            {status.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatusModal;
