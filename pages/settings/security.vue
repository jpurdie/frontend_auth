<template>
  <security-edit-form></security-edit-form>
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
    init() {},
    doAuthPing() {
      this.$store.dispatch('authPing');
    }
  }
};
</script>
