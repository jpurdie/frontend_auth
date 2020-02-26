<template>
  <v-app>
    <v-content>
      <v-toolbar>
        <v-toolbar-title>Vitae</v-toolbar-title>

        <v-toolbar-items>
          <v-btn text to="/">home</v-btn>
          <v-btn text to="/public">public</v-btn>
          <v-btn v-if="$auth.$state.loggedIn" text to="/dashboard">
            Dashboard
          </v-btn>
        </v-toolbar-items>

        <div class="flex-grow-1"></div>

        <template v-if="$auth.$state.loggedIn">
          <v-menu :close-on-click="true" top>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="primary" dark>
                {{ $auth.$state.user.firstName }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="$auth.logout()">
                <v-icon>mdi-logout</v-icon>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-toolbar-items>
            <v-btn v-on:click="dologin" text>Login</v-btn>
            <v-btn text to="/register">Register</v-btn>
          </v-toolbar-items>
        </template>
      </v-toolbar>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="88"></v-progress-circular>
      </v-overlay>
    </v-content>
  </v-app>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  components: {
    //  NavBar
  },
  data: () => ({
    items: [{ title: 'Logout', action: 'logout' }]
  }),
  computed: mapGetters({
    errors: 'userauth/getErrors',
    registerStatus: 'userauth/getSignUpStatus',
    overlay: 'getOverlay'
  }),
  watch: {
    overlay(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
    }
  },
  methods: {
    dologin() {
      this.$auth.loginWith('auth0')
    }
  }
}
</script>
