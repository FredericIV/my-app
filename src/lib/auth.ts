import { UserManager } from 'oidc-client-ts';
import type { UserManagerSettings } from 'oidc-client-ts';
import { PUBLIC_OIDC_CALLBACK_URI, PUBLIC_OIDC_AUTHORITY, PUBLIC_OIDC_CLIENTID } from  '$env/static/public';

const userManagerConfig: UserManagerSettings = {
  authority: PUBLIC_OIDC_AUTHORITY,
  client_id: PUBLIC_OIDC_CLIENTID,
  redirect_uri: PUBLIC_OIDC_CALLBACK_URI,
};

const userManager = new UserManager(userManagerConfig);

export async function login() {
  return userManager.signinRedirect();
}

export async function logout() {
  return userManager.signoutRedirect();
}

export async function getUser() {
  const user = userManager.getUser();
  userManager.storeUser(await user);
  return user;
}

export async function callback() {
  return userManager.signinRedirectCallback();
}
