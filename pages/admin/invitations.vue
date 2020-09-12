<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <v-card id="errors-div" v-if="inviteErrors !== undefined && inviteErrors.length > 0" class="elevation-12">
          <v-alert v-for="(item, index) in inviteErrors" v-bind:key="index" show type="error">{{ item.msg }}</v-alert>
        </v-card>
        <v-card elevation="4">
          <v-card-title class="headline">Invitations</v-card-title>
          <v-card-text>
            <v-skeleton-loader v-if="invitations === undefined" type="list-item-two-line@3" tile></v-skeleton-loader>
            <v-alert v-if="invitations !== undefined && invitations.length === 0" type="info"
              >No pending invitations</v-alert
            >
            <v-list dense flat>
              <v-list-item v-for="invitation in invitations" :key="invitation.email">
                <v-list-item-content>
                  <v-list-item-title>{{ invitation.email }}</v-list-item-title>
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
      </v-col>
    </v-row>
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
    selectedProfile: "user/getSelectedProfile",
    invitations: "admin/invitations/getInvitations",
    inviteErrors: "admin/invitations/getErrors"
  }),
  watch: {},
  mounted() {
    this.list();
  },
  methods: {
    async list() {
      await this.$store.dispatch("admin/invitations/fetchAll");
    },
    inactivateInvite(email) {
      this.$store.dispatch("admin/invitations/inactivateInvite", email);
    },
    resendInvite(email) {
      this.$store.dispatch("admin/invitations/resendInvite", email);
    }
  }
};
</script>
