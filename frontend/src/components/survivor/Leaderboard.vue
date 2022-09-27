<template>
  <div class="leaderboard">
    <table>
      <tr>
        <th>place</th>
        <th>username</th>
        <th>points</th>
      </tr>
      <tr v-for="row in data" :key="row.resourceId" :class="{me: row.entityId === userSub}">
        <td><div class="place"><div>{{ row.placement }}</div><i class="medal" v-if="row.placement <= 3" :class="medalClass(row)"></i><i class="arrow" :class="changeClass(row)"></i></div></td>
        <td>{{ row.username }}</td>
        <td>{{ row.points }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Leaderboard",
  props: {
    data: Array,
    userSub: String,
  },
  methods: {
    changeClass(row) {
      if (row.placementHistory.length === 0 || row.pointHistory.length === 0) {
        return { line: true };
      }
      const mostRecentEvent = row.placementHistory.find(placementEvent =>
          placementEvent.timestamp === row.lastUpdatedDate)?.event;
      const mostRecentEpisode = mostRecentEvent.split("-")[3];
      const placements = row.placementHistory.filter(placementEvent => !placementEvent.event.includes(mostRecentEpisode))
          .sort((a, b) => b.timestamp - a.timestamp);
      if (placements.length > 0) {
        if (placements[0].placement > row.placement) {
          return { arrow: true, up: true }
        } else if (placements[0].placement < row.placement) {
          return { arrow: true, down: true }
        } else {
          return { line: true };
        }
      } else {
        return { line: true };
      }
    },
    medalClass(row) {
      if (row.placement === 1) {
        return { gold: true };
      } else if (row.placement === 2) {
        return { silver: true };
      } else {
        return { bronze: true };
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
  tr.me {
    background-color: $ps-highlight;
  }

  .place {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  // https://www.w3schools.com/howto/howto_css_arrows.asp
  .arrow {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    align-self: end;

    &.up {
      border: solid $ps-button-green;
      border-width: 0 3px 3px 0;
      transform: rotate(-135deg);
    }
    &.down {
      border: solid $ps-button-red-shadow;
      border-width: 0 3px 3px 0;
      transform: translateY(-6px) rotate(45deg);
    }
  }
  .line {
    border: solid #5e5e5e;
    border-width: 3px 0 0 0;
    display: inline-block;
    padding: 4px;
    transform: translateY(3px);
  }

  .medal {
    width: 12px;
    height: 12px;
    border-radius: 12px;
    box-shadow: 0px 1px 1px #444;

    &.gold {
      background-color: goldenrod;
    }
    &.silver {
      background-color: silver;
    }
    &.bronze {
      background-color: sienna;
    }
  }
}
</style>