<template>
  <div class="ps-button" :class="{submit: submit, cancel: cancel}" @click="onClick()">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    icon: String,
    submit: Boolean,
    cancel: Boolean
  },
  methods: {
    onClick() {
      this.$emit('press');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/colors.scss";

.ps-button {
  padding: 6px 12px;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  background-color: $ps-button-default;
  box-shadow: 0px 2px 0px $ps-button-default-shadow;

  &.submit {
    background-color: $ps-button-green;
    box-shadow: 0px 2px 0px $ps-button-green-shadow;
  }
  &.cancel {
    background-color: $ps-button-red;
    box-shadow: 0px 2px 0px $ps-button-red-shadow;
  }
}
</style>