<template>
  <div>
    <v-form>
      <v-text-field outlined label="First Name" required dense v-model="user.firstName"></v-text-field>
      <v-text-field outlined label="Last Name" required dense v-model="user.lastName"></v-text-field>
      <v-select
        :items="timeZones"
        item-text="text"
        item-value="abbr"
        label="Time Zone"
        outlined
        dense
        v-model="user.timeZone"
      ></v-select>
      <v-text-field outlined label="Email" required dense v-model="user.email"></v-text-field>
      <v-btn depressed color="primary" @click="doSave">
        Save
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapGetters } from 'vuex';

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    ...mapGetters({
      userRole: 'user/getRole',
      me: 'user/fetchMe',
      errors: 'getErrors',
      selectedProfile: 'user/getSelectedProfile'
    })
  },
  data: () => ({
    loader: null,
    timeZones: [],
    user: {}
  }),
  async mounted() {
    this.fetchTimeZones();
    this.$store.dispatch('user/fetchMe');
    this.user = JSON.parse(JSON.stringify(this.$store.state.user.me));
  },
  methods: {
    async doSave() {
      const req = {
        userID: this.user.id,
        body: [
          {
            op: 'replace',
            path: '/firstName',
            value: this.user.firstName
          },
          {
            op: 'replace',
            path: '/lastName',
            value: this.user.lastName
          },
          {
            op: 'replace',
            path: '/timeZone',
            value: this.user.timeZone
          },
          {
            op: 'replace',
            path: '/email',
            value: this.user.email
          }
        ]
      };
      const resp = await this.$store.dispatch('settings/user/updateUserInfo', req);
      this.$store.dispatch('user/fetchMe');
      console.log(resp);
    },
    async fetchTimeZones() {
      this.timeZones = await this.$axios
        .get('http://localhost:3000/timezones.json')
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
