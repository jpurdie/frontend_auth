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
    getStatusCounts() {
      let notStartedCount = 0;
      let inProgressCount = 0;
      let doneCount = 0;
      let duplicateCount = 0;
      let onHoldCount = 0;
      let stopCount = 0;
      let deferredCount = 0;

      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].status.name === null || this.projects[i].status.name === undefined) {
          break;
        }
        switch (this.projects[i].status.name.toLowerCase()) {
          case "not started":
            notStartedCount++;
            break;
          case "in progress":
            inProgressCount++;
            break;
          case "done":
            doneCount++;
            break;
          case "duplicate":
            duplicateCount++;
            break;
          case "on hold":
            onHoldCount++;
            break;
          case "stopped":
            stopCount++;
            break;
          case "deferred":
            deferredCount++;
            break;
        }
      }
      return [notStartedCount, inProgressCount, doneCount];
    },
    initValues() {
      this.barChartData = {
        labels: ["Not Started", "In Progress", "Done"],
        datasets: [
          {
            data: this.getStatusCounts(),
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
