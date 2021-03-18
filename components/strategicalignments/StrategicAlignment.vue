<template>
  <v-card flat>
    <v-card-text>
      <v-card elevation="1">
        <strategic-alignment-list />
      </v-card>
    </v-card-text>
    <v-card-text style="height: 100px; position: relative">
      <v-fab-transition>
        <v-btn color="primary" @click="showForm" dark absolute top right fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
    <strategic-alignment-form :display.sync="showHide" />
  </v-card>
</template>

<script>
export default {
  data: () => ({
    showHide: false
  }),
  methods: {
    showForm() {
      this.showHide = !this.showHide;
    }
  }
};
</script>
