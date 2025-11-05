import './App.css';
// import '@/shared/style/reset.css';
import '@/shared/style/global.css';

import { Route, Routes, useLocation } from 'react-router-dom';

import StudyMemberChannel from './pages/Study/StudyMemberChannel';
import Thread from './pages/Study/components/Thread';
import Mypage from './pages/Mypage/Mypage';
import StudyJoinInfomation from './pages/Study/StudyJoinInfomation';

import Register from './pages/Register';
import Login from './pages/Login/login';
import Management from './pages/Study/components/management/Management';
import Approve from './pages/Study/components/management/Approve';
import ManagementMembers from './pages/Study/components/management/ManagementMembers';
import MangementChannel from './pages/Study/components/management/ManagementChannel';

import { useState } from 'react';

import PeerReiview from './pages/PeerReview/PeerReiview';
import Team from './pages/team/Team';

import NotFound from './pages/NotFound';
import Admin from './pages/Admin/Admin';
import { useAuth } from './features/auth/AuthProvider';
import { NotificationProvider } from './shared/context/NotificationContext';
import { AdminProvider } from './shared/context/useAdmin';
import BoardWrite from './pages/BoardWrite/BoardWrite';

import Main from './pages/Mainpage/Main';
import Header from './shared/components/Layout/header/Header';
import Board from './pages/Board/Board';

function App() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isNotFoundPage = !(
    path === '/' ||
    path.startsWith('/login') ||
    path.startsWith('/register') ||
    path.startsWith('/board') ||
    path.startsWith('/channel') ||
    path.startsWith('/write') ||
    path.startsWith('/mypage/') ||
    path.startsWith('/team')
  );
  const [isOverlay, setIsOverlay] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const { profileId } = useAuth();

  return (
    <NotificationProvider profileId={profileId}>
      <div className="">
        {isOverlay && (
          <div
            className="overlay"
            onClick={() => {
              setIsNotification(!isNotification);
              setIsOverlay(!isOverlay);
            }}
          ></div>
        )}
        {!isAuthPage && !isNotFoundPage && <Header profileId={profileId} isAuth={true} />}
        <main className="flex flex-1 mt-20 w-s h-screen justify-center">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/board" element={<Board />} />
            <Route path="/team" element={<Team />} />
            <Route
              path="/channel/:id"
              element={
                <AdminProvider>
                  <StudyMemberChannel />
                </AdminProvider>
              }
            >
              <Route index element={<StudyJoinInfomation />} />
              <Route path="memberchannel" element={<StudyMemberChannel />} />
              <Route path="thread" element={<Thread />} />
              <Route path="peerReview/:id" element={<PeerReiview />} />
              <Route path="management" element={<Management />}>
                <Route index element={<MangementChannel />} />
                <Route path="approve" element={<Approve />} />
                <Route path="managementmembers" element={<ManagementMembers />} />
              </Route>
            </Route>
            <Route path="/write" element={<BoardWrite />} />
            <Route path="/write/:id" element={<BoardWrite />} />
            <Route path="/mypage/:id" element={<Mypage />} />
            {profileId === '163205a8-db22-4ed6-b44d-2e12718acb17' && (
              <Route path="/admin" element={<Admin />}></Route>
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </NotificationProvider>
  );
}
export default App;
