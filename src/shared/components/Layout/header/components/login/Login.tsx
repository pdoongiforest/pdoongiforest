import { Link } from 'react-router-dom';

function Login() {
  return (
    <button className="">
      <Link to="/login" className="hover:text-header-text/60">
        로그인
      </Link>
    </button>
  );
}

export default Login;
