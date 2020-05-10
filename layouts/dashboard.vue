<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/users">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn text to="/">Vitae</v-btn>
      {{ selectedOrg.name }}
      <div class="flex-grow-1"></div>
      <template v-if="$auth.$state.loggedIn">
        <v-menu :close-on-click="true" top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" dark>{{ $auth.user.nickname }}</v-btn>
          </template>
          <v-list>
            <v-list-item @click="$auth.logout()">
              <v-icon>mdi-logout</v-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    source: String
  },
  computed: {
    ...mapState({
      selectedOrg: state => state.userauth.selectedOrg
    })
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = false;
  },
  mounted() {
    this.doFetchOrgs();
  },
  methods: {
    doFetchOrgs() {
      this.$store.dispatch("userauth/fetchOrgOptions");
    }
  }
};
</script>
