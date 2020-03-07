<template>
  <v-form v-model="valid">
    <v-text-field
      :append-outer-icon="'mdi-send'"
      @click:append-outer="sendInvitation"
      v-model="inviteEmail"
      :rules="nameRules"
      clearable
      label="Email Address"
      required
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({ valid: true, inviteEmail: "" }),
  methods: {
    sendInvitation() {
      console.log("sending invitation");
      this.$store.dispatch("adminUsers/sendInviteEmailReq", this.inviteEmail);
    }
  }
};
</script>
