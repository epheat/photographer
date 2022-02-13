import { reactive } from 'vue'

// a simple store for authentication state.
// from: https://v3.vuejs.org/guide/state-management.html

// before calling APIs, retrieve the accessToken from Amplify Auth module's `getSession()`.
// this will return a valid access token (if expired, will use the refresh token to acquire a new one).
// see: https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-session

export const authStore = {
  debug: true,
  state: reactive({
    loggedIn: false,
    user: undefined,
  }),

  setLoggedOut() {
    if (this.debug) {
      console.log("setting logged out.");
    }
    this.state.loggedIn = false;
    this.state.user = undefined;
  },

  setLoggedIn(user) {
    if (this.debug) {
      console.log("setting logged in.");
    }
    this.state.loggedIn = true;
    this.state.user = user;
  }
}
