<template>
  <div class="page battletd-page">
    <h1>BattleTD</h1>
    <div :id="containerId" class="game-container">
      <UserInterface :gameState="gameState" />
    </div>
  </div>
</template>

<script>
import * as game from '@/phaser/battletd/BattleTD';
import UserInterface from "@/components/battletd/UserInterface.vue";
import {BattleTDGameState} from "@/phaser/battletd/model/GameState";
import {TowerId} from "@/phaser/battletd/model/Towers";

export default {
  name: "BattleTDPage",
  components: { UserInterface },
  props: {

  },
  data() {
    return {
      containerId: 'game-container',
      gameState: new BattleTDGameState(), // TODO: get from save
    }
  },
  mounted() {
    this.gameState.playerState.bench = [
        TowerId.BlastMortar,
        TowerId.RustyCannon,
        TowerId.PelletGun,
    ]
    this.gameInstance = game.launch(this.containerId, this.gameState);
  },
  methods: {

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