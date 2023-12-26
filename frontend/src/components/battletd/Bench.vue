<template>
  <div class="battletd-bench">
    <TowerCard
        v-for="(card, i) in cards"
        :key="i"
        v-bind="card"
    />
  </div>
</template>
<script>
import TowerCard from "@/components/battletd/TowerCard.vue";
import {CannonTowerCard, CrossbowTowerCard} from "@/phaser/battletd/model/Cards";

export default {
  components: {TowerCard},
  props: {

  },
  data() {
    return {
      cards: [CannonTowerCard, CannonTowerCard, CrossbowTowerCard, CrossbowTowerCard],
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.battletd-bench {
  position: absolute;
  bottom: 5px;
  width: 100%;

  display: flex;
  justify-content: center;
  gap: 5px;
}

.battletd-tower-card {
  position: relative;

  bottom: 0;
  transition: all 0.2s;

  &:hover {
    bottom: 5px;
    transform: scale(1.05);
  }
}
</style>