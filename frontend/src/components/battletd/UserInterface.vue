<template>
  <div class="battletd-ui">
    <div class="top-buttons">
      <Button @click="toggleShop">Shop</Button>
      <Button @click="spawnWave">New Wave</Button>
    </div>
    <div class="shop-container">
      <Shop
          v-show="showShop"
          @closeShop="showShop = false"
      />
    </div>
    <div class="bench-container">
      <Bench />
    </div>
  </div>
</template>
<script>
import { events, eventBus } from "@/phaser/battletd/events/EventBus";
import Shop from "@/components/battletd/Shop.vue";
import Button from "@/components/Button.vue";
import Bench from "@/components/battletd/Bench.vue";

export default {
  components: {Bench, Button, Shop},
  props: {

  },
  data() {
    return {
      showShop: false,
    }
  },
  computed: {

  },
  methods: {
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
}

.top-buttons {
  width: 150px;
  padding: 5px;

  .ps-button {
    margin-bottom: 5px;
  }
}

.shop-container {
  width: 100%;
  margin: 10px auto;
  .battletd-shop {
    width: 80%;
    margin: 0 auto;
  }
}

.bench-container {

}
</style>