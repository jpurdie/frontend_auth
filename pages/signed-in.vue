<template>
  <v-container>
    <v-row>Signing you in...</v-row>
  </v-container>
</template>

<script>
export default {
  layout: "dashboard",
  mounted() {
    const code = this.$route.query.code;
    const state = this.$route.query.state;
    console.log("inside signed in ", code, state);
    // this.$store.dispatch("updateOverlay", true);
    this.redirectToCheckOrgs();
  },
  methods: {
    redirectToCheckOrgs() {
      console.log("redirectToCheckOrgs method");
      this.$store.dispatch("updateOverlay", true);
      window.location.href = "/check-orgs";
    }
  }
};
</script>
