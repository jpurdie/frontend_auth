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
    this.doAuthPing();
  },
  methods: {
    doAuthPing() {
      this.$store.dispatch("authPing");
    }
  }
};
</script>
