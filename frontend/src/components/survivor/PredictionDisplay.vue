<template>
  <div class="prediction-display">
    <img :src="icon" :alt="predictionType" />
    <div class="details">
      <h3><strong>{{ episode }}</strong> - {{ title }}</h3>
      <p>{{ reward }} points - <span class="time-remaining">{{ timeRemaining }}</span></p>
      <p>{{ instructions }}</p>
      <p class="user-selections" v-if="submitted">{{ selections }}</p>
    </div>
    <div class="completion">
      <div class="dot" :class="{submitted: submitted}"></div>
    </div>
  </div>
</template>

<script>
import Campfire from "@/assets/campfire.png";
import Necklace from "@/assets/necklace.png";

export default {
  name: "Prediction",
  props: {
    episode: String,
    predictionType: String,
    reward: Number,
    select: Number,
    predictBefore: Number,
    submitted: Boolean,
    userSelections: Array,
  },
  data() {
    return {
      currentTime: new Date().getTime(),
    }
  },
  mounted() {
    // ensures that currentTime is always updated with the current time.
    this.timer = setInterval(() => {
      this.currentTime = new Date().getTime();
    }, 1000);
  },
  unmounted() {
    clearInterval(this.timer);
  },
  computed: {
    icon() {
      if (this.predictionType === "ImmunityChallenge") {
        return Necklace;
      } else {
        return Campfire;
      }
    },
    title() {
      if (this.predictionType === "ImmunityChallenge") {
        return "Immunity Challenge prediction";
      } else {
        return "Tribal Council prediction";
      }
    },
    instructions() {
      if (this.predictionType === "ImmunityChallenge") {
        return `Select ${this.select} survivors. Earn points for each selected survivor that wins the immunity challenge.`;
      } else {
        return `Select ${this.select} survivors. Earn points if any of them go home this episode.`;
      }
    },
    selections() {
      if (!this.userSelections) return undefined;
      if (this.userSelections.length === 0) {
        return "No survivors selected.";
      }
      let selectionString = "You selected: ";
      for (let i=0; i<this.userSelections.length-1; i++) {
        selectionString += `${this.userSelections[i].id}, `;
      }
      selectionString += `${this.userSelections[this.userSelections.length-1].id}.`;
      return selectionString;
    },
    timeRemaining() {
      // adapted from: https://stackoverflow.com/a/16767434
      let difference = this.predictBefore - this.currentTime;
      const daysRemaining = Math.floor(difference / 1000 / 60 / 60 / 24);
      difference -= daysRemaining * 1000 * 60 * 60 * 24;
      const hoursRemaining = Math.floor(difference  / 1000 / 60 / 60);
      difference -= hoursRemaining * 1000 * 60 * 60;
      const minutesRemaining = Math.floor(difference / 1000 / 60);
      difference -= minutesRemaining * 1000 * 60;
      const secondsRemaining = Math.floor(difference / 1000);
      let remaining = "";
      if (daysRemaining > 0) {
        if (daysRemaining === 1) {
          remaining += "1 day, ";
        } else {
          remaining += `${daysRemaining} days, `;
        }
      }
      if (hoursRemaining > 0) {
        if (hoursRemaining === 1) {
          remaining += "1 hour, ";
        } else {
          remaining += `${hoursRemaining} hours, `;
        }
      }
      if (minutesRemaining > 0) {
        if (minutesRemaining === 1) {
          remaining += "1 minute, ";
        } else {
          remaining += `${minutesRemaining} minutes, `;
        }
      }
      if (secondsRemaining > 0) {
        if (secondsRemaining === 1) {
          remaining += "1 second";
        } else {
          remaining += `${secondsRemaining} seconds`;
        }
      }
      return `${remaining} left to predict.`;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors.scss";

.prediction-display {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: $ps-prediction-in-progress;

  &.correct {
    background-color: $ps-prediction-correct;
  }

  &.incorrect {
    background-color: $ps-prediction-incorrect;
  }

  img {
    max-width: 100px;
    object-fit: contain;
  }

  h3 {
    font-weight: normal;
    margin: 2px 0px;
  }
  p {
    margin: 2px 0px;
  }
  span {
    font-size: 0.8em;
  }

  .completion {
    margin-left: auto;
    margin-right: 10px;
    .dot {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: 2px solid $ps-light-grey;
      &.submitted {
        border: 2px solid $ps-button-green-shadow;
        background-color: $ps-button-green;
      }
    }
  }

  .user-selections {
    margin-top: 10px;
  }
}
</style>