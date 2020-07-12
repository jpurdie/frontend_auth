<template>
  <v-container>
    <v-row>Signing you in...</v-row>
  </v-container>
</template>

<script>
export default {
  layout: "default",
  mounted() {
    console.log("inside signed in");
    // this.$store.dispatch("updateOverlay", true);
    this.redirectToCheckOrgs();
  },
  methods: {
    redirectToCheckOrgs() {
      console.log("redirectToCheckOrgs method");
      this.$store.dispatch("updateOverlay", true);
      window.location.href = "/auth/check-orgs";
    }
  }
};
</script>
