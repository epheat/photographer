<template>
  <div id="ps-app-container">
    <authenticator>
      <navbar></navbar>
      <router-view></router-view>
      {{ user }}
    </authenticator>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { useAuthenticator } from '@aws-amplify/ui-vue'

export default {
  name: 'App',
  components: {
    navbar: Navbar
  },
  setup() {
    const { user, signOut } = useAuthenticator();
    return {
      user,
      signOut
    }
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
