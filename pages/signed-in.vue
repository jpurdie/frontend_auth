<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col xs="12" sm="6" lg="4">
        <v-card id="errors-div" v-if="error.code !== ''" class="elevation-12">
          <v-alert show type="error">{{ error.descr }}</v-alert>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="resend" color="Primary">Resend Validation Email</v-btn>
          </v-card-actions>
        </v-card>
        <v-card id="errors-div" v-if="error.code === ''" class="elevation-12">
          <v-alert show type="success">Signing in...</v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      error: {
        code: '',
        descr: ''
      }
    };
  },
  mounted() {
    const code = this.$route.query.code;
    const state = this.$route.query.state;
    const authError = this.$route.query.error;
    const authErrorDescr = this.$route.query.error_description;
    console.log('inside signed in ', code, state, authError, authErrorDescr);
    if (authError !== null && authError !== undefined && authError !== '') {
      this.$store.dispatch('updateOverlay', false);
      this.error.code = authError;
      this.error.descr = authErrorDescr;
    } else {
      this.redirectToCheckOrgs();
    }
  },
  methods: {
    resend() {
      this.$store.dispatch('user/sendValidationEmail');
    },
    redirectToCheckOrgs() {
      console.log('redirectToCheckOrgs method');
      this.$store.dispatch('updateOverlay', true);
      window.location.href = '/check-orgs';
    }
  }
};
</script>
