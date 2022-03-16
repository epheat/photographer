<template>
  <img :src="getImgUrl()" :alt="id" :title="id" class="inventory-item" />
</template>

<script>
import ExtraVoteAdvantage from "@/assets/advantage.png";

export default {
  name: "InventoryItem",
  props: {
    id: String,
    itemType: String,
  },
  data() {
    return {
      images: {
        ExtraVoteAdvantage: ExtraVoteAdvantage,
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

<style scoped>
img {
  object-fit: cover;
}
</style>