import { NavLink } from 'react-router-dom';
import { navItem } from './navItem';

function HeaderNav() {
  return (
    <nav className="flex-1 w-full hidden md:block">
      <ul className="flex-center gap-10">
        {navItem.map((item) => (
          <li key={item.href}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `${isActive ? 'text-primary font-semibold' : 'transition-colors hover:text-text-primary/60'}`
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

export default HeaderNav;
