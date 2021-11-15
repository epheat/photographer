<template>
    <div class="ps-navbar">
        <router-link to="/" class="title">photographer</router-link>
        <router-link to="/posts">Posts</router-link>
        <router-link to="/music">Music</router-link>
        <nav-auth class="auth"></nav-auth>
    </div>
</template>

<script>
import NavAuth from "./NavAuth.vue";

export default {
    data() {
        return {

        }
    },
    components: {
        'nav-auth': NavAuth
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/_colors.scss";

.ps-navbar {
    display: flex;
    justify-content: space-around;
    padding: 16px;
    background-color: $ps-navy;

    .title {
        color: $ps-jeans;
        font-weight: 800;
        font-size: 1.2em;
        flex-basis: 150px;
    }

    .auth {
        flex-basis: 150px;
    }

    a {
        color: white;
        text-decoration: none;
    }
}
</style>