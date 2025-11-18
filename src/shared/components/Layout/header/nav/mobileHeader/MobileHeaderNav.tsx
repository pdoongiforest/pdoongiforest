import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useAnimationStartEnd } from '@/shared/hooks/useAnimationStartEnd';
import MobileHeaderNavOverlay from './MobileHeaderNavOverlay';
import MobileHeaderNavMenu from './MobileHeaderNavMenu';

interface Props {
  showMobileNav: boolean;
  setShowMobileNav: (show: boolean) => void;
}

function MobileHeaderNav({ showMobileNav, setShowMobileNav }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  const { visible } = useAnimationStartEnd({
    ref: menuRef,
    configOpen: {
      from: { x: -40, opacity: 0 },
      to: { x: 0, opacity: 1 },
    },
    configClose: {
      from: { x: 0, opacity: 1 },
      to: { x: -40, opacity: 0 },
    },
    showModal: showMobileNav,
  });

  if (!showMobileNav && !visible) return null;

  const rootElement = document.getElementById('root');
  if (!rootElement) return null;

  return createPortal(
    <>
      <MobileHeaderNavOverlay onClose={() => setShowMobileNav(false)} />
      <MobileHeaderNavMenu menuRef={menuRef} setShowMobileNav={setShowMobileNav} />
    </>,
    rootElement
  );
}

export default MobileHeaderNav;
