<template>
  <div class="survivor-selector">
    <div class="options-container">
      <div class="survivor-option" v-for="survivor in cast" :key="survivor.id">
        <input
            :id="survivor.id"
            type="checkbox"
            :checked="hasId(survivor.id)"
            :disabled="shouldDisable(survivor.id)"
            @click="handleOption(survivor)"
            :class="{disable: shouldDisable(survivor.id)}"
        />
        <label :for="survivor.id" :class="{disable: shouldDisable(survivor.id)}">
          <CastHead :out="survivor.votedOut" :id="survivor.id" /> {{ shortenName(survivor.name) }}
        </label>
      </div>
    </div>
    <div class="buttons">
      <Button submit @press="confirm">Confirm</Button>
    </div>
  </div>
</template>

<script>
import CastHead from "@/components/survivor/CastHead";
import Button from "@/components/Button";
export default {
  name: "SurvivorSelector",
  components: {Button, CastHead},
  props: {
    cast: Array,
    maxSelect: Number,
    initSelectAll: Boolean,
    initSelections: Array
  },
  data() {
    return {
      options: this.getStartingSelections(),
    }
  },
  methods: {
    getStartingSelections() {
      if (this.initSelectAll) {
        return this.cast.map(s => { return { id: s.id }});
      } else if (this.initSelections) {
        return this.initSelections.filter(selection => this.cast.find(s => s.id === selection.id) !== undefined);
      } else {
        return [];
      }
    },
    handleOption(survivor) {
      const indexOfSurvivor = this.options.findIndex(s => s.id === survivor.id);
      if (indexOfSurvivor === -1) {
        // that survivor id is not present in options currently. If we're not at our limit, add it.
        if (!this.atLimit) {
          this.options.push({ id: survivor.id });
        }
      } else {
        // survivor id is already present in options. Therefore, remove it.
        this.options.splice(indexOfSurvivor, 1);
      }
    },
    hasId(id) {
      return this.options.filter(s => s.id === id).length > 0;
    },
    shouldDisable(id) {
      return this.atLimit && !this.hasId(id);
    },
    confirm() {
      this.$emit('selectSurvivors', { options: this.options.map(s => { return { id: s.id }}) });
    },
    shortenName(name) {
      const spaceIndex = name.indexOf(" ");
      return `${name.substring(0, spaceIndex + 2)}.`;
    }
  },
  computed: {
    atLimit() {
      return this.maxSelect && this.options.length >= this.maxSelect;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/sizes.scss";

.options-container {
  display: flex;
  flex-wrap: wrap;

  .survivor-option {
    flex-basis: 25%;
    @media screen and (max-width: $tablet) {
      flex-basis: 33%;
    }
    @media screen and (max-width: $phone) {
      flex-basis: 50%;
    }
    input.disable {
      cursor: not-allowed;
    }
  }
  label {
    display: inline-block;
    vertical-align: middle;
    &.disable {
      cursor: not-allowed;
    }
  }
  img {
    width: 30px;
  }
}
.buttons {
  margin: 0 auto;
}
</style>