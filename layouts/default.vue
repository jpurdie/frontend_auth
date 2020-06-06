<template>
  <v-app>
    <v-content>
      <v-navigation-drawer v-model="sidebar" app>
        <v-list>
          <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app>
        <span class="hidden-sm-and-up">
          <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
        </span>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">{{ appTitle }}</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn flat @click="dologin()">Login</v-btn>

          <v-btn flat to="/register">Register</v-btn>
        </v-toolbar-items>
      </v-toolbar>
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
    //  NavBar
  },
  data: () => ({
    appTitle: "Vitae",
    sidebar: false,
    menuItems: [
      { title: "Register", path: "/register" },
      { title: "Sign In", path: "/register" }
    ]
  }),
  computed: mapGetters({
    errors: "userauth/getErrors",
    registerStatus: "userauth/getSignUpStatus",
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
