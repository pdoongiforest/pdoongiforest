import MobileHeaderLogo from './MobileHeaderLogo';
import MobileNavItem from './MobileNavItem';

interface Props {
  menuRef: React.RefObject<HTMLDivElement | null>;
  setShowMobileNav: (show: boolean) => void;
}

function MobileHeaderNavMenu({ menuRef, setShowMobileNav }: Props) {
  return (
    <div
      className="px-7 py-10 fixed top-0 z-9999 h-full w-50 bg-white shadow-md shadow-black/10 block md:hidden"
      ref={menuRef}
      aria-label="모바일 네비게이션 메뉴"
    >
      <MobileHeaderLogo />
      <MobileNavItem setShowMobileNav={setShowMobileNav} />
    </div>
  );
}

export default MobileHeaderNavMenu;
