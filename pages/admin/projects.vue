<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="12">
        <h1 class="primary--text">Project Config</h1>
        <v-tabs background-color="#E0E0E0" color="black" slider-color="accent" slider-size="2">
          <v-tab ripple>
            {{ tabLabels.strategicAlignment }}
          </v-tab>
          <v-tab ripple>
            {{ tabLabels.sponsoredByAreas }}
          </v-tab>
          <v-tab-item>
            <v-row align="center">
              <v-col cols="12" md="8">
                <strategic-alignment />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-card flat center>
              <sponsor-areas />
            </v-card>
          </v-tab-item>
        </v-tabs>
        <!-- <v-card id="errors-div" class="elevation-1">
          <v-alert v-for="(item, index) in errors" v-bind:key="index" show type="error">{{ item.msg }}</v-alert>
        </v-card>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  layout: 'dashboard',
  components: {},
  data() {
    return {
      tabLabels: {
        strategicAlignment: 'Strategic Alignments',
        sponsoredByAreas: 'Sponsored By Areas'
      },
      errors: [],
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
    showForm() {},
    doAuthPing() {
      this.$store.dispatch('authPing');
    }
  }
};
</script>
