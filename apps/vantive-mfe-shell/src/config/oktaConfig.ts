export const oktaConfig = {
  issuer: import.meta.env.VITE_OKTA_DOMAIN,
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + '/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
  disableHttpsCheck: import.meta.env.NODE_ENV,
  tokenManager: {
    autoRenew: true,
    syncStorage: true,
    storage: 'localStorage',
  },
  responseType: ['token', 'id_token'],
  postLogoutRedirectUri: window.location.origin,
};
