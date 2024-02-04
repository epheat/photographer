<template>
  <div class="battletd-shop" :class="{hide: !show}">
    <div class="shop-window">
      <div class="level">
        <h2>Lvl. 2</h2>
        <div class="bar">
          <div class="progress"></div>
        </div>
        <Button>+XP</Button>
      </div>
      <div class="cards-container">
        <TowerCard
            v-for="(card, index) in cards"
            :key="index"
            :card="card"
            @clickTowerCard="buyCard(index)"
        />
      </div>
      <div class="controls">
        <Button @click="$emit('closeShop')">Close</Button>
        <div class="spacer"/>
        <Button>Lock</Button>
        <Button>Refresh</Button>
      </div>
    </div>
    <div class="toggle" @click="$emit('toggleShop')">
      <div class="chevron" :class="{left: show, right: !show}"/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import Button from "@/components/Button.vue";
import {TowerCard as TowerCardDef, rustyCannonTowerCard, blastMortarTowerCard, pelletGunTowerCard} from "@/phaser/battletd/model/Cards";
import TowerCard from "@/components/battletd/TowerCard.vue";
import {eventBus, events} from "@/phaser/battletd/events/EventBus";

export default defineComponent({
  components: {Button, TowerCard},
  props: {
    cards: Array as PropType<Array<TowerCardDef>>,
    show: Boolean,
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    buyCard(index: number) {
      console.log(index);
      eventBus.emit(events.buyCard, index);
    }
  }
})
</script>

<style lang="scss" scoped>
.battletd-shop {
  display: flex;
  align-items: center;
  position: relative;
  left: 0;
  transition: left 0.2s;

  &.hide {
    left: -550px;
  }
}
.shop-window {
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
.toggle {
  height: 80px;
  padding: 6px;
  border-radius: 0 6px 6px 0;
  background-color: #bcc7d5;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.chevron {
  position: relative;
  display: inline-block;
  border-right: 4px solid white;
  border-bottom: 4px solid white;
  width: 10px; height: 10px;
  transition: transform 0.2s;
  &.left {
    transform: rotate(135deg);
    left: 2px;
  }
  &.right {
    transform: rotate(-45deg);
    right: 4px;
  }
}

</style>