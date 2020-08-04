<template>
  <v-container>
    <v-row>
      <v-col md="6" xs="12">
        <v-btn color="primary" to="/projects/create">Create</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "dashboard-layout",
  components: {},
  data() {
    return {};
  },
  computed: mapGetters({
    selectedOrg: "user/getSelectedOrg"
  }),
  watch: {},
  mounted() {},
  methods: {}
};
</script>
