<template>
  <div class="ps-app-container">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { authStore } from './auth/store.js';
import { Auth } from 'aws-amplify';

export default {
  name: 'App',
  async beforeMount() {
    try {
      let user = await Auth.currentUserPoolUser();
      if (user) {
        authStore.setLoggedIn(user);
      }
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    navbar: Navbar
  }
}
</script>

<style lang="scss">
@import "scss/_colors.scss";

#app {
  color: #2c3e50;
  font-family: sans-serif;
}

.ps-app-container {
  background-color: $ps-offwhite;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-auto-flow: column;
}

.page {
  max-width: 800px; // todo: responsive
  background-color: $ps-white;
  justify-self: center;
  padding: 0px 15px;

  h1 {
    text-align: center;
  }
}

.mb-10 {
  margin-bottom: 10px;
}
</style>
