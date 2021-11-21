<template>
  <div class="ps-component">
    Component {{ foo }}
  </div>
</template>
<script>
export default {
  props: {

  },
  data() {
    return {
      foo: "initial value"
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.ps-component {
  text-align: center;
}
</style>