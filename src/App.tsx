import { RouterProvider } from 'react-router-dom';
import './App.css';
import '@/shared/style/global.css';
import { router } from './route/route';

function App() {
  return <RouterProvider router={router} />;
}
export default App;
