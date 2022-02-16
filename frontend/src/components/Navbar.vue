<template>
  <div class="ps-navbar-container">
    <div class="ps-navbar">
      <div class="title" @click="onClickTitle">
        <a>photographer</a>
        <div class="triangle" :class="{ extended: navExtended }" v-if="isMobile" />
      </div>
      <div class="navs" v-if="!isMobile">
        <router-link to="/posts">Posts</router-link>
        <router-link to="/games">Games</router-link>
      </div>
      <nav-auth class="auth"></nav-auth>
    </div>
    <div class="mobile-navs" v-if="isMobile && navExtended">
      <router-link to="/">Home</router-link>
      <router-link to="/posts">Posts</router-link>
      <router-link to="/games">Games</router-link>
    </div>
  </div>
</template>

<script>
import NavAuth from "./NavAuth.vue";

export default {
  data() {
    return {
      windowWidth: window.innerWidth,
      navExtended: false,
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    onClickTitle() {
      if (!this.isMobile) {
        this.$router.push("/")
      } else {
        this.navExtended = !this.navExtended;
      }
    }
  },
  computed: {
    isMobile() {
      return this.windowWidth < 600;
    }
  },
  components: {
    'nav-auth': NavAuth
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_colors.scss";

.ps-navbar-container {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-auto-flow: column;

  .mobile-navs {
    display: grid;
    grid-auto-flow: row;

    a {
      background-color: $ps-dark;
      padding: 8px;
      padding-left: 15px;
      border-bottom: 1px solid $ps-white;
    }
  }

  a {
    color: white;
    text-decoration: none;
  }
}

.ps-navbar {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: $ps-navy;

  .title {
    flex-basis: 150px;
    display: flex;
    a {
      font-weight: 800;
      font-size: 1.2em;
      color: $ps-jeans;
      cursor: pointer;
    }

    .triangle {
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;

      border-top: 8px solid $ps-jeans;
      margin: 5px;
      transition: transform 0.3s;

      &.extended {
        transform: rotate(180deg);
      }
    }
  }

  .navs {
    display: flex;
    justify-content: space-around;
    // flex grow makes the nav links expand to fill horizontal space in navbar
    flex-grow: 2;
    max-width: 400px;
  }

  .auth {
    flex-basis: 150px;
  }
}
</style>