<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
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
