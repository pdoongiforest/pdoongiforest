import Admin from '@/pages/Admin/Admin';
import Board from '@/pages/Board/Board';
import BoardDetail from '@/pages/Board/BoardDetail';
import BoardCreate from '@/pages/BoardWrite/BoardCreate';
import Login from '@/pages/Login/login';
import Main from '@/pages/Mainpage/Main';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import Root from '@/pages/Root';
import TeamDetail from '@/pages/team/detail/TeamDetail';
import PeerReview from '@/pages/team/peerReview/PeerReview';
import Setting from '@/pages/team/setting/Setting';
import Team from '@/pages/team/Team';
import { createBrowserRouter } from 'react-router-dom';

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
        Component: TeamDetail,
        children: [
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
