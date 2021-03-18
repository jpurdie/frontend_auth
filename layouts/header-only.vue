<template>
  <v-app>
    <top-app-bar :navbar="false"></top-app-bar>
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
  middleware: ['me'],
  computed: {
    // ...mapGetters({
    //   userRole: 'user/getRole',
    //   errors: 'getErrors',
    //   selectedProfile: 'user/getSelectedProfile',
    //   me: 'user/getMe'
    // })
  },
  components: {},
  data: () => ({
    drawerVis: null
  }),
  created() {},
  mounted() {},
  methods: {}
};
</script>
