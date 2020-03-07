<template>
  <v-container>
    <v-row>
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
import inviteForm from "~/components/forms/InviteUser.vue";

export default {
  layout: "dashboard",
  components: {
    inviteForm
  },
  data() {
    return {
      inviteDialog: false
    };
  },
  mounted() {},
  methods: {
    showinvite() {
      alert("");
    }
  }
};
</script>
