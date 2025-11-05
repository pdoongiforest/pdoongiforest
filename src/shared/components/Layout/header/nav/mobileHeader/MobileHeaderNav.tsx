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
  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    console.log('visible', visible);
  }, [visible]);

  useEffect(() => {
    if (menuRef.current && !tweenRef.current) {
      tweenRef.current = gsap
        .timeline({ paused: true, onReverseComplete: () => setVisible(false) })
        .fromTo(
          menuRef.current,
          {
            x: -40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          }
        );
    }

    if (showMobileNav) {
      setVisible(true);
      tweenRef.current?.play();
      console.log('play', tweenRef.current?.progress());
    } else {
      tweenRef.current?.reverse();
      console.log('reverse', tweenRef.current?.progress());
    }
  }, [showMobileNav, tweenRef.current, visible]);

  if (!showMobileNav && !visible) return null;

  const rootElement = document.getElementById('root');
  if (!rootElement) return null;

  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 backdrop-blur-sm w-full h-full z-999 bg-white/50 block md:hidden"
        onClick={() => {
          console.log('click');
          setShowMobileNav(false);
        }}
      />
      <div
        className={`px-7 py-10 fixed top-0 z-9999 h-full w-[200px] bg-white shadow-md shadow-black/10 ${visible ? 'block' : 'hidden'} md:hidden`}
        ref={menuRef}
      >
        <MobileHeaderLogo />
        <MobileNavItem setShowMobileNav={setShowMobileNav} />
      </div>
    </>,
    rootElement
  );
}

export default MobileHeaderNav;
