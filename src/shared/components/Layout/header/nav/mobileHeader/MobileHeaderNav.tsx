import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MobileNavItem from './MobileNavItem';
import MobileHeaderLogo from './MobileHeaderLogo';

interface Props {
  showMobileNav: boolean;
  setShowMobileNav: (show: boolean) => void;
}

function MobileHeaderNav({ showMobileNav, setShowMobileNav }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!menuRef.current) return;

    if (showMobileNav) {
      setVisible(true);
      // ✅ 애니메이션을 매번 새로 만들기
      const tl = gsap.timeline();
      gsap.set(menuRef.current, { x: -40, opacity: 0 }); // 초기 위치 설정
      tl.to(menuRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else if (visible) {
      // ✅ 닫을 때도 새로 만들기
      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      });
      tl.to(menuRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [showMobileNav, menuRef.current]);

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
