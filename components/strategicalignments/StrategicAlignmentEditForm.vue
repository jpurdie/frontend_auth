<template>
  <v-dialog v-model="display" persistent max-width="750">
    <v-card>
      <v-card-title class="headline">Strategic Alignment</v-card-title>
      <v-card-text>
        <ValidationObserver ref="obsEdit" v-slot="{ invalid }">
          <v-form @keydown.enter="update" @submit.stop.prevent="onSubmit">
            <v-row no-gutters>
              <v-col cols="12">
                <ValidationProvider
                  v-slot="{ errors }"
                  :name="text.label.toLowerCase()"
                  rules="required|min:10|max:100"
                >
                  <v-text-field
                    v-model="alignment.name"
                    :label="text.label"
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
        <v-btn color="primary" @click="toggleDisplay(false)">Back</v-btn>
        <v-btn color="primary" @click="update">Save</v-btn>
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
  props: ['display', 'alignment'],
  data: () => ({
    loader: null,
    text: {
      label: 'Strategic Alignment'
    },
    rules: {
      strategicAlignment: [
        v => !!v || 'Strategic alignment is required',
        v => (v && v.length > 10) || 'Strategic alignment must be at least 10 characters'
      ]
    }
  }),
  methods: {
    initiate() {
      this.$refs.obsEdit.reset();
      this.$refs.obsEdit.untouched = true;
    },
    toggleDisplay(showHide) {
      this.$refs.obsEdit.reset();
      this.$refs.obsEdit.untouched = true;
      this.$emit('update:display', showHide);
    },
    async update() {
      const $vm = this;
      const isValid = await $vm.$refs.obsEdit.validate();

      if (isValid) {
        try {
          await $vm.$store.dispatch('admin/strategicalignments/update', $vm.alignment);
          $vm.$store.dispatch('admin/strategicalignments/list');

          $vm.toggleDisplay(false);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
</script>
