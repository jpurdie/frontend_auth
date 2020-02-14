<template>
  <div>
    <v-alert
      v-if="errors"
      v-for="(item, index) in errors"
      v-bind:key="index"
      show
      type="error"
    >{{ item.msg }}</v-alert>

    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Register</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <p>registerStatus {{ registerStatus }}</p>
      <v-card-text>
        <busy-overlay />
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
        <v-btn @click="register" color="primary">Register</v-btn>
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
import { mapGetters } from 'vuex'

import { ValidationObserver, ValidationProvider } from 'vee-validate'
import busyOverlay from '~/components/busy-overlay'

export default {
  components: {
    busyOverlay,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      orgName: null,
      email: 'lutygipahu@test.asu.edu',
      password: 'Mock123456',
      passwordConfirm: 'Mock123456',
      lastName: '',
      firstName: ''
    }
  },
  computed: mapGetters({
    errors: 'userauth/getErrors',
    registerStatus: 'userauth/getSignUpStatus'
  }),
  methods: {
    redirectSuccess() {
      this.$router.push({
        path: '/register-success'
      })
    },
    async register() {
      console.log('this.$refs')
      console.log(this.$refs)

      const isValid = await this.$refs.obs.validate()
      if (!isValid) {
        return
      }

      const profile = {
        lastName: this.lastName,
        firstName: this.firstName,
        orgName: this.orgName,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      }
      const $vm = this

      this.$store.dispatch('userauth/register', profile).then((response) => {
          console.log('success promise')
          $vm.redirectSuccess()
        }, (error) => {
          console.log('promise fail')
        }
      )
    }
  }
}
</script>
