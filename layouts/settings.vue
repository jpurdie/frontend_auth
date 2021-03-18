<template>
  <v-app>
    <top-app-bar :navbar="false"></top-app-bar>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" offset-sm="4">
            <h1>Your Settings</h1>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" offset-sm="4">
            <v-row>
              <v-col cols="3">
                <settings-menu />
              </v-col>
              <v-col cols="4">
                <nuxt />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    source: String
  },
  middleware: ['me', 'check-profile'],
  computed: {
    ...mapGetters({
      userRole: 'user/getRole',
      errors: 'getErrors',
      selectedProfile: 'user/getSelectedProfile',
      me: 'user/getMe'
    })
  },
  components: {},
  data: () => ({
    drawerVis: null,
    initials: '',
    items: [
      {
        icon: 'mdi-view-dashboard',
        title: 'Dashboard',
        link: '/dashboard'
      },
      {
        icon: 'mdi-map-marker-distance',
        title: 'Projects',
        link: '/projects'
      },
      {
        icon: 'mdi-map-marker-distance',
        title: 'Capacity Planning',
        link: '/capacityplanning'
      },
      {
        icon: 'mdi-account-cog',
        title: 'Admin',
        roles: ['ADMIN', 'OWNER'],
        active: false,
        group: 'admin',
        items: [
          {
            title: 'Users',
            link: '/admin/users',
            active: false
          },
          {
            title: 'Projects',
            link: '/admin/projects',
            active: false
          },
          {
            title: 'Invitations',
            link: '/admin/invitations',
            active: false
          },
          {
            title: 'Settings',
            link: '/admin/settings',
            active: false
          }
        ]
      }
    ]
  }),
  created() {},
  mounted() {
    this.initials = this.$auth.user.nickname.charAt(0) + this.$auth.user.family_name.charAt(0);
  },
  methods: {
    onClickChild(value) {
      console.log(value); // someValue
    },
    updateParent(value_from_child) {
      alert('hello child' + value_from_child);
    },
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
      console.log('Inside dologout');
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
