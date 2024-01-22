<template>
  <div class="battletd-shop">
    <div class="level">
      <h2>Lvl. 2</h2>
      <div class="bar">
        <div class="progress"></div>
      </div>
      <Button>+XP</Button>
    </div>
    <div class="cards-container">
      <TowerCard
          v-for="(card, i) in cards"
          :key="i"
          v-bind="card"
      />
    </div>
    <div class="controls">
      <Button @click="$emit('closeShop')">Close</Button>
      <div class="spacer"/>
      <Button>Lock</Button>
      <Button>Refresh</Button>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";
import {rustyCannonTowerCard, blastMortarTowerCard, pelletGunTowerCard} from "@/phaser/battletd/model/Cards";
import TowerCard from "@/components/battletd/TowerCard.vue";

export default {
  components: {Button, TowerCard},
  props: {
    cards: Array,
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.battletd-shop {
  display: grid;
  grid-template-areas: "levels controls"
                       "tcards controls";
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 5fr 1fr;

  border-radius: 6px;
  background-color: #bcc7d5;

  box-shadow: 0 4px 6px 2px rgba(40, 40, 40, 0.6);
  
  .level {
    grid-area: levels;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    gap: 5px;

    h2 {
      padding: 10px;
      margin: 0;
    }
    .bar {
      width: 50%;
      height: 20px;
      background-color: #cccccc;

      .progress {
        background-color: #7d9cdc;
        width: 40%;
        height: 100%;
      }
    }
  }

  .cards-container {
    grid-area: tcards;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 5px;

    background-color: #abacbf;
    border-radius: 6px;
    box-shadow: inset 0 0 2px rgba(40, 40, 40, 0.8);
    margin: 5px;
  }

  .controls {
    grid-area: controls;
    padding: 10px 10px 15px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;

    .spacer {
      height: 20px;
    }

    .ps-button {

    }
  }
}
</style>