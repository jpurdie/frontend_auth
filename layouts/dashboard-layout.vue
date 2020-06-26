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
      <router-link to="/">
        <BaseImg :src="require('@/assets/vitae_logo.png')" contain max-width="128" width="100%" />
      </router-link>
      <span class="ml-4">{{ selectedOrg.name }}</span>
      <div class="flex-grow-1"></div>
      <template v-if="$auth.$state.loggedIn">
        <v-menu :close-on-click="true" top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="accent" dark>{{ $auth.user.nickname }}</v-btn>
          </template>
          <v-list>
            <v-list-item @click="doLogout">
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
  middleware: "authz",
  computed: {
    ...mapState({
      selectedOrg: state => state.userauth.selectedOrg
    })
  },
  components: {
    BaseImg: () => import("./../components/base/BaseImg")
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = false;
    // this.doFetchOrgs();
  },
  mounted() {
    this.doFetchOrgs();
  },
  methods: {
    doFetchOrgs() {
      this.$store.dispatch("userauth/fetchOrgOptions");
    },
    doLogout() {
      this.$auth.logout();
      window.location.href =
        "https://" +
        process.env.AUTH0_DOMAIN +
        "/v2/logout?returnTo=http%3A%2F%2F" +
        process.env.BASE_URL +
        "&client_id=" +
        process.env.AUTH0_CLIENT_ID;
    }
  }
};
</script>
