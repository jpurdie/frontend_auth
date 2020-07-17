<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
          v-if="item.roles === undefined || item.roles.includes(userRole)"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            :to="subItem.link"
            nuxt
            v-if="subItem.roles === undefined || subItem.roles.includes(userRole)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <router-link to="/dashboard">
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
  props: {
    source: String
  },
  middleware: ["authz"],
  computed: mapGetters({
    selectedOrg: "user/getSelectedOrg",
    userRole: "user/getRole"
  }),
  components: {
    BaseImg: () => import("./../components/base/BaseImg")
  },
  data: () => ({
    drawer: null,
    items: [
      {
        action: "mdi-view-dashboard",
        title: "Dashboard",
        active: true
      },
      {
        action: "mdi-account-cog",
        title: "Admin",

        items: [
          { title: "Users", link: "/admin/users" },
          { title: "Invitations", link: "/admin/invitations" },
          {
            title: "Settings",
            link: "/admin/settings",
            roles: ["ADMIN", "OWNER"]
          }
        ]
      }
    ]
  }),
  created() {
    this.$vuetify.theme.dark = false;
  },
  mounted() {
    this.doFetchOrgs();
  },
  methods: {
    doFetchOrgs() {
      this.$store.dispatch("user/fetchOrgOptions");
    },
    doLogout() {
      console.log("Inside dologout");
      this.$auth.logout();
      window.location.href =
        "https://" +
        process.env.AUTH0_DOMAIN +
        "/v2/logout?returnTo=https%3A%2F%2F" +
        process.env.BASE_URL +
        "&client_id=" +
        process.env.AUTH0_CLIENT_ID;
    }
  }
};
</script>
