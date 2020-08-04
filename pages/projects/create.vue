<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col md="6" xs="12">
        <v-text-field
          v-model="project.name"
          :rules="nameRules"
          :counter="10"
          label="Project Name"
          required
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  layout: "dashboard-layout",

  components: {
    project: {
      name: ""
    },
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      urlToken: undefined
    };
  },
  computed: mapGetters({
    errors: "user/getErrors"
  }),
  mounted() {}
};
</script>
