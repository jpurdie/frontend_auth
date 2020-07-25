<template>
  <v-container>
    <v-layout row>
      <v-flex md6>
        <v-card>
          <v-card-title class="headline">Users</v-card-title>
          <v-card-text>
            <v-list dense flat>
              <v-list-item v-for="user in users" :key="user.id">
                <v-list-item-content>
                  <v-list-item-title>{{ user.email }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $toTitleCase(user.role.name)
                  }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn @click="inactivateUser(user.email)" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "dashboard-layout",
  components: {},
  data() {
    return {};
  },
  computed: mapGetters({
    selectedOrg: "user/getSelectedOrg",
    users: "admin/users/getUsers"
  }),
  mounted() {
    this.list();
  },
  methods: {
    inactivateUser() {
      alert();
    },
    list() {
      this.$store.dispatch("admin/users/list");
    }
  }
};
</script>
