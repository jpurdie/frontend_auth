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
            <v-text-field
              :rules="projectForm.rules.name"
              v-model="project.name"
              :counter="100"
              :label="projectForm.nameLabel"
              @click:append-outer="updateName"
              autocomplete="off"
              required
              append-outer-icon="mdi-content-save"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="project.descr"
              :label="projectForm.descrLabel"
              @click:append-outer="updateDescr"
              auto-grow
              dense
              height="225px"
              outlined
              hide-details
              append-outer-icon="mdi-content-save"
            ></v-textarea>
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
            <v-select
              v-model="project.status.id"
              :rules="projectForm.rules.select"
              :items="statuses"
              :label="projectForm.statusLabel"
              dense
              required
            ></v-select>
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
            <v-select
              v-model="project.size.id"
              :rules="projectForm.rules.select"
              :items="sizes"
              :label="projectForm.sizeLabel"
              dense
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="project.openForTimeEntry"
              :rules="projectForm.rules.select"
              :items="yn"
              :label="projectForm.openForTimeEntryLabel"
              dense
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "dashboard-layout",
  props: ["id"], // prettier-ignore
  computed: mapGetters({
    statuses: "projects/getStatuses",
    types: "projects/getTypes",
    complexities: "projects/getComplexities",
    sizes: "projects/getSizes",
    projectInitial: "projects/getProjectBeingViewed"
  }),
  watch: {
    // eslint-disable-next-line object-shorthand
    async "project.status.id"(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { value: newVal, key: "status" }
        };
        await $vm.$store.dispatch("projects/updateProject", req);
      } catch (err) {
        console.error(err);
      }
    },

    async "project.complexity.id"(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { value: newVal, key: "complexity" }
        };
        await $vm.$store.dispatch("projects/updateProject", req);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line object-shorthand
    "project.type.id": async function(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { value: newVal, key: "type" }
        };
        await $vm.$store.dispatch("projects/updateProject", req);
      } catch (err) {
        console.error(err);
      }
    },
    // eslint-disable-next-line object-shorthand
    "project.rgt": async function(newVal, oldVal) {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { value: newVal, key: "rgt" }
        };
        await $vm.$store.dispatch("projects/updateProject", req);
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
      size: { name: undefined }
    },
    projectForm: {
      rules: {
        name: [v => !!v || "Name is required", v => (v && v.length > 2) || "Name must be at least 2 characters"],
        select: [v => !!v || "Item is required"]
      },
      valid: undefined,
      nameLabel: "Project Name",
      descrLabel: "Project Description",
      statusLabel: "Status",
      typesLabel: "Type",
      openForTimeEntryLabel: "Open For Time Entry",
      rgtLabel: "RGT",
      complexitiesLabel: "Complexity",
      sizeLabel: "Size"
    },
    rgtItems: ["R", "G", "T"],
    yn: ["Y", "N"]
  }),
  mounted() {
    this.initValues();
  },
  methods: {
    async fetchProject() {
      const $vm = this;
      if ($vm.$props.id !== "") {
        await $vm.$store.dispatch("projects/fetchProject", this.id);
        // Got project. Need to copy to local
        $vm.project = JSON.parse(JSON.stringify($vm.projectInitial));
      }
    },
    async updateName() {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { value: $vm.project.name, key: "name" }
        };
        await $vm.$store.dispatch("projects/updateProject", req);
      } catch (err) {
        console.error(err);
      }
    },
    async updateDescr() {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (!isValid) {
        return;
      }
      try {
        const req = {
          projectID: $vm.projectInitial.id,
          body: { value: $vm.project.descr, key: "description" }
        };
        await $vm.$store.dispatch("projects/updateProject", req);
      } catch (err) {
        console.error(err);
      }
    },
    initValues() {
      this.$store.dispatch("projects/fetchStatuses");
      this.$store.dispatch("projects/fetchTypes");
      this.$store.dispatch("projects/fetchComplexities");
      this.$store.dispatch("projects/fetchSizes");
      this.$nextTick(() => {
        this.fetchProject();
      });
    }
  }
};
</script>
