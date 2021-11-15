<template>
  <div class="ps-login-form">
    <form-field v-model="username" label="Username" />
    <form-field v-model="password" label="Password" :secret="!showPassword" />
    <div class="form-container mb-10">
      <label>Show Password</label>
      <input type="checkbox" v-model="showPassword"/>
    </div>
    <div class="form-container mb-10">
      <div>Forgot Password? Click <router-link to="/forgot">here.</router-link></div>
    </div>
    <button @click="submit">Login</button>
  </div>
</template>

<script>
import FormField from "./FormField.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {
        username: this.username,
        password: this.password
      })
    }
  },
  components: {
    'form-field': FormField
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/_colors.scss";

.ps-login-form {
  display: flex;
  flex-direction: column;
  background-color: $ps-true-white;
  max-width: 400px;
  padding: 10px;
  margin: 0 auto;
}

.form-container {

}
</style>