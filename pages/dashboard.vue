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
  layout: "dashboard-layout",
  mounted() {},
  methods: {}
};
</script>
