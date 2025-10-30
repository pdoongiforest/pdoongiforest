import { NavLink } from 'react-router-dom';
import { navItem } from './navItem';

function HeaderNav() {
  return (
    <nav className="flex flex-1 items-center justify-center w-full">
      <ul className="flex gap-10">
        {navItem.map((item) => (
          <li key={item.href}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `${isActive ? 'text-primary' : 'text-header-text hover:text-header-text/60'}`
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
