<template>
  <div class="ps-forgot-password-form form">
    <p>Enter your username here to receive a code that you can use to reset your password. Don't forget it next time!</p>
    <form-field v-model="username" label="Username"/>
    <button @click="submit">Send Code</button>
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
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {
        username: this.username,
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