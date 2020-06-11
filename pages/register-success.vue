<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-alert type="success">
          An email has been sent to the address provided.
          <br />Please check your email.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  options: {
    auth: false
  }
};
</script>
