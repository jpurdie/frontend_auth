<template>
  <v-dialog v-model="display" persistent max-width="750">
    <v-card>
      <v-card-title class="headline">Sponsor Area</v-card-title>
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
                    v-model="sponsorArea.name"
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
  props: ['display', 'sponsorArea'],
  data: () => ({
    loader: null,
    text: {
      label: 'Sponsor Area'
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
          await $vm.$store.dispatch('admin/sponsorareas/update', $vm.sponsorArea);
          $vm.$store.dispatch('admin/sponsorareas/list');

          $vm.toggleDisplay(false);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
};
</script>
