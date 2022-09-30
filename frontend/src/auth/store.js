import { reactive } from 'vue'

// a simple store for authentication state.
// from: https://v3.vuejs.org/guide/state-management.html

// before calling APIs, retrieve the accessToken from Amplify Auth module's `getSession()`.
// this will return a valid access token (if expired, will use the refresh token to acquire a new one).
// see: https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-session

export const authStore = {
  debug: false,
  state: reactive({
    loggedIn: false,
    user: undefined,
    isAdmin: false,
  }),

  setLoggedOut() {
    if (this.debug) {
      console.log("setting logged out.");
    }
    this.state.loggedIn = false;
    this.state.user = undefined;
    this.state.isAdmin = false;
  },

  setLoggedIn(user) {
    if (this.debug) {
      console.log("setting logged in.");
      console.log(user);
    }
    this.state.loggedIn = true;
    this.state.user = user;
    this.state.isAdmin = user.signInUserSession.idToken.payload["cognito:groups"]?.includes("Admins") ?? false;
  },

  isMember(group) {
    if (!this.state.user) return false;
    const groups = this.state.user.signInUserSession.idToken.payload["cognito:groups"];
    return groups && groups.includes(group);
  }
}
