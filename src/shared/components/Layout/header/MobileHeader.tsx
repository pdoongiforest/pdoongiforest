import HamburgerIcon from '../../../../shared/assets/icons/hamburger.svg';
import { useState } from 'react';
import MobileHeaderNav from './nav/mobileHeader/MobileHeaderNav';

function MobileHeader() {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleShowMobileNav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowMobileNav((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="block md:hidden"
          onClick={handleShowMobileNav}
          aria-label="모바일 네비게이션 토글 버튼"
        >
          <img src={HamburgerIcon} alt="hamburger" className="w-8 h-8" aria-hidden="true" />
        </button>
      </div>
      <MobileHeaderNav showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} />
    </>
  );
}

export default MobileHeader;
