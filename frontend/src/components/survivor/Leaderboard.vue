<template>
  <div class="leaderboard">
    <table>
      <tr>
        <th>place</th>
        <th>username</th>
        <th>points</th>
        <th>change</th>
      </tr>
      <tr v-for="row in data" :key="row.resourceId">
        <td>{{ row.placement }}</td>
        <td>{{ row.username }}</td>
        <td>{{ row.points }}</td>
        <td class="center">{{ getChange(row) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Leaderboard",
  props: {
    data: Array,
  },
  methods: {
    getChange(row) {
      const mostRecentEvent = row.placementHistory.find(placementEvent =>
          placementEvent.timestamp === row.lastUpdatedDate).event;
      const mostRecentEpisode = mostRecentEvent.split("-")[1];
      const placements = row.placementHistory.filter(placementEvent => !placementEvent.event.includes(mostRecentEpisode))
                                             .sort((a, b) => b.timestamp - a.timestamp);
      console.log(placements);
      if (placements.length > 0) {
        if (placements[0].placement > row.placement) {
          return "⬆"
        } else {
          return "⬇"
        }
      } else {
        return "-";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors.scss";

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
    background-color: $ps-lightest-grey;
  }
}
</style>