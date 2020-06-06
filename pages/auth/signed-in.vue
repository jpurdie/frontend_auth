<template>
  <v-container>
    <v-row>Signing you in...</v-row>
  </v-container>
</template>

<script>
export default {
  layout: "empty-layout",
  mounted() {
    this.$store.dispatch("updateOverlay", true);

    this.redirectToDash();
  },
  methods: {
    redirectToDash() {
      this.$store.dispatch("updateOverlay", true);
      window.location.href = "/auth/check-orgs";
    }
  }
};
</script>
