<template>
  <v-app>
    <home-app-bar />
    <v-main>
      <nuxt />
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="88"></v-progress-circular>
      </v-overlay>
    </v-main>

    <v-snackbar
      :top="true"
      v-model="successSnackBar"
      elevation="24"
      color="success"
      multi-line="multi-line"
    >
      {{ snackSuccessMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" @click="successSnackBar = false" text
          >Close</v-btn
        >
      </template>
    </v-snackbar>

    <v-footer class="justify-center" color="#292929" height="100">
      {{ $config.foo }}
      <div
        class="title font-weight-light grey--text text--lighten-1 text-center"
      >
        &copy; {{ new Date().getFullYear() }} — Vitae, LLC — Made with 💜 by
        Justin Purdie
      </div>
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
  data: () => ({
    snackSuccessMsg: "",
    successSnackBar: false
  }),
  computed: mapGetters({
    errors: "user/getErrors",
    overlay: "getOverlay"
  }),
  watch: {
    overlay(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
    }
  },
  mounted() {
    console.log("created default layout");
    this.parseSignUpNotifcations();
  },
  methods: {
    dologin() {
      this.$auth.loginWith("auth0");
    },
    parseSignUpNotifcations() {
      if (
        this.$route.query != null &&
        this.$route.query.supportSignUp === "true" &&
        this.$route.query.code === "success"
      ) {
        this.successSnackBar = true;
        this.snackSuccessMsg = this.$route.query.message.trim();
      }
    }
  }
};
</script>
