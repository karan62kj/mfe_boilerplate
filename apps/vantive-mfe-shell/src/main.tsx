// @ts-nocheck
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { appStore } from './business/store/app.store.ts';
import { SecurityWrapper } from './presentation/components/auth/SecurityWrapper';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <SecurityWrapper>
          <App />
        </SecurityWrapper>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
