import { NavLink } from 'react-router-dom';
import { navItem } from '../navItem';

function MobileNavItem({ setShowMobileNav }: { setShowMobileNav: (show: boolean) => void }) {
  return (
    <nav className="block md:hidden">
      <ul className="flex flex-col gap-6">
        {navItem.map((item) => (
          <li key={item.href}>
            <NavLink
              to={item.href}
              onClick={() => setShowMobileNav(false)}
              className={({ isActive }) =>
                `${isActive ? 'text-primary font-semibold' : 'transition-colors'}`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MobileNavItem;
