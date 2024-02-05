<template>
  <div class="battletd-ui">
    <div class="top-ui-container">
      <div class="buttons">
        <Button @click="toggleShop">Shop</Button>
        <Button @click="spawnWave">New Wave</Button>
        <div class="player-gold">
          <div class="coin" />
          <div class="amount">{{ gameState.playerState.gold }}</div>
        </div>
      </div>
      <div class="wave-info">
        <WaveInfo :waveState="gameState.waveState"/>
      </div>
      <div class="castle-hp">
        {{ gameState.playerState?.castle?.hp }} / {{ gameState.playerState?.castle?.maxHp }}
      </div>
    </div>
    <div class="shop-container">
      <Shop
          :show="showShop"
          @closeShop="showShop = false"
          @toggleShop="toggleShop"
          :cards="gameState.shopState.offerings.map(towerId => getTowerCard(towerId)!)"
      />
    </div>
    <div class="bench-container">
      <Bench
        :cards="gameState.playerState.bench.map(towerId => getTowerCard(towerId)!)"
        :selectedCard="gameState.playerState.selectedCard"
        @toggleSelected="toggleSelected"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { events, eventBus } from "@/phaser/battletd/events/EventBus";
import Shop from "@/components/battletd/Shop.vue";
import Button from "@/components/Button.vue";
import Bench from "@/components/battletd/Bench.vue";
import WaveInfo from "@/components/battletd/WaveInfo.vue";
import {getTowerCard} from "@/phaser/battletd/model/Cards";
import { BattleTDGameState } from "@/phaser/battletd/model/GameState";

export default defineComponent({
  components: {Bench, Button, Shop, WaveInfo},
  props: {
    gameState: {
      type: Object as PropType<BattleTDGameState>,
      required: true,
    },
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
    },
    toggleSelected(index: number) {
      this.showShop = false;
      if (this.gameState.playerState.selectedCard === index) {
        eventBus.emit(events.selectCard, undefined);
      } else {
        eventBus.emit(events.selectCard, index);
      }
    },
  }
})
</script>

<style lang="scss">
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
  & > div {
    padding: 4px;
  }
}

.shop-container {
  width: 100%;
  margin: 10px auto;
  display: flex;
  align-items: center;
  overflow: hidden;

  .battletd-shop {
    width: 80%;
    margin: 0 auto;
    position: relative;
  }
}

.bench-container {

}

.player-gold {
  width: 144px;
  height: 28px;
  padding-left: 5px;
  display: flex;
  align-items: center;

  background-color: rgba(200, 200, 200, 0.8);
  border-radius: 5px;
  box-sizing: border-box;
  .amount {
    margin-left: 5px;
  }
}

.coin {
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-image: radial-gradient(#f1f199, #c9c946);
  outline: 1px outset #c9c946;
}

</style>