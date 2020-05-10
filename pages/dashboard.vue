<template>
  <div>
    <v-alert type="success">
      This page is behind authentication.
      {{ $auth.user }}
    </v-alert>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  mounted() {
    //this.doFetchOrgs();
  },
  methods: {
    //  doFetchOrgs() {
    //  this.$store.dispatch("userauth/fetchOrgOptions");
    //   }
  }
};
</script>
