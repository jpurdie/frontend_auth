<template>
  <div>
    <v-card class="elevation-12" v-if="errors" id="errors-div">
      <v-alert v-for="(item, index) in errors" v-bind:key="index" show type="error">{{ item.msg }}</v-alert>
    </v-card>

    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Register</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <ValidationObserver ref="obs">
          <v-form @keydown.enter="register" @submit.stop.prevent="onSubmit">
            <ValidationProvider name="Organization Name" rules="required|min:2">
              <v-text-field
                slot-scope="{ errors, valid }"
                v-model="orgName"
                :error-messages="errors"
                :success="valid"
                autocomplete="off"
                label="Organization Name"
                required
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider name="First Name" rules="required|min:2">
              <v-text-field
                slot-scope="{ errors, valid }"
                v-model="firstName"
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
                v-model="lastName"
                :error-messages="errors"
                :success="valid"
                autocomplete="off"
                label="Last Name"
                required
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider name="Email" rules="required|email">
              <v-text-field
                slot-scope="{ errors, valid }"
                v-model="email"
                :error-messages="errors"
                :success="valid"
                label="Email"
                autocomplete="off"
                required
              ></v-text-field>
            </ValidationProvider>

            <ValidationProvider name="Password" rules="required|min:8">
              <v-text-field
                slot-scope="{ errors, valid }"
                v-model="password"
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
                v-model="passwordConfirm"
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
        <v-btn @click="register" :disabled="disableRgstrBtn" color="primary">Register</v-btn>
      </v-card-actions>
    </v-card>
  </div>
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
      orgName: null,
      email: "lutygipahu@test.asu.edu",
      password: "Mock123456",
      passwordConfirm: "Mock123456",
      lastName: "",
      firstName: "",
      disableRgstrBtn: false
    };
  },
  computed: mapGetters({
    errors: "userauth/getErrors",
    registerStatus: "userauth/getSignUpStatus"
  }),
  methods: {
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
        return;
      }

      const profile = {
        lastName: $vm.lastName,
        firstName: $vm.firstName,
        orgName: $vm.orgName,
        email: $vm.email,
        password: $vm.password,
        passwordConfirm: $vm.passwordConfirm
      };

      await $vm.$store.dispatch("userauth/register", profile);
      $vm.$store.dispatch("updateOverlay", false);
      $vm.disableRgstrBtn = false;
      if ($vm.errors !== undefined && $vm.errors.length === 0) {
        //$vm.redirectSuccess();
      }
    }
  }
};
</script>
