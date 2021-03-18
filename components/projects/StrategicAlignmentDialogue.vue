<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Open Dialog
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="project.strategicAlignments"
          :items="strategicAlignments"
          label="Strategic Alignments"
          multiple
          chips
          :menu-props="{ maxHeight: '4000' }"
          hint="Strategic Alignments"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  props: ["alignments"], // prettier-ignore
  computed: mapGetters({
    strategicAlignments: 'projects/getStrategicAlignments'
  }),
  data: () => ({
    dialog: false,
    strategicAlignments: []
  })
};
</script>
