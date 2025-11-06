import { Link } from 'react-router-dom';

function Login() {
  return (
    <Link
      to="/login"
      className="hover:text-header-text/60 h-full w-18 flex-center"
      aria-label="로그인 페이지로 이동"
      role="button"
    >
      로그인
    </Link>
  );
}

export default Login;
