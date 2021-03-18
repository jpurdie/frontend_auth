<template>
  <v-container fluid>
    <v-layout row mb-3>
      <v-flex md6>
        <v-btn @click="doAuthPing" color="primary" dark>Auth Ping</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'dashboard',
  components: {},
  data() {
    return {
      selectedInvite: undefined,
      showInviteDialog: false
    };
  },
  computed: mapGetters({
    selectedProfile: 'user/getSelectedProfile'
  }),
  watch: {},
  mounted() {},
  methods: {
    doAuthPing() {
      this.$store.dispatch('authPing');
    }
  }
};
</script>
