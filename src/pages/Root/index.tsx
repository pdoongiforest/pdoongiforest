import { useAuth } from '@/features/auth/AuthProvider';
import Header from '@/shared/components/Layout/header/Header';
import { Outlet } from 'react-router-dom';

function Root() {
  const { profileId, isAuth } = useAuth();
  return (
    <div>
      <Header profileId={profileId} isAuth={isAuth} />
      <main className="flex flex-1  mt-20 h-screen">
        <Outlet />
      </main>
    </div>
  );
}
export default Root;
