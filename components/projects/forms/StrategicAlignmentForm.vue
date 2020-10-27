<template>
  <v-form ref="form" v-model="valid" @keydown.enter="create" @submit.stop.prevent="onSubmit" :lazy-validation="true">
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          :rules="rules.strategicAlignment"
          v-model="strategicAlignment"
          append-outer-icon="mdi-content-save"
          @click:append-outer="create"
          label="Strategic Alignment"
          autocomplete="off"
          required
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    loader: null,
    strategicAlignment: "",
    valid: undefined,
    rules: {
      strategicAlignment: [
        v => !!v || "Strategic alignment is required",
        v => (v && v.length > 10) || "Strategic alignment must be at least 10 characters"
      ]
    }
  }),
  methods: {
    async create() {
      const $vm = this;
      const isValid = await $vm.$refs.form.validate();
      if (isValid) {
        console.log($vm.strategicAlignment);
        try {
          //  const projID = await $vm.$store.dispatch("projects/create", $vm.project);
          //  this.$router.push("/projects/" + projID);
        } catch (err) {
          //    console.error(err);
        }
      }
    }
  }
};
</script>
