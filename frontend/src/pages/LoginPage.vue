<template>
    <div class="ps-login-page page">
        <h1>Login</h1>
        <login-form @submit="onSubmit"/>
        <p>© Evan Heaton 2021</p>
    </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  name: 'LoginPage',
  props: {
    
  },
  data() {
    return {
      
    }
  },
  methods: {
    onSubmit(e) {
      console.log(e);
    }
  },
  components: {
    'login-form': LoginForm
  }
}
</script>

<style lang="scss" scoped>
.ps-login-page {
  h1 {
    margin: 0;
    padding: 10px 0px;
    text-align: center;
  }
}

</style>