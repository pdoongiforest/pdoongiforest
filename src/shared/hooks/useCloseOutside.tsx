import { useEffect } from 'react';

type Props = {
  menuRef: React.RefObject<HTMLElement | null>;
  triggerRef?: React.RefObject<HTMLElement | null> | null;
  onClose: () => void;
  isActive?: boolean;
};

function useCloseOutside({ menuRef, onClose, isActive = true, triggerRef = null }: Props) {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        (!triggerRef?.current || !triggerRef.current.contains(target))
      ) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef, onClose, isActive]);
}

export default useCloseOutside;
