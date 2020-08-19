<template>
  <v-container fluid>
    <v-layout row mb-3>
      <v-flex md6>
        <h1>Dashboard</h1>
        <p>
          {{ xtoken }}
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: "dashboard-layout",
  data: () => ({
    xtoken: undefined
  }),
  mounted() {
    // this.$auth.refreshTokens().then(value => {
    //   console.log(value);
    //   // expected output: "Success!"
    // });
  },
  methods: {}
};
</script>
