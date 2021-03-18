<template>
  <div>
    <v-list flat>
      <v-list-item v-if="alignments == null || alignments == undefined || alignments.length == 0">
        <v-list-item-content>Nothing found</v-list-item-content>
      </v-list-item>
      <v-list-item v-for="(tempAlignment, index) in alignments" :key="tempAlignment.id">
        <v-list-item-content>
          <v-list-item-title>{{ tempAlignment.name }}</v-list-item-title>
        </v-list-item-content>
        <template>
          <v-list-item-icon>
            <v-btn @click="edit(tempAlignment)" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-icon>
            <v-btn @click="deleteSA(tempAlignment.id)" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </template>
      </v-list-item>
    </v-list>
    <strategic-alignment-edit-form :display.sync="showHide" :alignment.sync="alignmentBeingEdited" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    alignments: 'admin/strategicalignments/getAlignments'
  }),
  data() {
    return {
      alignmentBeingEdited: {
        name: 'f',
        id: ''
      },
      showHide: false,
      updatedVal: '',
      headers: [
        { text: 'Projects', align: 'start', sortable: true, value: 'name' },
        { text: 'RGT', value: 'rgt' },
        { text: 'Status', value: 'status.name' },
        { text: 'Type', value: 'type.name' },
        { text: 'Complexity', value: 'complexity.name' },
        { text: 'Size', value: 'size.name' }
      ]
    };
  },
  mounted() {
    this.initValues();
  },

  methods: {
    edit(alignment) {
      console.log('in edit');
      this.alignmentBeingEdited = JSON.parse(JSON.stringify(alignment));
      this.showHide = true;
    },
    deleteSA(alignmentID) {
      const r = confirm('Are you sure?');
      if (!r) {
        return;
      }
      this.$store.dispatch('admin/strategicalignments/delete', alignmentID);
    },
    initValues() {
      this.$store.dispatch('admin/strategicalignments/list');
    }
  }
};
</script>
