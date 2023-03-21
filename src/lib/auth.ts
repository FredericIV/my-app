import { UserManager, UserManagerSettings } from 'oidc-client-ts';

const userManagerConfig: UserManagerSettings = {
  // Fill in the OIDC client configuration
  authority: "https://keycloak.fabiv.pw/realms/fabiv.pw",
  client_id: "test_chatgpt",
  redirect_uri: "/signin-callback",
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
