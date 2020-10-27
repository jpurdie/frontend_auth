<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Dashboard</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card height="200">
          <rgt-chart :projects="projects" :loaded="projectsLoaded" :colors="colors" />
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card height="200">
          <status-chart :projects="projects" :loaded="projectsLoaded" :colors="colors" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "dashboard-layout",
  computed: mapGetters({
    projects: "projects/getProjects"
  }),
  data: () => ({
    projectsLoaded: false,
    colors: ["#ea8f3e", "#2c517e", "#3b8554", "#3b8554", "#f5c390", "#e2d450"]
  }), // https://coolors.co/54478c-2c699a-048ba8-0db39e-16db93-83e377-b9e769-efea5a-f1c453-f29e4c
  mounted() {
    this.initValues();
  },
  methods: {
    async initValues() {
      await this.$store.dispatch("projects/listProjects");
      this.projectsLoaded = true;
    }
  }
};
</script>
# #367392 #5aa0b7 # #b3ffff #88f6e6 # #56de99 #
