<template>
  <div class="ps-reset-password-form form">
    <p>You must reset your password in order to continue. Please select a password that you don't use anywhere else.</p>
    <form-field v-model="currentPassword" label="Current Password" :secret="!showPassword" />
    <form-field v-model="newPassword1" label="New Password" :secret="!showPassword" />
    <form-field v-model="newPassword2" label="Confirm Password" :secret="!showPassword" />

    <div class="form-container mb-10">
      <label>Show Passwords</label>
      <input type="checkbox" v-model="showPassword"/>
    </div>
    <button @click="submit">Reset</button>
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
      currentPassword: "",
      newPassword1: "",
      newPassword2: "",
      showPassword: false,
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {
        currentPassword: this.currentPassword,
        newPassword1: this.newPassword1,
        newPassword2: this.newPassword2
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