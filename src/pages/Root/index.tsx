import { useAuth } from '@/features/auth/AuthProvider';
import Footer from '@/shared/components/Layout/footer/Footer';
import Header from '@/shared/components/Layout/header/Header';
import { Outlet } from 'react-router-dom';

function Root() {
  const { profileId, isAuth } = useAuth();
  return (
    <div>
      <Header profileId={profileId} isAuth={isAuth} />
      <main className="flex flex-1 mx-auto mt-20 min-h-screen pb-30">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Root;
