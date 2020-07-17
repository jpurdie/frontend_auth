<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list :flat="true" :dense="true">
        <template v-for="item in items">
          <v-list-item-group v-if="item.items === undefined">
            <v-list-item :to="item.link" nuxt active-class="red--text">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>

          <v-list-item-group
            :key="item.title"
            :prepend-icon="item.action"
            no-action
            :value="item.active"
            v-if="(item.roles === undefined || item.roles.includes(userRole)) && item.items !== undefined"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
            <template v-if="subItem.roles === undefined || subItem.roles.includes(userRole)">
              <v-list-item
                v-for="subItem in item.items"
                :key="subItem.title"
                :to="subItem.link"
                v-model="subItem.active"
                nuxt
              >
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-item-group>
        </template>
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
        link: "/dashboard"
      },
      {
        action: "mdi-view-dashboard",
        title: "Projects",
        link: "/projects"
      },
      {
        action: "mdi-account-cog",
        title: "Admin",
        roles: ["ADMIN", "OWNER"],
        active: false,
        items: [
          { title: "Users", link: "/admin/users", active: false },
          { title: "Invitations", link: "/admin/invitations", active: false },
          {
            title: "Settings",
            link: "/admin/settings",
            active: false
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
