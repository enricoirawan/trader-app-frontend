import { useKeycloak } from '@react-keycloak/web';

export const useAuth = () => {
  const { keycloak, initialized } = useKeycloak();

  return {
    isAuthenticated: keycloak.authenticated,
    isLoading: !initialized,
    user: keycloak.tokenParsed,
    username: keycloak.tokenParsed?.preferred_username,
    email: keycloak.tokenParsed?.email,
    name: keycloak.tokenParsed?.name,
    roles: keycloak.tokenParsed?.realm_access?.roles || [],
    login: () => keycloak.login(),
    logout: () => keycloak.logout(),
    token: keycloak.token,
  };
};
