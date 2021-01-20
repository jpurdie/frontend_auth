<template>
  <div>
    <v-app-bar id="home-app-bar" app color="white" elevation="1" height="80">
      <router-link to="/">
        <BaseImg :src="require('@/assets/vitae_logo.png')" contain max-width="128" width="100%" />
      </router-link>
      <v-spacer />

      <div>
        <v-tabs class="hidden-sm-and-down" optional>
          <v-tab
            :ripple="false"
            @click="doLoginRegister()"
            active-class="text--primary"
            class="font-weight-bold"
            min-width="96"
            text
            >Login &amp; Register</v-tab
          >
        </v-tabs>
      </div>

      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up" />
    </v-app-bar>

    <home-drawer v-model="drawer" :items="items" />
  </div>
</template>

<script>
export default {
  name: "HomeAppBar",
  components: {
    HomeDrawer: () => import("./Drawer"),
    BaseImg: () => import("./../base/BaseImg")
  },
  data: () => ({
    title: "Vitae",
    drawer: null,
    items: [
      { title: "Register", path: "/register" },
      { title: "Sign In", path: "/register" }
    ]
  }),
  methods: {
    doLoginRegister() {
      this.$auth.loginWith("auth0");
    }
  }
};
</script>

<style lang="sass">
#home-app-bar
  .v-tabs-slider
    max-width: 24px
    margin: 0 auto

    .v-tab
      &::before
        display: none
</style>
