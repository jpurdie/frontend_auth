<template>
  <v-navigation-drawer
    bottom
    color="transparent"
    fixed
    height="auto"
    overlay-color="secondary"
    overlay-opacity=".8"
    temporary
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list color="white" shaped>
      <v-list-item to="/register" color="primary">
        <v-list-item-content>
          <v-list-item-title v-text="registerText" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="dologin()" color="primary">
        <v-list-item-content>
          <v-list-item-title v-text="loginText" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "HomeDrawer",
  data() {
    return {
      registerText: "Register",
      loginText: "Login"
    };
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    dologin() {
      this.$auth.loginWith("auth0");
    }
  }
};
</script>
