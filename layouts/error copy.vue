<template>
  <v-app>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
    <v-main>
      <v-container>
        <v-row align="center" justify="center">
          <v-col md="8" xs="12">
            <v-card id="errors-div" v-if="errors" class="elevation-12">
              <v-alert v-for="(item, index) in errors" v-bind:key="index" show type="error">{{ item.msg }}</v-alert>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title = this.otherError;
    return {
      title
    };
  },
  computed: mapGetters({
    errors: "getErrors",
    overlay: "getOverlay"
  }),
  data() {
    return {
      otherError: "There was an error :-("
    };
  }
};
</script>

<style scoped></style>
