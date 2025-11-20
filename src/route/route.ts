import Admin from '@/pages/Admin/Admin';
import Board from '@/pages/Board/Board';
import BoardDetail from '@/pages/Board/BoardDetail';
import BoardCreate from '@/pages/BoardWrite/BoardCreate';
import Login from '@/pages/Login/login';
import Main from '@/pages/Mainpage/Main';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import Root from '@/pages/Root';
import Team from '@/pages/team/Team';
import Thread from '@/pages/team/thread/Thread';
import InfoChange from '@/pages/Mypage/InfoChange';
import PasswordChange from '@/pages/Mypage/PasswordChange';
import Mypage from '@/pages/Mypage/Mypage2';
import { createBrowserRouter } from 'react-router-dom';
import supabase from '@/supabase/supabase';
import TeamDetail from '@/pages/team/detail/TeamDetail';
import PeerReview from '@/pages/team/peerReview/PeerReview';
import Setting from '@/pages/team/setting/Setting';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        path: '/',
        Component: Main,
      },
      {
        path: '/write',
        Component: BoardCreate,
      },
      {
        path: '/board',
        Component: Board,
      },
      {
        path: '/board/:id',
        Component: BoardDetail,
      },
      {
        path: '/team',
        Component: Team,
      },
      {
        path: '/team/:id',
        loader: async ({ params }) => {
          const [studyData, memberData, approveData] = await Promise.all([
            supabase.from('study').select('*, board(*)').eq('study_id', params.id).maybeSingle(),

            supabase
              .from('study_member')
              .select('*, user_profile(*, user_base(*))')
              .eq('study_id', params.id),

            supabase
              .from('study_approve')
              .select('*, user_profile(*, user_base(*))')
              .eq('study_id', params.id),
          ]);

          return {
            study: studyData.data,
            members: memberData.data,
            approves: approveData.data,
          };
        },
        Component: TeamDetail,
        children: [
          {
            index: true,
            Component: Thread,
          },
          {
            path: 'peerreview',
            Component: PeerReview,
          },
          {
            path: 'settings',
            Component: Setting,
          },
        ],
      },
      {
        path: '/mypage/:id',
        Component: Mypage,
      },
      {
        path: '/mypage/:id/info',
        Component: InfoChange,
      },
      {
        path: '/mypage/:id/password',
        Component: PasswordChange,
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/admin',
    Component: Admin,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
