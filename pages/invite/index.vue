<template>
  <div>
    <v-card class="elevation-12" v-if="invitationErrors">
      <v-alert
        v-for="(item, index) in invitationErrors"
        v-bind:key="index"
        show
        type="error"
      >{{ item.message }}</v-alert>
    </v-card>

    <v-card class="elevation-12" v-if="invitation && invitation.email">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Register</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <ValidationObserver ref="obs">
          <v-form @keydown.enter="register" @submit.stop.prevent="onSubmit">
            <ValidationProvider name="First Name" rules="required|min:2">
              <v-text-field
                slot-scope="{ errors, valid }"
                v-model="profile.firstName"
                :error-messages="errors"
                :success="valid"
                autocomplete="off"
                label="First Name"
                required
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider name="Last Name" rules="required|min:2">
              <v-text-field
                slot-scope="{ errors, valid }"
                v-model="profile.lastName"
                :error-messages="errors"
                :success="valid"
                autocomplete="off"
                label="Last Name"
                required
              ></v-text-field>
            </ValidationProvider>

            <v-text-field
              v-model="invitation.email"
              disabled
              label="Email"
              type="text"
              autocomplete="off"
            ></v-text-field>

            <ValidationProvider name="Password" rules="required|min:8">
              <v-text-field
                slot-scope="{ errors, valid }"
                v-model="profile.password"
                :error-messages="errors"
                :success="valid"
                label="Password"
                type="password"
                required
                autocomplete="off"
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider name="Password Confirm" rules="required|min:8">
              <v-text-field
                slot-scope="{ errors, valid }"
                v-model="profile.passwordConfirm"
                :error-messages="errors"
                :success="valid"
                type="password"
                label="Password Confirm"
                autocomplete="off"
                required
              ></v-text-field>
            </ValidationProvider>
          </v-form>
        </ValidationObserver>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="register" color="primary">Register</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      urlToken: undefined,
      profile: {
        password: "Mock123456",
        passwordConfirm: "Mock123456",
        lastName: "",
        firstName: ""
      }
    };
  },
  computed: mapGetters({
    errors: "userauth/getErrors",
    invitation: "invitations/getInvitation",
    invitationErrors: "invitations/getErrors",
    registerStatus: "userauth/getSignUpStatus"
  }),
  mounted() {
    if (this.$route.query.t !== null && this.$route.query.t !== undefined) {
      this.urlToken = this.$route.query.t;
    }
    this.validateToken();
  },
  methods: {
    async register() {
      const isValid = await this.$refs.obs.validate();
      if (!isValid) {
        return;
      }

      const acceptDetails = {
        lastName: this.profile.lastName,
        firstName: this.profile.firstName,
        password: this.profile.password,
        passwordConfirm: this.profile.passwordConfirm,
        urlToken: this.urlToken
      };
      const $vm = this;
      this.$store.dispatch("updateOverlay", true);

      this.$store.dispatch("invitations/register", acceptDetails).then(
        response => {
          $vm.$store.dispatch("updateOverlay", false);
          console.log("success promise");
          //  $vm.redirectSuccess();
        },
        error => {
          $vm.$store.dispatch("updateOverlay", false);
          console.log("promise fail");
          console.error(error);
        }
      );
    },
    validateToken() {
      this.$store.dispatch("invitations/checkToken", this.urlToken);
    }
  }
};
</script>
