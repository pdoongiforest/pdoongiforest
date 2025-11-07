import './App.css';
// import '@/shared/style/reset.css';
import '@/shared/style/global.css';

import { Route, Routes, useLocation } from 'react-router-dom';

import StudyMemberChannel from './pages/Study/StudyMemberChannel';
import Thread from './pages/Study/components/Thread';
import StudyJoinInfomation from './pages/Study/StudyJoinInfomation';

import Register from './pages/Register';
import Login from './pages/Login/login';
import Management from './pages/Study/components/management/Management';
import Approve from './pages/Study/components/management/Approve';
import ManagementMembers from './pages/Study/components/management/ManagementMembers';
import MangementChannel from './pages/Study/components/management/ManagementChannel';

import { useState } from 'react';

import PeerReiview from './pages/team/peerReview/PeerReview';
import Team from './pages/team/Team';

import NotFound from './pages/NotFound';
import Admin from './pages/Admin/Admin';
import { useAuth } from './features/auth/AuthProvider';
import { NotificationProvider } from './shared/context/NotificationContext';
import { AdminProvider } from './shared/context/useAdmin';

import Main from './pages/Mainpage/Main';
import Header from './shared/components/Layout/header/Header';
import TeamDetail from './pages/team/detail/TeamDetail';
import Setting from './pages/team/setting/Setting';

import Board from './pages/Board/Board';
import BoardDetail from './pages/Board/BoardDetail';
import BoardCreate from './pages/BoardWrite/BoardCreate';
import Mypage2 from './pages/Mypage/Mypage2';

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
    path.startsWith('/team') ||
    path.startsWith('/admin')
  );
  const [isOverlay, setIsOverlay] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const { profileId, isAuth } = useAuth();

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
        {!isAuthPage && !isNotFoundPage && <Header profileId={profileId} isAuth={isAuth} />}
        <main className="flex flex-1  mt-20 h-screen">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/:id" element={<BoardDetail />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team/:id" element={<TeamDetail />}>
              <Route path="peerreview" element={<PeerReiview />}></Route>
              <Route path="settings" element={<Setting />}></Route>
            </Route>

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
            <Route path="/write" element={<BoardCreate />} />
            <Route path="/write/:id" element={<BoardCreate />} />
            <Route path="/mypage/:id" element={<Mypage2 />} />
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
