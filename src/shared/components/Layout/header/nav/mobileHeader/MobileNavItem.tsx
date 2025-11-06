import { NavLink } from 'react-router-dom';
import { navItem } from '../navItem';

function MobileNavItem({ setShowMobileNav }: { setShowMobileNav: (show: boolean) => void }) {
  return (
    <nav className="block md:hidden" aria-label="모바일 네비게이션">
      <ul className="flex flex-col gap-6">
        {navItem.map((item) => (
          <li key={item.href} className="w-full">
            <NavLink
              to={item.href}
              onClick={() => setShowMobileNav(false)}
              className={({ isActive }) =>
                `block w-full ${isActive ? 'text-primary font-semibold' : 'transition-colors hover:text-primary/60'}`
              }
              aria-label={`${item.name} 페이지로 이동`}
            >
              {({ isActive }) => (
                <span aria-current={isActive ? 'page' : undefined}>{item.name}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MobileNavItem;
