<template>
  <ValidationObserver ref="obs">
    <v-card id="errors-div" v-if="projectErrors.length > 0" class="elevation-12">
      <v-alert v-for="(item, index) in projectErrors" v-bind:key="index" show type="error">{{ item.msg }}</v-alert>
    </v-card>
    <v-form ref="form" @keydown.enter="create" @submit.stop.prevent="onSubmit">
      <v-row>
        <v-col cols="12" md="9">
          <v-row>
            <v-col cols="12" md="12">
              <ValidationProvider mode="lazy" name="project name" rules="required|min:10|max:150">
                <v-text-field
                  v-model="project.name"
                  :label="projectForm.nameLabel"
                  autocomplete="off"
                  required
                  :error-messages="errors"
                  slot-scope="{ errors, valid }"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                class="project_descr"
                v-model="project.descr"
                :label="projectForm.descrLabel"
                dense
                height="225px"
                outlined
                hide-details
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-select
                v-model="project.strategicAlignments"
                :items="strategicAlignments"
                label="Strategic Alignments"
                multiple
                chips
                :menu-props="{ maxHeight: '4000' }"
                hint="Strategic Alignments"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider mode="lazy">
                <v-select
                  v-model="project.sponsorAreas"
                  :items="sponsorAreas"
                  :label="projectForm.sponsorAreaLabel"
                  item-text="name"
                  item-value="id"
                  dense
                  multiple
                  chips
                  :error-messages="errors"
                  slot-scope="{ errors, valid }"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3">
          <v-row>
            <v-col cols="9">
              <ValidationProvider mode="lazy" :name="projectForm.descrLabel.toLowerCase()" rules="required">
                <v-select
                  v-model="project.rgt"
                  :items="rgtItems"
                  :label="projectForm.rgtLabel"
                  required
                  dense
                  :error-messages="errors"
                  slot-scope="{ errors, valid }"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider mode="lazy" :name="projectForm.statusLabel.toLowerCase()" rules="required">
                <v-select
                  v-model="project.status.id"
                  :items="statuses"
                  :label="projectForm.statusLabel"
                  dense
                  :error-messages="errors"
                  slot-scope="{ errors, valid }"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider mode="lazy" :name="projectForm.typesLabel.toLowerCase()" rules="required">
                <v-select
                  v-model="project.type.id"
                  :items="types"
                  :label="projectForm.typesLabel"
                  dense
                  :error-messages="errors"
                  slot-scope="{ errors, valid }"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider mode="lazy" :name="projectForm.complexitiesLabel.toLowerCase()" rules="required">
                <v-select
                  v-model="project.complexity.id"
                  :items="complexities"
                  :label="projectForm.complexitiesLabel"
                  dense
                  :error-messages="errors"
                  slot-scope="{ errors, valid }"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider mode="lazy" :name="projectForm.sizeLabel.toLowerCase()" rules="required">
                <v-select
                  v-model="project.size.id"
                  :items="sizes"
                  :label="projectForm.sizeLabel"
                  dense
                  :error-messages="errors"
                  slot-scope="{ errors, valid }"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider mode="lazy" :name="projectForm.openForTimeEntryLabel.toLowerCase()" rules="required">
                <v-select
                  v-model="project.openForTimeEntry"
                  :items="ynItems"
                  :label="projectForm.openForTimeEntryLabel"
                  dense
                  :error-messages="errors"
                  slot-scope="{ errors, valid }"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider mode="lazy" :name="projectForm.timeConstrainedLabel.toLowerCase()" rules="required">
                <v-select
                  v-model="project.timeConstrained"
                  :items="ynItems"
                  :label="projectForm.timeConstrainedLabel"
                  dense
                  :error-messages="errors"
                  slot-scope="{ errors, valid }"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ValidationProvider mode="lazy" :name="projectForm.complianceLabel.toLowerCase()" rules="required">
                <v-select
                  v-model="project.compliance"
                  :items="ynItems"
                  :label="projectForm.complianceLabel"
                  dense
                  :error-messages="errors"
                  slot-scope="{ errors, valid }"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-btn @click="create" :disabled="projectForm.submitting" color="primary" tile>Create</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  layout: 'dashboard-layout',
  props: ["id"], // prettier-ignore
  computed: mapGetters({
    statuses: 'projects/getStatuses',
    types: 'projects/getTypes',
    complexities: 'projects/getComplexities',
    sizes: 'projects/getSizes',
    strategicAlignments: 'projects/getStrategicAlignments',
    projectErrors: 'projects/getErrors',
    sponsorAreas: 'admin/sponsorareas/getSponsorAreas'
  }),
  components: {
    ValidationProvider,
    ValidationObserver
  },
  created() {},
  data: () => ({
    projectForm: {
      submitting: false,
      valid: undefined,
      nameLabel: 'Project Name',
      descrLabel: 'Project Description',
      statusLabel: 'Status',
      typesLabel: 'Type',
      rgtLabel: 'RGT',
      complexitiesLabel: 'Complexity',
      sizeLabel: 'Size',
      openForTimeEntryLabel: 'Open For Time Entry',
      sponsorAreaLabel: 'Sponsored By',
      timeConstrainedLabel: 'Time Constrained',
      complianceLabel: 'Compliance'
    },
    rgtItems: ['R', 'G', 'T'],
    ynItems: [
      { text: 'Y', value: true },
      { text: 'N', value: false }
    ],
    project: {
      name: undefined,
      descr: undefined,
      rgt: undefined,
      status: { id: undefined },
      type: { id: undefined },
      complexity: { id: undefined },
      size: { id: undefined },
      strategicAlignments: [],
      openForTimeEntry: undefined,
      sponsorAreas: [],
      timeConstrained: undefined,
      compliance: undefined
    }
  }),
  mounted() {
    this.initValues();
  },
  methods: {
    async create() {
      const $vm = this;
      $vm.$store.dispatch('updateOverlay', true);

      $vm.projectForm.submitting = true;
      const isValid = await $vm.$refs.obs.validate();
      $vm.$store.dispatch('updateOverlay', false);

      if (isValid) {
        const projID = await $vm.$store.dispatch('projects/create', $vm.project);
        console.log('proj ID', projID);
        if (projID !== undefined && projID !== null && projID !== '') {
          this.$router.push('/projects/' + projID);
          return;
        }

        this.$nextTick(() => {
          const el = document.getElementById('errors-div');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
          }
        });
      }
      $vm.projectForm.submitting = false;
      return false;
    },
    initValues() {
      this.$store.dispatch('projects/clearErrors');
      this.$store.dispatch('projects/fetchStatuses');
      this.$store.dispatch('projects/fetchTypes');
      this.$store.dispatch('projects/fetchComplexities');
      this.$store.dispatch('projects/fetchSizes');
      this.$store.dispatch('projects/fetchStrategicAlignments');
      this.$store.dispatch('admin/sponsorareas/list');
    }
  }
};
</script>
