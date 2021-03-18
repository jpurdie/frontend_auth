<template>
  <v-app>
    <nav-drawer></nav-drawer>
    <top-app-bar :navbar="true"></top-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    source: String
  },
  middleware: ['me', 'check-profile'],
  computed: {
    ...mapGetters({})
  },
  components: {},
  data: () => ({}),
  created() {},
  mounted() {
    this.$store.dispatch('updateNavDrawerDisp', true);
  },
  methods: {}
};
</script>
