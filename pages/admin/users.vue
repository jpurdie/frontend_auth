<template>
  <v-container>
    <v-layout row mb-3>
      <v-flex md6> </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "dashboard-layout",
  components: {},
  data() {
    return {
      selectedInvite: undefined,
      showInviteDialog: false
    };
  },
  computed: mapGetters({
    selectedOrg: "user/getSelectedOrg"
  }),
  watch: {},
  mounted() {},
  methods: {}
};
</script>
