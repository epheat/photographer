<template>
  <div class="ps-form-field">
    <label>{{ label }}</label>
    <input
      :type="inputType"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  props: {
    // for v-model in Vue3, use modelValue instead of value
    // https://v3.vuejs.org/guide/migration/v-model.html#_3-x-syntax
    modelValue: {
      type: [String, Number],
    },
    label: String,
    secret: Boolean,
  },
  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  },
  computed: {
    inputType() {
      return this.secret ? "password" : "text";
    }
  }
}
</script>

<style lang="scss" scoped>
.ps-form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  input {
    height: 20px;
  }
}
</style>