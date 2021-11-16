import { reactive } from 'vue'

// a simple store for authentication state.
// from: https://v3.vuejs.org/guide/state-management.html

export const authStore = {
  debug: false,
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
      console.log(`setting logged in.`);
    }
    this.state.loggedIn = true;
    this.state.user = user;
  }
}
