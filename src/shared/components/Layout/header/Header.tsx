import AfterLogin from './components/afterLogin/AfterLogin';
import Login from './components/login/Login';
import Logo from './components/logo/Logo';
import HeaderNav from './nav/HeaderNav';

interface Props {
  profileId: string | null;
  isAuth: boolean;
}

function Header({ profileId, isAuth = true }: Props) {
  return (
    <header className="w-full bg-header text-header-text h-[80px] fixed inset-0 flex gap-5 z-10 items-center justify-between px-5">
      <Logo />
      <HeaderNav />
      {isAuth ? <AfterLogin profileId={profileId} /> : <Login />}
    </header>
  );
}

export default Header;
