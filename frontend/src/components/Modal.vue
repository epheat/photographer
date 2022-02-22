<template>
  <Transition name="modal">
    <div class="mask" v-if="show" @click="this.$emit('close')">
      <div class="modal-align">
        <div class="modal-container" @click.stop="">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>
          <slot>
            <!-- fallback content -->
            <p>hello from modal!</p>
          </slot>
          <div class="modal-actions">
            <Button @click="this.$emit('close')">Close</Button>
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "Modal",
  props: {
    show: Boolean,
  },
  components: {
    Button,
  }
}
</script>

<style lang="scss">
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
}
.modal-align {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  margin: 0 auto;
  max-width: 800px;
  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, .33);
}
.modal-header {
  margin-bottom: 10px;
  h2, p {
    margin: 5px 0px;
  }
}
.modal-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;

  .ps-button {
    display: inline-block;
  }
}
// animations, see: https://vuejs.org/guide/built-ins/transition.html#the-transition-component
.modal-enter-active, .modal-leave-active {
  transition: all .2s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>