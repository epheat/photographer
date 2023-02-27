<template>
  <div class="prediction-editor">
    <div class="prediction-properties">
      <FormField v-model="episode" label="Episode"/>
      <FormSelect v-model="predictionType" :options="[
          { value: 'ImmunityChallenge', label: 'Immunity Challenge' },
          { value: 'TribalCouncil', label: 'Tribal Council' },
          { value: 'Finalist', label: 'Finalist' },
      ]" label="PredictionType"/>
      <FormField v-model="reward" label="Reward"/>
      <FormField v-model="select" label="Select"/>
    </div>
    <div class="prediction-time">
      <div>Episode air date: <input type="date" v-model="airDate"/></div>
      <div>Episode air time (PST): <input type="time" v-model="airTime"/></div>
    </div>
    <SurvivorSelector
        :cast="cast"
        @selectSurvivors="submitPrediction"
        v-model="survivorSelections"
    />
    <div class="buttons">
      <Button submit @press="submitPrediction">Submit</Button>
    </div>
  </div>
</template>

<script>
import FormField from "@/components/FormField";
import FormSelect from "@/components/FormSelect";
import SurvivorSelector from "@/components/survivor/SurvivorSelector";
import Button from "@/components/Button";
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
      survivorSelections: this.cast.filter(s => !s.votedOut).map(s => s.id),
    }
  },
  methods: {
    submitPrediction() {
      const predictBefore = new Date(`${this.airDate}T${this.airTime}:00-07:00`).getTime();
      this.$emit('submitPrediction', {
        episode: this.episode,
        predictionType: this.predictionType,
        reward: parseInt(this.reward, 10),
        select: parseInt(this.select, 10),
        predictBefore: predictBefore,
        options: this.survivorSelections,
      });
    }
  },
  components: {Button, SurvivorSelector, FormSelect, FormField}
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors.scss";
@import "../../scss/sizes.scss";

.prediction-editor {
  padding: 10px;
  background-color: $ps-prediction-in-progress;
  border-radius: 4px;
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
.buttons {
  margin-top: 5px;
  display: flex;
  justify-content: space-around;
  .ps-button {
    display: inline-block;
  }
}
</style>