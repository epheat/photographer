<template>
  <div class="item-editor">
    <FormSelect
        v-model="userSub"
        :options="users.map(user => { return { value: user.userSub, label: user.username }})"
        label="User"
    />
    <FormSelect v-model="itemType" :options="[
        { value: 'ExtraVoteAdvantage', label: 'Extra vote advantage' },
        { value: 'PointMultiplierAdvantage', label: 'Point multiplier advantage' },
    ]" label="ItemType"/>
    <FormField v-if="itemType === 'ExtraVoteAdvantage'" v-model="extraVotes" label="ExtraVotes"/>
    <FormField v-if="itemType === 'PointMultiplierAdvantage'" v-model="multiplier" label="Multiplier"/>
    <FormField v-model="message" label="Message"/>
    <div class="buttons">
      <Button submit @press="submitItem">Submit</Button>
    </div>
  </div>
</template>

<script>
import FormField from "@/components/FormField";
import FormSelect from "@/components/FormSelect";
import Button from "@/components/Button";

export default {
  name: "ItemEditor",
  props: {
    users: Array, // [{ username: xxx, userSub: yyy }]
  },
  data() {
    return {
      userSub: "",
      itemType: "",
      extraVotes: 1,
      multiplier: 1.5,
      message: null,
    }
  },
  methods: {
    submitItem() {
      let item = {
        itemType: this.itemType,
        message: this.message,
      };
      if (this.itemType === 'ExtraVoteAdvantage') {
        item.extraVotes = parseInt(this.extraVotes);
      } else if (this.itemType === 'PointMultiplierAdvantage') {
        item.multiplier = parseFloat(this.multiplier);
      }
      this.$emit('submitItem', {
        userSub: this.userSub,
        item: item,
      });
    }
  },
  components: {
    Button,
    FormField,
    FormSelect,
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors.scss";

.item-editor {
  padding: 10px;
  background-color: $ps-lighter-grey;
}

.users {
  margin-bottom: 10px;
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