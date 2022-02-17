<template>
  <div class="page survivor-page">
    <h1>FantasySurvivor-S42</h1>
    <div class="tabs">
      <div class="tab" :class="{active: currentTab === 0}" @click="setTab(0)">Predictions</div>
      <div class="tab" :class="{active: currentTab === 1}" @click="setTab(1)">Leaderboard</div>
      <div class="tab" :class="{active: currentTab === 2}" @click="setTab(2)">Cast</div>
      <div class="tab" :class="{active: currentTab === 3}" @click="setTab(3)">Admin</div>
    </div>
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
    <div class="success-message" v-if="successMessage">{{ successMessage }}</div>
    <div class="loading-message" v-if="loading">loading...</div>
    <div class="tab-content home" v-if="currentTab === 0">
      <h2>Inventory</h2>
      <p>Items that you acquire over the course of the game will show up here. Click on an item to use it.</p>
      <div class="inventory">Your inventory is empty.</div>
      <h2>Predictions</h2>
      <div>Past and future predictions will show up here. You can only edit your predictions up until the day that the episode airs. </div>
    </div>
    <div class="tab-content leaderboard" v-if="currentTab === 1">
      <h2>Rankings</h2>
      <div class="ps-leaderboard">

      </div>
    </div>
    <div class="tab-content cast" v-if="currentTab === 2">
      <div class="cast-container">
        <CastMember v-for="survivor in cast" v-bind="survivor" :key="survivor.name"/>
      </div>
    </div>
    <div class="tab-content admin" v-if="currentTab === 3">
      <h2>Cast editor</h2>
      <p>Use these controls to edit the cast over the course of the season, as survivors get voted out each episode. Could also be used to track who has an idol.</p>
      <textarea :value="castEditorValue" @input="updateCastEditorValue"></textarea>
      <div class="controls">
        <div class="reload" @click="getCast">Reload from db</div>
        <div class="submit" @click="setCast">Set cast data</div>
      </div>
      <h2>Prediction editor</h2>
      <p>List all the current predictions here. For predictions, allow completion of the prediction while providing the winner of the challenge. Allow deletion of predictions.</p>
      <h3>New Prediction:</h3>
      <PredictionEditor />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import {API, Auth} from "aws-amplify";
import {authStore} from "@/auth/store";
import CastMember from "@/components/survivor/CastMember";
import PredictionEditor from "@/components/survivor/PredictionEditor";

export default {
  name: "SurvivorGamePage",
  props: {

  },
  data() {
    return {
      currentTab: 0,
      errorMessage: "",
      successMessage: "",
      loading: false,
      cast: [],

      // admin only
      castEditorValue: "",
    }
  },
  mounted() {
    if (!authStore.state.loggedIn) {
      this.errorMessage = "Error: not logged in.";
      return;
    }
    this.getCast();
  },
  methods: {
    setTab(tab) {
      this.currentTab = tab;
    },
    updateCastEditorValue(e) {
      this.castEditorValue = e.target.value;
    },
    async getCast() {
      this.resetMessages();
      try {
        let token = (await Auth.currentSession()).getAccessToken().getJwtToken();
        this.loading = true;
        let response = await API.get('ps-api', '/games/survivor42/cast', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        this.cast = response.items;
        this.castEditorValue = JSON.stringify(response.items, null, 2);
        this.loading = false;
      } catch (err) {
        this.errorMessage = err.message;
        this.loading = false;
      }
    },
    async setCast() {
      this.resetMessages();
      try {
        const survivors = JSON.parse(this.castEditorValue);
        let token = (await Auth.currentSession()).getAccessToken().getJwtToken();
        this.loading = true;
        let response = await API.post('ps-api', '/games/survivor42/cast', {
          body: {
            survivors: survivors,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        this.successMessage = response.message;
        this.loading = false;
      } catch (err) {
        this.errorMessage = err.message;
        this.loading = false;
      }
    },
    resetMessages() {
      this.successMessage = undefined;
      this.errorMessage = undefined;
    }
  },
  components: {
    PredictionEditor,
    CastMember,
    Footer,
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/colors.scss";
@import "../scss/sizes.scss";

.error-message {
  color: $ps-red;
}

.tabs {
  display: flex;
  margin-bottom: 10px;

  .tab {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 8px;
    border: 2px solid $ps-light-grey;
    cursor: pointer;
    background-color: $ps-lighter-grey;

    &.active {
      border-bottom: none;
      cursor: auto;
      background-color: $ps-white;
    }
  }
}

.cast-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: $tablet) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: $phone) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.standings {
  display: flex;
  justify-content: space-evenly;

  .standings-box {
    padding: 8px;
    background-color: $ps-lighter-grey;
    border-radius: 4px;
    box-shadow: 0px 4px 4px #888888;

    h3 {
      margin: 0px 0px 5px 0px;
    }
  }

  .standings-box.place span {
    font-weight: bold;
    font-size: 1.25em;
  }
}
.inventory {
  background-color: $ps-lighter-grey;
  padding: 10px;
  border-radius: 5px;
  border: 2px dashed $ps-light-grey;
}

.admin {
  .controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    .reload, .submit {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  textarea {
    padding: 15px;
    border: none;
    outline: none;
    width: 100%;
    max-width: 100%;
    height: 20em;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
}

</style>