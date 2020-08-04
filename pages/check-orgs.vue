<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col md="6" xs="12">
        <v-card id="errors-div" v-if="userErrors" class="elevation-12">
          <v-alert
            v-for="(item, index) in userErrors"
            v-bind:key="index"
            show
            type="error"
            >{{ item.msg }}</v-alert
          >
        </v-card>

        <v-card class="mx-auto" max-width="300" tile>
          <v-list>
            <v-subheader>Which organization do you want to see?</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(profile, i) in me.profiles"
                :key="i"
                @click="selectProfile(profile.profileID)"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="profile.organization.name"
                  ></v-list-item-title>
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
  layout: "empty-layout",
  data() {
    return {
      selectedOrg: undefined
    };
  },
  mounted() {
    this.$store.dispatch("updateOverlay", true);
    this.doFetchUser();
  },
  computed: {
    ...mapState({
      orgs: state => state.user.orgs,
      userErrors: state => state.user.errors,
      me: state => state.user.me
    })
  },
  methods: {
    async selectProfile(profileID) {
      try {
        await this.$store.dispatch("user/selectProfile", profileID);
        alert("success");
        // this.$router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    },
    async doFetchUser() {
      const $vm = this;
      await this.$store.dispatch("user/fetchMe");
      $vm.$store.dispatch("updateOverlay", false);
      if ($vm.me.profiles.length === 1) {
        // $vm.$router.push("/dashboard");
      }
    }
  }
};
</script>
