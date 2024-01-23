<template>
  <div class="battletd-bench">
    <TowerCard
        v-for="(card, i) in cards"
        :key="i"
        v-bind="card"
        :selected="selectedCard === i"
        @clickTowerCard="toggleSelected(i)"
    />
  </div>
</template>
<script>
import TowerCard from "@/components/battletd/TowerCard.vue";
import {eventBus, events} from "@/phaser/battletd/events/EventBus";

export default {
  components: {TowerCard},
  props: {
    cards: Array,
    selectedCard: Number,
  },
  data() {
    return {

    }
  },
  methods: {
    toggleSelected(index) {
      if (this.selectedCard === index) {
        eventBus.emit(events.selectCard, undefined);
      } else {
        eventBus.emit(events.selectCard, index);
      }
    },
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
}
</style>