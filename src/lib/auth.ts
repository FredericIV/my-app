import { UserManager } from 'oidc-client-ts';
import type { UserManagerSettings } from 'oidc-client-ts';
import {
  PUBLIC_OIDC_CALLBACK_URI,
  PUBLIC_OIDC_AUTHORITY,
  PUBLIC_OIDC_CLIENTID,
  PUBLIC_OIDC_HOST,
} from  '$env/static/public';
const userManagerConfig: UserManagerSettings = {
  authority: PUBLIC_OIDC_AUTHORITY,
  client_id: PUBLIC_OIDC_CLIENTID,
  redirect_uri: PUBLIC_OIDC_CALLBACK_URI,
  post_logout_redirect_uri: PUBLIC_OIDC_HOST,
  includeIdTokenInSilentSignout: true,
};

const userManager = new UserManager(userManagerConfig);

export async function login() {
  return userManager.signinRedirect();
}

export async function logout() {
  return userManager.signoutRedirect();
}

export async function getUser() {
  return userManager.getUser();
}

export async function callback() {
  return userManager.signinRedirectCallback();
}
