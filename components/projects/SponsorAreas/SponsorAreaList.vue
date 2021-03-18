<template>
  <div>
    <v-list flat>
      <v-list-item v-if="sponsorAreas == null || sponsorAreas == undefined || sponsorAreas.length == 0">
        <v-list-item-content>Nothing found</v-list-item-content>
      </v-list-item>
      <v-list-item v-for="(tempSponsorArea, index) in sponsorAreas" :key="tempSponsorArea.id">
        <v-list-item-content>
          <v-list-item-title>{{ tempSponsorArea.name }}</v-list-item-title>
        </v-list-item-content>
        <template>
          <v-list-item-icon>
            <v-btn @click="edit(tempSponsorArea)" icon>
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-icon>
            <v-btn @click="deleteSA(tempSponsorArea.id)" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </template>
      </v-list-item>
    </v-list>
    <sponsor-area-edit-form :display.sync="showHide" :sponsorArea.sync="sponsorAreaBeingEdited" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    sponsorAreas: 'admin/sponsorareas/getSponsorAreas'
  }),
  data() {
    return {
      sponsorAreaBeingEdited: {
        name: '',
        id: ''
      },
      showHide: false,
      updatedVal: ''
    };
  },
  mounted() {
    this.initValues();
  },

  methods: {
    edit(sponsorArea) {
      console.log('in edit');
      this.sponsorAreaBeingEdited = JSON.parse(JSON.stringify(sponsorArea));
      this.showHide = true;
    },
    deleteSA(sponsorAreaID) {
      const r = confirm('Are you sure?');
      if (!r) {
        return;
      }
      this.$store.dispatch('admin/sponsorareas/delete', sponsorAreaID);
    },
    initValues() {
      this.$store.dispatch('admin/sponsorareas/list');
    }
  }
};
</script>
