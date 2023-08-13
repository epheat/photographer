<template>
  <div class="page battletd-page">
    <h1>BattleTD</h1>
    <div :id="containerId"/>
  </div>
</template>

<script>
import * as game from '@/phaser/battletd/BattleTD';

export default {
  name: "BattleTDPage",
  props: {

  },
  data() {
    return {
      gameInstance: null,
      containerId: 'game-container',
    }
  },
  mounted() {
    this.gameInstance = game.launch(this.containerId)
  },
  computed: {

  }
}
</script>

<style scoped>

</style>