<template>
  <div>
    <doughnut-chart v-if="dataLoaded" :data="barChartData" :options="barChartOptions" :height="200" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({}),
  props: ["projects", "loaded", "colors"],
  watch: {
    loaded(val) {
      this.dataLoaded = val;
      this.initValues();
    }
  },
  mounted() {
    this.initValues();
  },
  methods: {
    getRGTCounts() {
      let rCount = 0;
      let gCount = 0;
      let tCount = 0;
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].rgt === null || this.projects[i].rgt === undefined) {
          break;
        }
        switch (this.projects[i].rgt.toUpperCase()) {
          case "R":
            rCount++;
            break;
          case "G":
            gCount++;
            break;
          case "T":
            tCount++;
            break;
        }
      }
      return [rCount, gCount, tCount];
    },
    initValues() {
      this.barChartData = {
        labels: ["R", "G", "T"],
        datasets: [
          {
            data: this.getRGTCounts(),
            backgroundColor: this.colors
          }
        ]
      };
    }
  },

  data() {
    return {
      dataLoaded: false,
      barChartData: undefined,
      barChartOptions: {
        responsive: true,
        legend: {
          display: true
        }
      }
    };
  }
};
</script>
