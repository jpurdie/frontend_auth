<template>
  <b-navbar toggleable="md" variant="light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand to="/">Nuxt.js</b-navbar-brand>
    <b-collapse id="nav_collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/dashboard" exact>Home</b-nav-item>
        <b-nav-item to="/public">Public</b-nav-item>
        <b-nav-item to="/secure">Secure</b-nav-item>
        <b-nav-item to="/dashboard">Dashboard</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <b-navbar-nav class="ml-auto">
      <template v-if="$auth.$state.loggedIn">
        <b-nav-item-dropdown :text="$auth.user.firstName" right>
          <b-dropdown-item @click="$auth.logout()">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-img :src="picture" class="mt-1" rounded="circle" width="30px" height="30px" />
      </template>
      <template v-else>
        <b-dropdown-item to="/login">Login</b-dropdown-item>
        <b-dropdown-item to="/register">Register</b-dropdown-item>
      </template>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
// import dotProp from 'dotprop'

export default {
  computed: {
    picture() {
      return "";
    }
  }
};
</script>
