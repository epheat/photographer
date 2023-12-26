<template>
  <div class="page battletd-page">
    <h1>BattleTD</h1>
    <div :id="containerId" class="game-container">
      <UserInterface />
    </div>
  </div>
</template>

<script>
import * as game from '@/phaser/battletd/BattleTD';
import UserInterface from "@/components/battletd/UserInterface.vue";

export default {
  name: "BattleTDPage",
  components: { UserInterface },
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

  },
}
</script>

<style scoped>
.game-container {
  position: relative;
  height: 480px; /* TODO: figure out a way to not hard code this. For some reason without it there's an extra 4px at the bottom. */
}
</style>