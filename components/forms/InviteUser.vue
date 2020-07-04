<template>
  <v-dialog v-model="showHide" persistent max-width="750">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Invite Someone</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Invite Someone</v-card-title>
      <v-card-text>
        <ValidationObserver ref="observer" v-slot="{ validate, reset }">
          <v-form v-model="valid">
            <v-row no-gutters>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="Email Address" rules="required|email">
                  <v-text-field
                    :error-messages="errors"
                    v-model="inviteEmail"
                    label="Email Address"
                    autocomplete="off"
                    required
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          class="ma-2"
          :loading="sendingInvite"
          :disabled="sendingInvite"
          color="primary"
          @click="sendInvitation"
        >Invite</v-btn>
        <v-btn @click="showHide = false">Back</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
// @click:append-outer="sendInvitation"
setInteractionMode("eager");

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    // showHideInviteDialog: {
    //   type: Boolean,
    //   required: true,
    //   default: false
    // }
  },
  data: () => ({
    loader: null,
    loading: false,
    valid: true,
    inviteEmail: "",
    sendingInvite: false,
    showHide: false
  }),
  watch: {},
  methods: {
    async sendInvitation() {
      const $vm = this;
      const valid = await $vm.$refs.observer.validate();

      if (valid) {
        $vm.sendingInvite = true;

        $vm.$store
          .dispatch("invitations/sendInviteEmailReq", this.inviteEmail)
          .then(response => {
            $vm.$store.dispatch("invitations/fetchAll");
            $vm.inviteEmail = "";
            $vm.showHide = false;
          })
          .finally(() => {
            $vm.$nextTick(() => {
              $vm.$refs.observer.reset();
              $vm.sendingInvite = false;
            });
          });
      }
    }
  }
};
</script>
