<template>
  <v-navigation-drawer
    v-bind="$attrs"
    v-on="$listeners"
    bottom
    color="transparent"
    fixed
    height="auto"
    overlay-color="secondary"
    overlay-opacity=".8"
    temporary
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
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      registerText: "Register",
      loginText: "Login"
    };
  },
  methods: {
    dologin() {
      this.$auth.loginWith("auth0");
    }
  }
};
</script>
