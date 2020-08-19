<template>
  <v-app>
    <v-overlay :value="overlay" z-index="999">
      <v-progress-circular indeterminate size="88"></v-progress-circular>
    </v-overlay>
    <v-app-bar app clipped-left>
      <router-link to="/dashboard">
        <BaseImg :src="require('@/assets/vitae_logo.png')" contain max-width="128" width="100%" />
      </router-link>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created: () => console.log("created empty layout"),
  computed: mapGetters({
    overlay: "getOverlay"
  }),
  components: {
    BaseImg: () => import("./../components/base/BaseImg")
  },
  watch: {
    overlay(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
    }
  }
};
</script>
