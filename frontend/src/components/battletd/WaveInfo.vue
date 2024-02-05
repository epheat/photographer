<template>
  <div class="battletd-wave-info">
    <span class="wave-number">{{ waveState.waveNumber }}</span>
    <div class="bar">
      <div class="background"></div>
      <div class="timeline"></div>
      <div class="wave-indicator next" :style="indicatorStyle"></div>
      <div class="waveinfo current"></div>
      <div class="waveinfo next"></div>
      <div class="waveinfo future"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { WaveState } from '@/phaser/battletd/model/GameState';
import { defineComponent, PropType, StyleValue } from 'vue';

export default defineComponent({
  props: {
    waveState: {
      type: Object as PropType<WaveState>,
      required: true,
    }
  },
  data() {
    return {
      foo: "initial value"
    }
  },
  computed: {
    indicatorStyle(): StyleValue {
      return {
        left: `${this.waveState.phaseTimeRemainingMillis / this.waveState.phaseTime * 100}%`,
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.battletd-wave-info {
  
  display: flex;

  .wave-number {
    height: 20px;
    width: 20px;
    text-align: center;
    background-color: rgba(240, 240, 240, 0.8);
    padding: 1px;
    box-sizing: border-box;
    border-radius: 2px;
  }
  .bar {
    height: 20px;
    width: 80%;
    margin: 0 auto;
    position: relative;
    border: solid black;
    border-width: 0 2px;

    .background {
      position: absolute;
      height: 12px;
      width: 100%;
      margin: 4px 0;
      background-color: rgba(240, 240, 240, 0.8);
    }

    .timeline {
      position: absolute;
      height: 10px;
      width: 100%;

      border-bottom: 2px solid black;

    }

    .wave-indicator {
      height: 100%;
      width: 0;
      position: absolute;
      border-right: 2px solid black;

      &.current {
        left: 0%;
      }
      &.next {
        left: 50%;
      }
      &.future {
        left: 100%;
      }
    }
  }
}
</style>