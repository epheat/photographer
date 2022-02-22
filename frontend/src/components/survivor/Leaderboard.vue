<template>
  <table class="leaderboard">
    <tr>
      <th>place</th>
      <th>username</th>
      <th>points</th>
      <th>change</th>
    </tr>
    <tr v-for="(row, index) in data" :key="row.resourceId">
      <td>{{ index + 1 }}</td>
      <td>{{ row.username }}</td>
      <td>{{ row.points }}</td>
      <td class="center">-</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Leaderboard",
  props: {
    data: Array,
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.leaderboard {

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
    background-color: #dddddd;
  }
}
</style>