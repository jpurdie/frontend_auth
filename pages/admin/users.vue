<template>
  <v-container>
    <v-layout row mb-3>
      <v-flex md6>
        <v-btn color="primary" dark @click="doAuthPing">Ping</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md6>
        <v-card>
          <v-card-title class="headline">Invitations</v-card-title>
          <v-card-text>
            <v-list dense flat>
              <v-list-item-group v-model="selectedInvite" color="primary">
                <v-list-item v-for="invitation in invitations" :key="invitation.email">
                  <v-list-item-content>
                    <v-list-item-title v-text="invitation.email"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="inactivateInvite(invitation.email)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn icon @click="resendInvite(invitation.email)">
                      <v-icon>mdi-send</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
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
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
  data() {
    return {
      selectedInvite: undefined,
      inviteDialog: false
    };
  },
  computed: {
    ...mapState({
      selectedOrg: state => state.userauth.selectedOrg,
      invitations: state => state.invitations.invitations
    })
  },
  mounted() {
    this.fetchAll();
  },
  methods: {
    doAuthPing() {
      this.$store.dispatch("authPing");
    },
    fetchAll() {
      this.$store.dispatch("invitations/fetchAll");
    },
    inactivateInvite(email) {
      this.$store.dispatch("invitations/inactivateInvite", email);
    },
    resendInvite(email) {
      this.$store.dispatch("invitations/resendInvite", email);
    }
  }
};
</script>
