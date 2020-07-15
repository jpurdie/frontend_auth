<template>
  <v-container>
    <v-layout row mb-3>
      <v-flex md6>
        users
        <v-btn @click="doAuthPing" color="primary" dark>Auth Ping</v-btn>
      </v-flex>
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
    selectedOrg: "user/getOrg"
  }),
  watch: {},
  mounted() {},
  methods: {
    doAuthPing() {
      this.$store.dispatch("authPing");
    }
  }
};
</script>
