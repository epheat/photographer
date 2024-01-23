<template>
  <div class="battletd-tower-card"
       :class="[`rarity-${rarity}`, { selected: selected }]"
       @click="$emit('clickTowerCard', towerId)"
  >
    <div class="tower-image">
      {{ towerId }}
    </div>
    <div class="cost">
      <div class="coin" v-for="i in cost" :key="i"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    towerId: String,
    rarity: String,
    cost: Number,
    selected: Boolean,
  },
  data() {
    return {

    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.battletd-tower-card {
  border-top-right-radius: 18px;
  background-color: #cae5ff;
  width: 80px;
  height: 90px;
  outline: 0 solid #83ff76;

  transition: all 0.2s;

  &:hover {
    bottom: 5px;
    transform: scale(1.05);
    box-shadow: 0 1px 2px 2px rgba(60, 60, 60, 0.6);
  }

  .tower-image {
    width: 74px;
    height: 70px;
    margin: 3px;
    text-align: center;
    border-top-right-radius: 14px;
    background-color: #96deff;
    box-shadow: inset 0 0 2px rgba(40, 40, 40, 0.8);
  }

  .cost {
    display: flex;
    padding: 2px;
    justify-content: right;
    gap: 4px;
  }

  &.rarity-common {
    background-color: #cae5ff;
    .tower-image {
      background-color: #96deff;
    }
  }

  &.rarity-uncommon {
    background-color: #caffe1;
    .tower-image {
      background-color: #96ffc7;
    }
  }

  &.rarity-rare {
    background-color: #ffcaca;
    .tower-image {
      background-color: #ff9696;
    }
  }

  &.rarity-epic {
    background-color: #eacaff;
    .tower-image {
      background-color: #c096ff;
    }
  }

  &.rarity-legendary {
    background-color: #ffddca;
    .tower-image {
      background-color: #ffc296;
    }
  }

  &.selected {
    outline: 4px solid #83ff76;
    animation: selected 1s linear infinite alternate;
  }
}

@keyframes selected {
  from {
    outline-color: #83ff76;
  }
  to {
    outline-color: #e3ff50;
  }
}
</style>