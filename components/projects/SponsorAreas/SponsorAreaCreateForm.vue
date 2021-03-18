<template>
  <v-dialog v-model="display" persistent max-width="750">
    <v-card>
      <v-card-title class="headline">Sponsor By Area</v-card-title>
      <v-card-text>
        <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit, validate }">
          <v-form @keydown.enter="create" @submit.stop.prevent="create">
            <v-row no-gutters>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors, valid }" name="Sponsored By Area" rules="required|min:10|max:100">
                  <v-text-field
                    v-model="sponsoredArea"
                    :success="valid"
                    label="Sponsored By "
                    autocomplete="off"
                    :error-messages="errors"
                    required
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="toggleDisplay(false)">Close</v-btn>
        <v-btn color="primary" @click="create">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: ['display'],
  data: () => ({
    loader: null,
    sponsoredArea: '',
    rules: {}
  }),
  methods: {
    toggleDisplay(showHide) {
      this.sponsoredArea = '';
      this.$refs.obs.reset();
      this.$refs.obs.untouched = true;
      this.$emit('update:display', showHide);
    },
    async create() {
      const $vm = this;
      const isValid = await $vm.$refs.obs.validate();
      if (isValid) {
        console.log($vm.sponsoredArea);
        try {
          await $vm.$store.dispatch('admin/sponsorareas/create', $vm.sponsoredArea);
          this.$store.dispatch('admin/sponsorareas/list');
          $vm.toggleDisplay(false);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
</script>
