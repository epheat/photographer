<template>
  <div class="ps-nav-auth">
    <div class="ps-nav-container" v-if="!isLoggedIn">
      <router-link to="/auth/login">Login</router-link>
      <router-link to="/auth/register">Register</router-link>
    </div>
    <div class="ps-nav-container" v-else>
      <div class="nav-icon"></div>
      <div class="nav-welcome">Hello, user!</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_colors.scss";

.ps-nav-auth {
  font-size: 0.8em;
  a {
    text-decoration: none;
    color: $ps-daisy;
  }
}

.ps-nav-container {
  display: flex;
  justify-content: space-around;
}
</style>