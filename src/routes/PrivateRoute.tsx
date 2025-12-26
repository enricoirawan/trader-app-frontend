// components/PrivateRoute.tsx
import { useKeycloak } from '@react-keycloak/web';
import { Outlet, useLocation } from 'react-router';

interface PrivateRouteProps {
  children?: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    sessionStorage.setItem('targetUrl', location.pathname);
    keycloak.login({
      redirectUri: window.location.origin + '/callback',
    });
    return null;
  }

  return children ? <>{children}</> : <Outlet />;
};
