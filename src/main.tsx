import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ReactKeycloakProvider } from '@react-keycloak/web';

import './index.css';

import AppRouter from './routes/AppRouter';
import keycloak from './lib/keycloak';

document.documentElement.classList.add('dark');
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        checkLoginIframe: false,
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ReactKeycloakProvider>
  </StrictMode>
);
