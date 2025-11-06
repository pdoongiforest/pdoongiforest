import { NavLink } from 'react-router-dom';
import { navItem } from './navItem';

function HeaderNav() {
  return (
    <nav className="flex-1 w-full hidden md:block h-full" aria-label="메인 네비게이션">
      <ul className="flex-center gap-10 h-full">
        {navItem.map((item) => (
          <li key={item.href} className="h-full flex-center min-w-18">
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `${isActive ? 'text-primary font-semibold ' : 'transition-colors hover:text-text-primary/60'}`
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

export default HeaderNav;
