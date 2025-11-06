import { useAnimationStartEnd } from '@/shared/hooks/useAnimationStartEnd';
import useCloseOutside from '@/shared/hooks/useCloseOutside';
import { useEffect, useRef, useState } from 'react';
import { statusList } from '../status/statusList';
import type { StatusCode } from '../status/Status';
import supabase from '@/supabase/supabase';
import { useAuth } from '@/features/auth/AuthProvider';
import { getUserStatus } from '../../api/getUser';

interface Props {
  showStatusModal: boolean;
  setShowStatusModal: (showStatusModal: boolean) => void;
  isMobile: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

function StatusModal({ showStatusModal, setShowStatusModal, isMobile, triggerRef }: Props) {
  const statusModalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<StatusCode | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    const fetchUserStatus = async () => {
      const status = await getUserStatus(user?.id);
      if (status) {
        setSelectedStatus(status);
      }
    };
    fetchUserStatus();
  }, [user?.id]);

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

  const handleSelectStatus = async (status: StatusCode) => {
    const success = await supabase
      .from('user_base')
      .update({ status: status })
      .eq('user_id', user?.id);
    if (success) {
      setSelectedStatus(status);
    }
  };

  return (
    <div
      ref={statusModalRef}
      className={`bg-white md:w-50 w-55 h-auto absolute md:-bottom-45 md:-left-52 -right-2 -bottom-65 shadow-md shadow-black/20 rounded-lg px-2 py-5 ${visible ? 'block' : 'hidden'}`}
      aria-label="상태 변경 모달"
    >
      <ul className="flex flex-col gap-2">
        {statusList.map((status) => (
          <li
            key={status.code}
            className={`flex items-center justify-between gap-2 hover:bg-gray-100 p-2 rounded-lg cursor-pointer ${selectedStatus === status.code ? 'bg-gray-100' : ''}`}
            onClick={() => handleSelectStatus(status.code)}
            aria-label={`${status.name} 상태 선택`}
          >
            <img src={status.icon} alt={status.name} className="w-4 h-4" aria-hidden="true" />
            {status.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatusModal;
