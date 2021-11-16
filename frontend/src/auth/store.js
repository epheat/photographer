const authState = {
  loggedIn: false,
  user: undefined,
}

export const setLoggedOut = () => {
  authState.loggedIn = false;
  authState.user = undefined;
}

export const setLoggedIn = (user) => {
  authState.loggedIn = true;
  authState.user = user;
}

export const getAuthState = () => {
  return authState;
}