<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card id="errors-div" class="elevation-1">
          <v-alert v-for="(item, index) in errors" v-bind:key="index" show type="error">{{ item.msg }}</v-alert>
        </v-card>
        <v-card elevation="1">
          <v-card-title class="headline">Strategic Alignment</v-card-title>
          <v-card-text>
            <strategic-alignment-form />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "dashboard-layout",
  components: {},
  data() {
    return {
      errors: [],
      selectedInvite: undefined,
      showInviteDialog: false
    };
  },
  computed: mapGetters({
    selectedProfile: "user/getSelectedProfile"
  }),
  watch: {},
  mounted() {},
  methods: {
    doAuthPing() {
      this.$store.dispatch("authPing");
    }
  }
};
</script>
