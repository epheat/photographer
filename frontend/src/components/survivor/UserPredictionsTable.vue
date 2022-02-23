<template>
  <div class="user-predictions-table">
    <table>
      <tr>
        <th>username</th>
        <th>prediction</th>
        <th>selections</th>
      </tr>
      <tr v-for="userPrediction in userPredictions" :key="`${userPrediction.entityId}-${userPrediction.resourceId}`">
        <td>{{ userPrediction.username }}</td>
        <td>{{ userPrediction.predictionId }}</td>
        <td>{{ userPrediction.selections }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "PredictionTable",
  props: {
    userPredictions: Array,
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors.scss";

.user-predictions-table {
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #888888;
    text-align: left;
    padding: 8px;

    &.center {
      text-align: center;
    }
  }

  tr:nth-child(even) {
    background-color: $ps-lightest-grey;
  }
}
</style>