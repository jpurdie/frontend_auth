<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col md="6" xs="12">
        <component :is="errorPage" :error="error" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import error500 from "~/components/error/500.vue";
export default {
  name: "NuxtError",
  layout: "default", // optional
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    errorPage() {
      return error500;
    }
  },
  mounted() {
    this.$store.dispatch("updateOverlay", false);
  }
};
</script>
