<template>
  <div class="ps-confirmation-form form">
    <p>Enter the 6 digit confirmation code that was sent to your email.</p>
    <form-field v-model="code" label="Code" :secret="!showPassword" />
    <div class="form-container mb-10">
      <label>Show Code</label>
      <input type="checkbox" v-model="showPassword"/>
    </div>
    <button @click="submit">Confirm</button>
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
      code: "",
      showPassword: false,
    }
  },
  methods: {
    submit() {
      this.$emit('submit', {
        code: this.code,
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