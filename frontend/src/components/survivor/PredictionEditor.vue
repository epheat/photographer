<template>
  <div class="prediction-editor">
    <div class="prediction-options">
      <FormField v-model="episode" label="Episode"/>
      <FormSelect v-model="predictionType" :options="['TeamChallenge', 'IndividualChallenge', 'Tribal']" label="PredictionType"/>
      <FormField v-model="reward" label="Reward"/>
      <FormField v-model="select" label="Select"/>
    </div>
  </div>
</template>

<script>
import FormField from "@/components/FormField";
import FormSelect from "@/components/FormSelect";
export default {
  name: "PredictionEditor",
  props: {

  },
  data() {
    return {
      episode: "",
      predictionType: "",
      reward: 0,
      select: 1,
    }
  },
  methods: {

  },
  components: {FormSelect, FormField}
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors.scss";
@import "../../scss/sizes.scss";

.prediction-editor {
  padding: 10px;
  background-color: $ps-lighter-grey;

}

.prediction-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;

  @media screen and (max-width: $phone) {
    grid-template-columns: 1fr;
  }

}
</style>