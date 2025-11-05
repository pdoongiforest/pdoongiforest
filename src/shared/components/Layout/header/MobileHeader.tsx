import HamburgerIcon from '../../../../shared/assets/icons/hamburger.svg';
import { useEffect, useState } from 'react';
import MobileHeaderNav from './nav/mobileHeader/MobileHeaderNav';

function MobileHeader() {
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    console.log('showMobileNav', showMobileNav);
  }, [showMobileNav]);

  const handleShowMobileNav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowMobileNav((prev) => !prev);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button type="button" className="block md:hidden" onClick={handleShowMobileNav}>
          <img src={HamburgerIcon} alt="hamburger" className="w-8 h-8" />
        </button>
      </div>
      <MobileHeaderNav showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav} />
    </>
  );
}

export default MobileHeader;
