<template>
  <div>&nbsp;</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "empty-layout",
  mounted() {
    console.log("In Check Orgs");
    this.$store.dispatch("updateOverlay", true);
    this.doFetchUser();
  },
  computed: {
    ...mapState({
      orgs: state => state.user.orgs,
      me: state => state.user.me
    })
  },
  methods: {
    async doFetchUser() {
      const $vm = this;

      await this.$store.dispatch("user/fetchMe");
      $vm.$store.dispatch("updateOverlay", false);
      if ($vm.me.profiles.length === 1) {
        $vm.$router.push("/dashboard");
      } else {
        alert("check for more than one profile");
        $vm.$router.push("/dashboard");
      }
      $vm.$store.dispatch("updateOverlay", false);
    }
  }
};
</script>
