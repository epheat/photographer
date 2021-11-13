<template>
  <div id="ps-app-container">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    navbar: Navbar
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
