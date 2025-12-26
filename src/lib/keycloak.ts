import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL as string,
  realm: import.meta.env.VITE_REALM as string,
  clientId: import.meta.env.VITE_CLIENT_ID as string,
});

export default keycloak;
