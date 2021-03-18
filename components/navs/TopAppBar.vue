<template>
  <v-app-bar app clipped-left>
    <!-- <v-app-bar-nav-icon v-on:click="toggleDrawer" v-if="navbar"></v-app-bar-nav-icon> -->
    <router-link to="/dashboard">
      <BaseImg :src="require('@/assets/vitae_logo.png')" contain max-width="128" width="100%" />
    </router-link>
    <span class="ml-4 text-truncate d-none d-sm-flex">{{ selectedOrgName() }}</span>
    <div class="flex-grow-1"></div>
    <template v-if="$auth.$state.loggedIn">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon color="primary" dark>
            <v-avatar tile color="primary">
              <span class="white--text headline">{{ initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list min-width="200">
          <v-list-item to="/settings/personal">
            <v-icon>mdi-account</v-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="doLogout">
            <v-icon>mdi-logout</v-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  middleware: ['me', 'check-profile'],
  props: ['navbar'],
  computed: {
    ...mapGetters({
      userRole: 'user/getRole',
      errors: 'getErrors',
      selectedProfile: 'user/getSelectedProfile',
      me: 'user/getMe'
    })
  },
  components: {
    BaseImg: () => import('./../base/BaseImg')
  },
  data: () => ({
    drawer: true,
    initials: ''
  }),
  created() {},
  mounted() {
    this.initials = this.$auth.user.nickname.charAt(0) + this.$auth.user.family_name.charAt(0);
  },
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
    toggleDrawer() {
      console.log('toggleDrawer called');
      this.$store.dispatch('toggleNavDrawer');
    },
    doLogout() {
      console.log('Inside dologout');
      this.$auth.logout();
    }
  }
};
</script>
