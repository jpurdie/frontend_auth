<template>
  <v-container>
    <v-row>Signing you in</v-row>
  </v-container>
</template>

<script>
export default {
  layout: "empty-layout",
  mounted() {
    this.redirectToDash();
  },
  methods: {
    redirectToDash() {
      window.location.href = "/auth/check-orgs";
    }
  }
};
</script>
