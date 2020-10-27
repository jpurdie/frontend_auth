<template>
  <v-form
    ref="form"
    v-model="projectForm.valid"
    @keydown.enter="create"
    @submit.stop.prevent="onSubmit"
    :lazy-validation="true"
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
              autocomplete="off"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="project.descr"
              :label="projectForm.descrLabel"
              dense
              height="225px"
              outlined
              hide-details
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
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-btn @click="create" :disabled="!projectForm.valid" color="primary" tile>Create</v-btn>
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
    sizes: "projects/getSizes"
  }),
  created() {},
  data: () => ({
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
      rgtLabel: "RGT",
      complexitiesLabel: "Complexity",
      sizeLabel: "Size"
    },
    rgtItems: ["R", "G", "T"],
    project: {
      name: undefined,
      descr: undefined,
      rgt: undefined,
      status: { id: undefined },
      type: { id: undefined },
      complexity: { id: undefined },
      size: { id: undefined }
    }
  }),
  mounted() {
    this.initValues();
  },
  methods: {
    async create() {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();

      if (isValid) {
        console.log($vm.project);
        try {
          const projID = await $vm.$store.dispatch("projects/create", $vm.project);
          this.$router.push("/projects/" + projID);
        } catch (err) {
          console.error(err);
        }
      }
    },
    initValues() {
      this.$store.dispatch("projects/fetchStatuses");
      this.$store.dispatch("projects/fetchTypes");
      this.$store.dispatch("projects/fetchComplexities");
      this.$store.dispatch("projects/fetchSizes");
    }
  }
};
</script>
