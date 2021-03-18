<template>
  <v-container fluid>
    <v-row>
      <v-col cols="1">
        <h1>Projects</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1">
        <v-btn color="primary" to="/projects/create">Create</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <project-list></project-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'dashboard',
  components: {},
  data() {
    return {};
  },
  computed: mapGetters({
    selectedProfile: 'user/getSelectedProfile'
  }),
  watch: {},
  mounted() {},
  methods: {}
};
</script>
