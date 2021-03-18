<template>
  <v-form
    ref="form"
    v-model="projectForm.valid"
    @keydown.enter="create"
    @submit.stop.prevent="onSubmit"
    :lazy-validation="false"
  >
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" md="12">
            <ValidationObserver ref="obsName">
              <ValidationProvider :name="projectForm.nameLabel" rules="required|max:100" v-slot="{ errors }">
                <v-text-field
                  :error-messages="errors"
                  :success="valid"
                  v-model="project.name"
                  :counter="100"
                  :label="projectForm.nameLabel"
                  @click:append-outer="updateName"
                  autocomplete="off"
                  required
                  append-outer-icon="mdi-content-save"
                ></v-text-field>
              </ValidationProvider>
            </ValidationObserver>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ValidationObserver ref="obsDescr">
              <ValidationProvider :name="projectForm.descrLabel" rules="max:5000" v-slot="{ errors }">
                <v-textarea
                  v-model="project.descr"
                  :label="projectForm.descrLabel"
                  @click:append-outer="updateDescr"
                  auto-grow
                  dense
                  height="225px"
                  outlined
                  hide-details
                  :error-messages="errors"
                  :success="valid"
                  append-outer-icon="mdi-content-save"
                ></v-textarea>
              </ValidationProvider>
            </ValidationObserver>
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
              @click:append-outer="updateSAs"
              append-outer-icon="mdi-content-save"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-select
              v-model="project.sponsorAreas"
              :items="sponsorAreas"
              multiple
              chips
              item-text="name"
              item-value="id"
              label="Sponsor Areas"
              :menu-props="{ maxHeight: '4000' }"
              hint="Sponsor Areas"
              @click:append-outer="updateSponsorAreas"
              append-outer-icon="mdi-content-save"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2">
        <v-row>
          <v-col cols="9">
            <v-select
              v-model="project.rgt"
              :items="rgtItems"
              :rules="projectForm.rules.select"
              :label="projectForm.rgtLabel"
              required
              dense
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              ref="obsStatus"
              v-slot="{ errors, valid }"
              :name="projectForm.statusLabel"
              rules="required|email"
            >
              <v-select
                v-model="project.status.id"
                :items="statuses"
                :label="projectForm.statusLabel"
                dense
                required
              ></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="project.type.id"
              :rules="projectForm.rules.select"
              :items="types"
              :label="projectForm.typesLabel"
              dense
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="project.complexity.id"
              :rules="projectForm.rules.select"
              :items="complexities"
              :label="projectForm.complexitiesLabel"
              dense
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ValidationProvider ref="obsSize" v-slot="{ errors, valid }" :name="projectForm.sizeLabel" rules="required">
              <v-select v-model="project.size.id" :items="sizes" :label="projectForm.sizeLabel" dense></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              ref="obsOpenForTimeEntry"
              v-slot="{ errors, valid }"
              :name="projectForm.openForTimeEntryLabel"
              rules="required"
            >
              <v-select
                v-model="project.openForTimeEntry"
                :items="ynItems"
                :label="projectForm.openForTimeEntryLabel"
                dense
              ></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              ref="obsTimeConstrained"
              v-slot="{ errors, valid }"
              :name="projectForm.timeConstrainedLabel"
              rules="required"
            >
              <v-select
                v-model="project.timeConstrained"
                :items="ynItems"
                :label="projectForm.timeConstrainedLabel"
                dense
              ></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ValidationProvider
              ref="obsCompliance"
              v-slot="{ errors, valid }"
              :name="projectForm.compliance"
              rules="required"
            >
              <v-select
                v-model="project.compliance"
                :items="ynItems"
                :label="projectForm.complianceLabel"
                dense
              ></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  layout: 'dashboard-layout',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: ["id"], // prettier-ignore
  computed: mapGetters({
    statuses: 'projects/getStatuses',
    types: 'projects/getTypes',
    complexities: 'projects/getComplexities',
    sizes: 'projects/getSizes',
    projectInitial: 'projects/getProjectBeingViewed',
    strategicAlignments: 'projects/getStrategicAlignments',
    sponsorAreas: 'admin/sponsorareas/getSponsorAreas'
  }),
  watch: {
    // eslint-disable-next-line object-shorthand
    'project.openForTimeEntry': async function(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.obsOpenForTimeEntry.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: newVal, path: '/openForTimeEntry' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line object-shorthand
    'project.status.id': async function(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.obsStatus.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: newVal, path: '/status' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line object-shorthand
    'project.complexity.id': async function(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: newVal, path: '/complexity' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line object-shorthand
    'project.type.id': async function(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: newVal, path: '/type' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line object-shorthand
    'project.size.id': async function(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: newVal, path: '/size' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line object-shorthand
    'project.rgt': async function(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: newVal, path: '/rgt' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line object-shorthand
    'project.compliance': async function(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: newVal, path: '/compliance' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line object-shorthand
    'project.timeConstrained': async function(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: newVal, path: '/timeConstrained' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    }
  },
  created() {
    // const $vm = this;
    // this.$nextTick(() => {
    //   // console.log()
    // });
  },
  data: () => ({
    project: {
      id: undefined,
      name: undefined,
      descr: undefined,
      rgt: undefined,
      openForTimeEntry: undefined,
      status: { name: undefined },
      type: { name: undefined },
      complexity: { name: undefined },
      size: { name: undefined },
      strategicAlignments: [],
      sponsorAreas: [],
      timeConstrained: undefined,
      compliance: undefined
    },
    projectForm: {
      rules: {
        name: [v => !!v || 'Name is required', v => (v && v.length > 2) || 'Name must be at least 2 characters'],
        select: [v => !!v || 'Item is required'],
        selectBool: [v => !!v || 'Item is required']
      },
      valid: undefined,
      nameLabel: 'Project Name',
      descrLabel: 'Project Description',
      statusLabel: 'Status',
      typesLabel: 'Type',
      openForTimeEntryLabel: 'Open For Time Entry',
      rgtLabel: 'RGT',
      complexitiesLabel: 'Complexity',
      sizeLabel: 'Size',
      sponsorAreaLabel: 'Sponsored By',
      timeConstrainedLabel: 'Time Constrained',
      complianceLabel: 'Compliance'
    },
    rgtItems: ['R', 'G', 'T'],
    ynItems: [
      { text: 'Yes', value: true },
      { text: 'No', value: false }
    ]
  }),
  mounted() {
    this.initValues();
  },
  methods: {
    async updateSAs(saID) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: $vm.project.strategicAlignments, path: '/strategicAlignments' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    async updateSponsorAreas(saID) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: $vm.project.sponsorAreas, path: '/sponsorAreas' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    async fetchProject() {
      const $vm = this;
      if ($vm.$props.id !== '') {
        await $vm.$store.dispatch('projects/fetchProject', this.id);
        // Got project. Need to copy to local
        $vm.project = JSON.parse(JSON.stringify($vm.projectInitial));
      }
    },
    async updateName() {
      const $vm = this;
      const isValid = await $vm.$refs.obsName.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: $vm.project.name, path: '/name' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    async updateDescr() {
      const $vm = this;
      const isValid = await $vm.$refs.obsDescr.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { op: 'replace', value: $vm.project.descr, path: '/description' }
        };
        await $vm.$store.dispatch('projects/updateProject', req);
      } catch (err) {
        console.error(err);
      }
    },
    initValues() {
      this.$store.dispatch('projects/fetchStatuses');
      this.$store.dispatch('projects/fetchTypes');
      this.$store.dispatch('projects/fetchComplexities');
      this.$store.dispatch('projects/fetchSizes');
      this.$store.dispatch('projects/fetchStrategicAlignments');
      this.$store.dispatch('admin/sponsorareas/list');

      this.$nextTick(() => {
        this.fetchProject();
      });
    }
  }
};
</script>
