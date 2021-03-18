<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Project</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <project-edit-form :id="idBeingEdited"></project-edit-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

// import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  layout: 'dashboard',
  data: () => ({
    idBeingEdited: ''
  }),
  computed: mapGetters({}),
  mounted() {
    this.idBeingEdited = this.$route.params.id;
  }
};
</script>
