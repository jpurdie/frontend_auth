<template>
  <v-container>
    <v-row>
      <v-btn color="primary" dark @click="doAuthPing">Ping</v-btn>

      <v-dialog v-model="inviteDialog" persistent max-width="750">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Invite Someone</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Invite Someone</v-card-title>
          <v-card-text>
            <inviteForm />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="inviteDialog = false">Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import inviteForm from "~/components/forms/InviteUser.vue";

export default {
  layout: "dashboard-layout",
  components: {
    inviteForm
  },
  computed: {
    ...mapState({
      selectedOrg: state => state.userauth.selectedOrg
    })
  },
  data() {
    return {
      inviteDialog: false
    };
  },
  mounted() {},
  methods: {
    doAuthPing() {
      this.$store.dispatch("authPing");
    },
    showinvite() {
      alert("");
    }
  }
};
</script>
