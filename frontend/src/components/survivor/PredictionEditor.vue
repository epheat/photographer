<template>
  <div class="prediction-editor">
    <div class="prediction-properties">
      <FormField v-model="episode" label="Episode"/>
      <FormSelect v-model="predictionType" :options="['ImmunityChallenge', 'TribalCouncil']" label="PredictionType"/>
      <FormField v-model="reward" label="Reward"/>
      <FormField v-model="select" label="Select"/>
    </div>
    <div class="prediction-time">
      <div>Episode air date: <input type="date" v-model="airDate"/></div>
      <div>Episode air time (PST): <input type="time" v-model="airTime"/></div>
    </div>
    <SurvivorSelector :cast="cast" @selectSurvivors="submitPrediction" initSelectAll />
  </div>
</template>

<script>
import FormField from "@/components/FormField";
import FormSelect from "@/components/FormSelect";
import SurvivorSelector from "@/components/survivor/SurvivorSelector";
export default {
  name: "PredictionEditor",
  props: {
    cast: Array,
  },
  data() {
    return {
      episode: "",
      predictionType: "",
      reward: 0,
      select: 1,
      airDate: "",
      airTime: "",
    }
  },
  methods: {
    submitPrediction(survivorSelect) {
      const predictBefore = new Date(`${this.airDate}T${this.airTime}:00-08:00`).getTime();
      this.$emit('submitPrediction', {
        episode: this.episode,
        predictionType: this.predictionType,
        reward: parseInt(this.reward, 10),
        select: parseInt(this.select, 10),
        predictBefore: predictBefore,
        options: survivorSelect.options,
      });
    }
  },
  components: {SurvivorSelector, FormSelect, FormField}
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors.scss";
@import "../../scss/sizes.scss";

.prediction-editor {
  padding: 10px;
  background-color: $ps-lighter-grey;

}

.prediction-properties {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;

  @media screen and (max-width: $tablet) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: $phone) {
    grid-template-columns: 1fr;
  }
}

.prediction-time {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  margin-bottom: 5px;

  @media screen and (max-width: $phone) {
    grid-template-columns: 1fr;
  }
}
</style>