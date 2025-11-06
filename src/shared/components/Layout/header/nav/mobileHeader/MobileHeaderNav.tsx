import { useRef } from 'react';
import { createPortal } from 'react-dom';
import MobileNavItem from './MobileNavItem';
import MobileHeaderLogo from './MobileHeaderLogo';
import { useAnimationStartEnd } from '@/shared/hooks/useAnimationStartEnd';

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
      <div
        className="fixed top-0 left-0 backdrop-blur-sm w-full h-full z-999 bg-white/50 block md:hidden"
        aria-label="모바일 네비게이션 배경"
        onClick={() => {
          console.log('click');
          setShowMobileNav(false);
        }}
      />
      <div
        className={`px-7 py-10 fixed top-0 z-9999 h-full w-50 bg-white shadow-md shadow-black/10 block md:hidden`}
        ref={menuRef}
        aria-label="모바일 네비게이션 메뉴"
      >
        <MobileHeaderLogo />
        <MobileNavItem setShowMobileNav={setShowMobileNav} />
      </div>
    </>,
    rootElement
  );
}

export default MobileHeaderNav;
