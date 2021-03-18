<template>
  <v-row>
    <v-col cols="4">
      <v-btn depressed color="primary" @click="updatePassword">
        Change Password
      </v-btn>
    </v-col>
    <v-col cols="8">
      <v-alert v-if="displayPWResetMsg">A password reset email has been sent to {{ this.user.email }}</v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapGetters } from 'vuex';

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    me() {
      return JSON.parse(JSON.stringify(this.$store.state.user.me));
    },
    ...mapGetters({
      userRole: 'user/getRole',
      errors: 'getErrors',
      selectedProfile: 'user/getSelectedProfile'
    })
  },
  data: () => ({
    loader: null,
    user: {},
    displayPWResetMsg: false
  }),
  mounted() {
    this.user = JSON.parse(JSON.stringify(this.$store.state.user.me));
  },
  methods: {
    async updatePassword() {
      const resp = await this.$store.dispatch('settings/user/requestPasswordReset', this.user.email);
      console.log('resp', resp);
      if (resp.status === 200) {
        this.displayPWResetMsg = true;
      }
    }
  }
};
</script>
