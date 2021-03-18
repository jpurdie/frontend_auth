<template>
  <v-data-table :headers="headers" :items="projects" :items-per-page="5" dense class="elevation-1">
    <template #item.name="{ item }">
      <router-link :to="'projects/' + item.id">
        {{ item.name }}
      </router-link>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    projects: 'projects/getProjects'
  }),
  data() {
    return {
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
    initValues() {
      this.$store.dispatch('projects/listProjects');
    }
  }
};
</script>
