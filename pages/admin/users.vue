<template>
  <v-container>
    <v-layout row mb-3>
      <v-flex md6>
        <v-btn @click="doAuthPing" color="primary" dark>Auth Ping</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md6>
        <v-card>
          <v-card-title class="headline">Invitations</v-card-title>
          <v-card-text>
            <v-list dense flat>
              <v-list-item v-for="invitation in invitations" :key="invitation.email">
                <v-list-item-content>
                  <v-list-item-title>{{invitation.email}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="inactivateInvite(invitation.email)" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn @click="resendInvite(invitation.email)" icon>
                    <v-icon>mdi-send</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <inviteForm />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import inviteForm from "~/components/forms/InviteUser.vue";

export default {
  layout: "dashboard-layout",
  components: {
    inviteForm
  },
  data() {
    return {
      selectedInvite: undefined,
      showInviteDialog: false
    };
  },
  computed: mapGetters({
    selectedOrg: "user/getOrg",
    invitations: "admin/invitations/getInvitations"
  }),
  watch: {},
  mounted() {
    this.fetchAll();
  },
  methods: {
    doAuthPing() {
      this.$store.dispatch("authPing");
    },
    fetchAll() {
      this.$store.dispatch("admin/invitations/fetchAll");
    },
    inactivateInvite(email) {
      this.$store.dispatch("admin/invitations/inactivateInvite", email);
    },
    resendInvite(email) {
      this.$store.dispatch("admin/invitations/resendInvite", email);
    },
    showinvite() {
      alert("");
    }
  }
};
</script>
