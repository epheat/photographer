<template>
  <div class="ps-form-field">
    <label>{{ label }}</label>
    <select :value="modelValue" @input="onInput">
      <option disabled value="">Please select one:</option>
      <option v-for="option in options" :key="option" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "FormSelect",
  props: {
    // for v-model in Vue3, use modelValue instead of value
    // https://v3.vuejs.org/guide/migration/v-model.html#_3-x-syntax
    modelValue: String,
    label: String,
    options: Array, // [{ value: String, label: String }]
  },
  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.ps-form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  select {
    height: 26px;
  }
}
</style>