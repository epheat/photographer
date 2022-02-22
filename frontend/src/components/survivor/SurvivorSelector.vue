<template>
  <div class="survivor-selector">
    <div class="options-container">
      <div class="survivor-option" v-for="survivor in cast" :key="survivor.id">
        <input
            :id="survivor.id"
            type="checkbox"
            :checked="hasId(survivor.id)"
            :disabled="shouldDisable(survivor.id)"
            @click="handleOption(survivor.id)"
            :class="{disable: shouldDisable(survivor.id)}"
        />
        <label :for="survivor.id" :class="{disable: shouldDisable(survivor.id)}">
          <CastHead :out="survivor.votedOut" :id="survivor.id" /> {{ shortenName(survivor.name) }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import CastHead from "@/components/survivor/CastHead";

export default {
  name: "SurvivorSelector",
  components: {CastHead},
  props: {
    cast: Array,
    maxSelect: Number,
    // ["SurvivorId", "SurvivorId"]
    modelValue: Array,
  },
  data() {
    return {
      // none
    }
  },
  methods: {
    handleOption(id) {
      const indexOfSurvivor = this.modelValue.indexOf(id);
      if (indexOfSurvivor === -1) {
        // that survivor id is not present in modelValue currently. If we're not at our limit, add it.
        if (!this.atLimit) {
          this.$emit('update:modelValue', [...this.modelValue, id ]);
        }
      } else {
        // survivor id is already present in options. Therefore, remove it.
        this.$emit('update:modelValue', [...this.modelValue].filter(s => s !== id));
      }
    },
    hasId(id) {
      return this.modelValue.includes(id);
    },
    shouldDisable(id) {
      return this.atLimit && !this.hasId(id);
    },
    shortenName(name) {
      const spaceIndex = name.indexOf(" ");
      return `${name.substring(0, spaceIndex + 2)}.`;
    }
  },
  computed: {
    atLimit() {
      return this.maxSelect && this.modelValue.length >= this.maxSelect;
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
</style>