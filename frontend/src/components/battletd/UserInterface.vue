<template>
  <div class="battletd-ui">
    <div class="top-ui-container">
      <div class="buttons">
        <Button @click="toggleShop">Shop</Button>
        <Button @click="spawnWave">New Wave</Button>
      </div>
      <div class="wave-info">

      </div>
      <div class="castle-hp">
        {{ gameState.playerState?.castle?.hp }} / {{ gameState.playerState?.castle?.maxHp }}
      </div>
    </div>
    <div class="shop-container">
      <Shop
          v-show="showShop"
          @closeShop="showShop = false"
          :cards="gameState.shopState.offerings.map(towerId => getTowerCard(towerId))"
      />
    </div>
    <div class="bench-container">
      <Bench
        :cards="gameState.playerState.bench.map(towerId => getTowerCard(towerId))"
        :selectedCard="gameState.playerState.selectedCard"
      />
    </div>
  </div>
</template>
<script>
import { events, eventBus } from "@/phaser/battletd/events/EventBus";
import Shop from "@/components/battletd/Shop.vue";
import Button from "@/components/Button.vue";
import Bench from "@/components/battletd/Bench.vue";
import {getTowerCard} from "@/phaser/battletd/model/Cards";

export default {
  components: {Bench, Button, Shop},
  props: {
    gameState: Object
  },
  data() {
    return {
      showShop: false,
    }
  },
  computed: {

  },
  methods: {
    getTowerCard,
    spawnWave() {
      eventBus.emit(events.newWave)
    },
    toggleShop() {
      this.showShop = !this.showShop;
    }
  }
}
</script>

<style lang="scss" scoped>
.battletd-ui {
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 100px 1fr 100px;
}

.top-ui-container {
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  .buttons {
    .ps-button {
      width: 120px;
      margin-bottom: 5px;
    }
  }
}

.shop-container {
  width: 100%;
  margin: 10px auto;
  display: flex;
  align-items: center;

  .battletd-shop {
    width: 80%;
    margin: 0 auto;
  }
}

.bench-container {

}
</style>