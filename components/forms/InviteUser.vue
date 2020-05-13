<template>
  <ValidationObserver ref="observer" v-slot="{ validate, reset }">
    <v-form v-model="valid">
      <ValidationProvider v-slot="{ errors }" name="Email Address" rules="required|email">
        <v-text-field
          :append-outer-icon="'mdi-send'"
          @click:append-outer="sendInvitation"
          v-model="inviteEmail"
          :error-messages="errors"
          label="Email Address"
          required
        ></v-text-field>
      </ValidationProvider>
    </v-form>
  </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";

setInteractionMode("eager");

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({ valid: true, inviteEmail: "" }),
  methods: {
    async sendInvitation() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.$store.dispatch("adminUsers/sendInviteEmailReq", this.inviteEmail);
      }
    }
  }
};
</script>
