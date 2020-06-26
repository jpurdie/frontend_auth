<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card class="elevation-12" v-if="errors" id="errors-div">
          <v-alert
            v-for="(item, index) in errors"
            v-bind:key="index"
            show
            type="error"
          >{{ item.msg }}</v-alert>
        </v-card>

        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <ValidationObserver ref="obs">
              <v-form @keydown.enter="register" @submit.stop.prevent="onSubmit">
                <ValidationProvider
                  mode="lazy"
                  name="Organization Name"
                  rules="required|min:4|max:80"
                >
                  <v-text-field
                    slot-scope="{ errors, valid }"
                    v-model="orgName"
                    :error-messages="errors"
                    autocomplete="off"
                    label="Organization Name"
                    required
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider mode="lazy" name="First Name" rules="required|min:2|max:80">
                  <v-text-field
                    slot-scope="{ errors, valid }"
                    v-model="firstName"
                    :error-messages="errors"
                    autocomplete="off"
                    label="First Name"
                    required
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider mode="lazy" name="Last Name" rules="required|min:2|max:80">
                  <v-text-field
                    slot-scope="{ errors, valid }"
                    v-model="lastName"
                    :error-messages="errors"
                    autocomplete="off"
                    label="Last Name"
                    required
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider mode="lazy" name="Email" rules="required|email|max:80">
                  <v-text-field
                    slot-scope="{ errors, valid }"
                    v-model="email"
                    :error-messages="errors"
                    label="Email"
                    autocomplete="off"
                    required
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider name="password" rules="required|xpassword">
                  <v-text-field
                    slot-scope="{ errors, valid }"
                    v-model="passwordFirst"
                    :error-messages="errors"
                    label="Password"
                    autocomplete="off"
                    required
                    :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="() => (value = !value)"
                    :type="value ? 'password' : 'text'"
                    hint="10 to 64 characters with at least one capital letter, one lowercase letter, and one number."
                  ></v-text-field>
                </ValidationProvider>

                <ValidationProvider
                  mode="lazy"
                  name="password confirm"
                  rules="confirmed:password|required"
                >
                  <v-text-field
                    slot-scope="{ errors, valid }"
                    v-model="passwordConfirm"
                    :error-messages="errors"
                    :type="value ? 'password' : 'text'"
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
            <v-btn @click="ping" color="accent">Ping</v-btn>

            <v-btn @click="register" :disabled="disableRgstrBtn" color="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-button {
  border: 0;
}
</style>

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
      orgName: undefined,
      email: "lutygipahu@test.asu.edu",
      passwordFirst: undefined,
      passwordConfirm: undefined,
      lastName: undefined,
      firstName: undefined,
      disableRgstrBtn: false,
      valid: true,
      value: true
    };
  },
  computed: mapGetters({
    errors: "userauth/getErrors",
    registerStatus: "userauth/getSignUpStatus"
  }),
  methods: {
    ping() {
      this.$store.dispatch("nonAuthPing");
    },
    redirectSuccess() {
      this.$store.dispatch("updateOverlay", false);
      this.$router.push({
        path: "/register-success"
      });
    },
    async register() {
      const $vm = this;
      $vm.disableRgstrBtn = true;
      $vm.$store.dispatch("updateOverlay", true);

      const isValid = await $vm.$refs.obs.validate();
      if (!isValid) {
        $vm.disableRgstrBtn = false;
        $vm.$store.dispatch("updateOverlay", false);
        return;
      }

      const profile = {
        lastName: $vm.lastName,
        firstName: $vm.firstName,
        orgName: $vm.orgName,
        email: $vm.email,
        password: $vm.passwordFirst,
        passwordConfirm: $vm.passwordConfirm
      };

      await $vm.$store.dispatch("userauth/register", profile);
      $vm.$store.dispatch("updateOverlay", false);
      $vm.disableRgstrBtn = false;
      if ($vm.errors !== undefined && $vm.errors.length === 0) {
        $vm.redirectSuccess();
      }
    }
  }
};
</script>
