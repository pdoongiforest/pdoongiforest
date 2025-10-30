import { useEffect, useState } from 'react';
import S from './Login.module.css';
import supabase from '@/supabase/supabase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthProvider';
import { showErrorAlert, showInfoAlert, showSuccessAlert } from '@/shared/utils/sweetAlert';
import PasswordInput from '@/shared/components/PasswordInput';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  useEffect(() => {
    if (!isLoginSuccess) return;
    if (!user) return;
    const fetchData = async () => {
      const { error: statusError } = await supabase
        .from('user_base')
        .update({ status: 0 })
        .eq('id', user.id);

      if (statusError) {
        console.error('상태 업데이트 실패:', statusError.message);
        return;
      }
    };
    fetchData();
  }, [user, isLoginSuccess]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: password,
    });

    if (error) {
      console.error(error.message);
      await showErrorAlert('로그인 실패', '이메일 또는 비밀번호가 일치하지 않습니다.');
      setError('이메일 또는 비밀번호가 일치하지 않습니다.');
      return;
    }

    const checkApprove = async () => {
      const { data: profileData, error: profileError } = await supabase
        .from('user_profile')
        .select('user_id')
        .eq('email', email)
        .single();

      if (profileError || !profileData) {
        console.error('user_profile 조회 실패', profileError);
        return;
      }

      const userId = profileData.user_id;

      const { data: baseData, error: baseError } = await supabase
        .from('user_base')
        .select('approve')
        .eq('id', userId)
        .single();

      if (baseError || !baseData) {
        console.error('user_base 조회 실패', baseError);
        return;
      }
      return baseData.approve;
    };
    const isApproved = await checkApprove();

    if (!isApproved) {
      await showInfoAlert('승인 대기중', '회원가입 승인 대기중입니다.');
      await logout();
      return;
    } else {
      await showSuccessAlert('로그인 성공!', '환영합니다 좋은 하루 되세요!🌱');
      setTimeout(() => {
        navigate('/');
      }, 500);
      setIsLoginSuccess(true);
    }
  };

  return (
    <div className={S.container}>
      <div className={S.content}>
        <div className={S.logo}>
          <img src="images/loginbanner2.png" alt="모여봐요 프둥이숲" />
        </div>

        <div className={S.loginBox}>
          <img src="/images/nail.png" className={`${S.nail} ${S['top-left']}`} />
          <img src="/images/nail.png" className={`${S.nail} ${S['top-right']}`} />
          <img src="/images/nail.png" className={`${S.nail} ${S['bottom-left']}`} />
          <img src="/images/nail.png" className={`${S.nail} ${S['bottom-right']}`} />

          <form className={S.form} onSubmit={handleLogin}>
            <Link to="/" className={S.toMain}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              메인으로 돌아가기
            </Link>

            <label htmlFor="username">이메일</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="이메일을 입력해주세요"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">비밀번호</label>
            <PasswordInput
              id={password}
              name="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className={S.link}>
              <Link to="/register" className={S.a}>
                아직 프둥이숲 주민이 아니신가요?
              </Link>
            </div>

            <button className={S.login} type="submit">
              로그인하기
            </button>

            {error && (
              <p className={S.p}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14px"
                  height="14px"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
