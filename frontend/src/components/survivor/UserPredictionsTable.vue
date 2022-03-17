<template>
  <div class="user-predictions-table">
    <table>
      <tr>
        <th>username</th>
        <th>prediction</th>
        <th>selections</th>
      </tr>
      <tr v-for="userPrediction in userPredictions" :key="`${userPrediction.entityId}-${userPrediction.resourceId}`">
        <td class="username">{{ userPrediction.username }}</td>
        <td>{{ userPrediction.predictionId }}</td>
        <td>
          <CastHead v-for="survivor in userPrediction.selections" :key="survivor" :id="survivor"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CastHead from "@/components/survivor/CastHead";
export default {
  name: "PredictionTable",
  components: {CastHead},
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

  .cast-head {
    width: 32px;
    margin-right: 5px;
  }

  .username {
    word-break: break-all;
  }
}
</style>