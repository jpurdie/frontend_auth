<template>
  <v-app id="inspire">
    <nuxt />
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="88"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters({
    overlay: "getOverlay"
  }),
  watch: {
    overlay(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
    }
  }
};
</script>
