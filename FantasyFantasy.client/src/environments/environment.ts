import domain from '../../auth_config.json';
import clientId from '../../auth_config.json';
import audience from '../../auth_config.json';
import serverUrl from '../../auth_config.json';
export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    reirectUri: window.location.origin,
    audience,
  },
  dev: {
    serverUrl,
  },
};
