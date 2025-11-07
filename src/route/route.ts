import Board from '@/pages/Board/Board';
import BoardDetail from '@/pages/Board/BoardDetail';
import BoardWrite from '@/pages/BoardWrite/BoardWrite';
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
        Component: BoardWrite,
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
    path: '*',
    Component: NotFound,
  },
]);
