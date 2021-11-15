const authState = {
  loggedIn: false,
  userId: undefined,
  username: undefined,
}

export const setLoggedOut = () => {
  authState.loggedIn = false;
  authState.userId = undefined;
  authState.username = undefined;
}

export const setLoggedIn = (userId, username) => {
  authState.loggedIn = true;
  authState.userId = userId;
  authState.username = username;
}

export const getAuthState = () => {
  return authState;
}