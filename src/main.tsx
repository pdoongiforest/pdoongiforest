import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/style/main.css';
import App from './App.tsx';

import { KakaoLoaderProvider } from './shared/context/useKakaoLoaderProvider.tsx';
import ToastProvider from './shared/components/ToastProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <BrowserRouter>
      <KakaoLoaderProvider>
        <App />
      </KakaoLoaderProvider>
    </BrowserRouter>
  </ToastProvider>
);
