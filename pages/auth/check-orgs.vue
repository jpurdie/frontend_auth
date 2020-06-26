<template>
  <div>&nbsp;</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "empty-layout",
  mounted() {
    this.$store.dispatch("updateOverlay", true);

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

      this.$store.dispatch("userauth/fetchOrgOptions").then(data => {
        if (data.length === 1) {
          // only 1 org. No need to ask which.
          $vm.$router.push("/dashboard");
        } else {
          $vm.$router.push("/dashboard");
        }
        $vm.$store.dispatch("updateOverlay", false);
      });
    }
  }
};
</script>
