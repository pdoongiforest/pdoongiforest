import { useAuth } from '@/features/auth/AuthProvider';

function LogoutBtn() {
  const { logout } = useAuth();

  return (
    <button
      type="button"
      onClick={logout}
      aria-label="로그아웃 버튼"
      className="w-full h-10 border-primary border text-primary rounded-lg hover:bg-primary/20 hover:text-white transition-colors flex items-center justify-end px-2"
    >
      로그아웃
    </button>
  );
}

export default LogoutBtn;
