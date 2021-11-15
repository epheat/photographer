<template>
  <div class="ps-app-container">
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

<style lang="scss">
@import "scss/_colors.scss";

#app {
  color: #2c3e50;
  font-family: monospace;
}

.ps-app-container {
  background-color: $ps-offwhite;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-auto-flow: column;
}

.page {
  width: 800px; // todo: responsive
  background-color: $ps-white;
  justify-self: center;
}

.mb-10 {
  margin-bottom: 10px;
}
</style>
