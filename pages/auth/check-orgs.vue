<template>
  <div>{{orgs}}</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "empty-layout",
  mounted() {
    this.doFetchOrgs();
  },
  computed: {
    ...mapState({
      orgs: state => state.userauth.userOrgs
    })
  },
  methods: {
    doFetchOrgs() {
      const $vm = this;
      console.log("before fetch orgs");
      this.$store.dispatch("userauth/fetchOrgOptions").then(data => {
        console.log("inside fetch orgs then", data.length);

        if (data.length === 1) {
          $vm.$router.push("/dashboard");
        }
      });
      console.log("after fetch orgs");
    }
  }
};
</script>
