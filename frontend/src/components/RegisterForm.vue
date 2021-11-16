<template>
  <div class="ps-register-form form">
    <p>Welcome to the _photographer_ website! Please register with your desired username, email, and a password that you don't use anywhere else.</p>
    <form-field v-model="username" label="Username"/>
    <form-field v-model="email" label="Email"/>
    <form-field v-model="password" label="Password" :secret="!showPassword" />
    <div class="form-container mb-10">
      <label>Show Password</label>
      <input type="checkbox" v-model="showPassword"/>
    </div>
    <button @click="submit">Register</button>
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import FormField from "./FormField.vue";

export default {
  props: {
    errorMessage: String
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      showPassword: false,
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {
        username: this.username,
        email: this.email,
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

</style>