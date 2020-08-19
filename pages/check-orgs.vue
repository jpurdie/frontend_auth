<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col md="6" xs="12">
        <v-card id="errors-div" v-if="userErrors" class="elevation-12">
          <v-alert v-for="(item, index) in userErrors" v-bind:key="index" show type="error">{{ item.msg }}</v-alert>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col md="6" xs="12">
        <h1 class="primary--text">
          Which organization do you want to see?
        </h1>
        <v-card class="mx-auto" max-width="" tile>
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(profile, i) in me.profiles"
                :key="i"
                @click="selectProfile(profile.profileID, profile.organization.organizationID)"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="profile.organization.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  layout: "header-only-layout",
  data() {
    return {
      selectedOrg: undefined
    };
  },
  mounted() {
    this.$cookies.remove("user.profile"); // clear out any selected profile
    this.$store.dispatch("updateOverlay", true);
    this.doFetchUser();
  },
  computed: {
    ...mapState({
      userErrors: state => state.user.errors,
      me: state => state.user.me
    })
  },
  methods: {
    async selectProfile(profileID) {
      await this.$store.dispatch("user/selectProfile", profileID);
      this.$router.push("/dashboard");
    },
    async doFetchUser() {
      const $vm = this;
      await this.$store.dispatch("user/fetchMe");
      $vm.$store.dispatch("updateOverlay", false);
      console.log("$vm.me.profiles.length", $vm.me.profiles.length);
      if ($vm.me.profiles.length === 1) {
        // no need to wait for a selection if they only have one profile
        $vm.$router.push("/dashboard");
      }
    }
  }
};
</script>
