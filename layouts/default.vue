<template>
  <v-app>
    <home-app-bar />
    <v-content>
      <nuxt />
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="88"></v-progress-circular>
      </v-overlay>
    </v-content>

    <v-footer class="justify-center" color="#292929" height="100">
      <div
        class="title font-weight-light grey--text text--lighten-1 text-center"
      >&copy; {{ (new Date()).getFullYear() }} — Vitae, LLC — Made with 💜 by Justin Purdie</div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    HomeAppBar: () => import("@/components/home/AppBar")
  },
  transition: "bounces",

  data: () => ({}),
  computed: mapGetters({
    errors: "userauth/getErrors",
    overlay: "getOverlay"
  }),
  watch: {
    overlay(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
    }
  },
  methods: {
    dologin() {
      this.$auth.loginWith("auth0");
    }
  }
};
</script>
