import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import '@/shared/style/main.css';
import App from './App.tsx';

import { KakaoLoaderProvider } from './shared/context/useKakaoLoaderProvider.tsx';
import ToastProvider from './shared/components/ToastProvider.tsx';
import { AuthProvider } from './features/auth/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <AuthProvider>
      <KakaoLoaderProvider>
        <App />
      </KakaoLoaderProvider>
    </AuthProvider>
  </ToastProvider>
);
