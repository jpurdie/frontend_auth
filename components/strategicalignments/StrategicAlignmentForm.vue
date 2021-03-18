<template>
  <v-dialog v-model="display" persistent max-width="750">
    <v-card>
      <v-card-title class="headline">Strategic Alignment</v-card-title>
      <v-card-text>
        <ValidationObserver ref="obs" v-slot="{ invalid, validated, handleSubmit, validate }">
          <v-form @keydown.enter="create" @submit.stop.prevent="create">
            <v-row no-gutters>
              <v-col cols="12">
                <ValidationProvider
                  v-slot="{ errors, valid }"
                  name="strategic alignment"
                  rules="required|min:10|max:100"
                >
                  <v-text-field
                    v-model="strategicAlignment"
                    :success="valid"
                    label="Strategic Alignment"
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
    strategicAlignment: '',
    rules: {
      strategicAlignment: [
        v => !!v || 'Strategic alignment is required',
        v => (v && v.length > 10) || 'Strategic alignment must be at least 10 characters'
      ]
    }
  }),
  methods: {
    toggleDisplay(showHide) {
      this.strategicAlignment = '';
      this.$refs.obs.reset();
      this.$refs.obs.untouched = true;
      this.$emit('update:display', showHide);
    },
    async create() {
      const $vm = this;
      const isValid = await $vm.$refs.obs.validate();
      if (isValid) {
        console.log($vm.strategicAlignment);
        try {
          await $vm.$store.dispatch('admin/strategicalignments/create', $vm.strategicAlignment);
          this.$store.dispatch('admin/strategicalignments/list');
          $vm.toggleDisplay(false);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
</script>
