<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list :flat="true" :dense="true">
        <template v-for="item in items">
          <!-- Item has no sub items -->
          <template v-if="item.items === undefined">
            <v-list-item-group :key="item.title">
              <v-list-item :to="item.link" nuxt active-class="dash-nav-active">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </template>
          <!-- item has sub items -->
          <template v-else>
            <v-list-group
              :group="item.group"
              :key="item.title"
              :prepend-icon="item.icon"
              v-if="item.roles === undefined || item.roles.includes(userRole)"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>
              <template v-for="subItem in item.items">
                <v-list-item
                  :key="subItem.title"
                  :to="subItem.link"
                  v-if="
                    subItem.roles === undefined ||
                      subItem.roles.includes(userRole)
                  "
                  nuxt
                  active-class="dash-nav-active"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="subItem.title"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <router-link to="/dashboard">
        <BaseImg
          :src="require('@/assets/vitae_logo.png')"
          contain
          max-width="128"
          width="100%"
        />
      </router-link>
      <span class="ml-4">{{ selectedOrgName() }}</span>
      <div class="flex-grow-1"></div>
      <template v-if="$auth.$state.loggedIn">
        <v-menu :close-on-click="true" top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="primary" dark>{{
              $auth.user.nickname
            }}</v-btn>
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
  middleware: ["me", "check-profile"],
  computed: {
    ...mapGetters({
      userRole: "user/getRole",
      selectedProfile: "user/getSelectedProfile",
      me: "user/getMe"
    })
  },
  components: {
    BaseImg: () => import("./../components/base/BaseImg")
  },
  data: () => ({
    drawer: null,
    items: [
      {
        icon: "mdi-view-dashboard",
        title: "Dashboard",
        link: "/dashboard"
      },
      {
        icon: "mdi-map-marker-distance",
        title: "Projects",
        link: "/projects"
      },
      {
        icon: "mdi-account-cog",
        title: "Admin",
        roles: ["ADMIN", "OWNER"],
        active: false,
        group: "admin",
        items: [
          {
            title: "Users",
            link: "/admin/users",
            active: false
          },
          {
            title: "Invitations",
            link: "/admin/invitations",
            active: false
          },
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
  mounted() {},
  methods: {
    selectedOrgName() {
      if (
        this.selectedProfile === undefined ||
        this.selectedProfile === null ||
        this.selectedProfile.organization === undefined
      ) {
        //  this.$router.push("/check-orgs");
        return;
      }
      return this.selectedProfile.organization.name;
    },
    doLogout() {
      console.log("Inside dologout");
      this.$auth.logout();
      // window.location.href =
      //   "https://" +
      //   this.$config.auth0Domain +
      //   "/v2/logout?returnTo=https%3A%2F%2F" +
      //   this.$config.baseURL +
      //   "&client_id=" +
      //   this.$config.auth0Client;
    }
  }
};
</script>
