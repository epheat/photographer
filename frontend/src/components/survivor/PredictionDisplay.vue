<template>
  <div class="prediction-display" :class="{completed: results !== undefined && results.length > 0}">
    <img :src="icon" :alt="predictionType" />
    <div class="details">
      <h3><strong>{{ episode }}</strong> - {{ title }}</h3>
      <p>{{ reward }} points - <span class="time-remaining">{{ timeRemaining }}</span></p>
      <p>{{ instructions }}</p>
      <p class="user-selections" v-if="submitted">
        {{ selectionsText }}
        <CastHead v-for="survivor in userSelections" :key="survivor" :id="survivor"/>
      </p>
      <p class="result-instructions" v-if="results">{{ resultText }}</p>
    </div>
    <div class="completion">
      <div class="dot" :class="{submitted: submitted}"></div>
    </div>
  </div>
</template>

<script>
import Campfire from "@/assets/campfire.png";
import Necklace from "@/assets/necklace.png";
import Medals from "@/assets/medals.png";
import CastHead from "@/components/survivor/CastHead";

export default {
  name: "Prediction",
  components: {CastHead},
  props: {
    episode: String,
    predictionType: String,
    reward: Number,
    select: Number,
    predictBefore: Number,
    submitted: Boolean,
    userSelections: Array,
    results: Array
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
      } else if (this.predictionType === "TribalCouncil") {
        return Campfire;
      } else {
        return Medals
      }
    },
    title() {
      if (this.predictionType === "ImmunityChallenge") {
        return "Immunity Challenge prediction";
      } else if (this.predictionType === "TribalCouncil") {
        return "Tribal Council prediction";
      } else {
        return "Finalists prediction"
      }
    },
    instructions() {
      if (this.predictionType === "ImmunityChallenge") {
        return `Select ${this.select} survivors. Earn points for each selected survivor that wins the immunity challenge.`;
      } else if (this.predictionType === "TribalCouncil") {
        return `Select ${this.select} survivors. Earn points if any of them get voted out this episode.`;
      } else {
        return `Select ${this.select} survivors. Earn points for each one that makes it to final tribal.`;
      }
    },
    selectionsText() {
      if (!this.userSelections) return undefined;
      if (this.userSelections.length === 0) {
        return "No survivors selected.";
      }
      return "You selected: ";
    },
    resultText() {
      if (!this.userSelections) {
        return `Result: ${this.results.join(", ")}`;
      }
      const numberCorrect = this.results.filter(id => this.userSelections.includes(id)).length;
      return `Result: ${this.results.join(", ")}. ${numberCorrect}/${this.select}: Earned ${numberCorrect * this.reward} points.`;
    },
    timeRemaining() {
      // adapted from: https://stackoverflow.com/a/16767434
      let difference = this.predictBefore - this.currentTime;
      if (difference < 0) {
        return "Prediction closed.";
      }
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
@import "../../scss/sizes.scss";

.prediction-display {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: $ps-prediction-in-progress;

  cursor: pointer;
  &.completed {
    cursor: default;
    filter: opacity(0.75);
  }

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

    .cast-head {
      display: inline-block;
      width: 30px;
      margin-right: 4px;
    }
  }

  @media screen and (max-width: $phone) {
    flex-direction: column;

    .completion {
      margin: 0;
    }
  }

  .result-instructions {
    overflow-wrap: anywhere;
  }
}
</style>