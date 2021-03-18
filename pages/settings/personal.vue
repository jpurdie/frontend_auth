<template>
  <user-edit-form></user-edit-form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'settings',
  components: {},
  data() {
    return {
      displayPanel: ''
    };
  },
  computed: mapGetters({
    me: 'user/getMe'
  }),
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    changePanel(panelName) {
      this.displayPanel = panelName;
    },
    init() {
      this.$store.dispatch('updateNavDrawerDisp', false);
    },
    doAuthPing() {
      this.$store.dispatch('authPing');
    }
  }
};
</script>
