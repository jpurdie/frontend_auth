<template>
  <v-container>
    <v-row>Signing you in...</v-row>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  mounted() {
    const code = this.$route.query.code;
    const state = this.$route.query.state;
    console.log("inside signed in ", code, state);
    // this.$store.dispatch("updateOverlay", true);
    this.redirectToDashboard();
  },
  methods: {
    redirectToDashboard() {
      this.$store.dispatch("updateOverlay", true);
      window.location.href = "/dashboard";
    }
  }
};
</script>
