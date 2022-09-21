<template>
  <img :src="getImgUrl()" :alt="id" :title="id" class="inventory-item" :class="{highlight: highlight}" />
</template>

<script>
import ExtraVoteAdvantage from "@/assets/advantage.png";
import PointMultiplierAdvantage from "@/assets/advantage_multiplier.png";

export default {
  name: "InventoryItem",
  props: {
    id: String,
    itemType: String,
    highlight: Boolean,
  },
  data() {
    return {
      images: {
        ExtraVoteAdvantage: ExtraVoteAdvantage,
        PointMultiplierAdvantage: PointMultiplierAdvantage,
      }
    }
  },
  methods: {
    getImgUrl() {
      return this.images[this.itemType];
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;

  &.highlight {
    box-shadow: 0px 0px 2px 4px yellow;
  }
}
</style>