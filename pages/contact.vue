<template>
  <v-sheet id="contact" color="#333333" dark tag="section" tile>
    <div class="py-12"></div>

    <v-container>
      <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">
        Contact Us
      </h2>

      <v-responsive class="mx-auto mb-12" width="56">
        <v-divider class="mb-1"></v-divider>

        <v-divider></v-divider>
      </v-responsive>

      <v-theme-provider light>
        <v-row>
          <v-col cols="12">
            <v-text-field flat label="Name*" solo></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field flat label="Email*" solo></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field flat label="Subject*" solo></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea flat label="Message*" solo></v-textarea>
          </v-col>

          <v-col class="mx-auto" cols="auto">
            <v-btn color="primary" x-large>Submit</v-btn>
          </v-col>
        </v-row>
      </v-theme-provider>
    </v-container>

    <div class="py-12"></div>
  </v-sheet>
</template>

<script>
export default {
  options: {
    auth: false
  }
};
</script>
