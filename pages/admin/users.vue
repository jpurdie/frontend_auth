<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card elevation="4">
          <v-card-title class="headline">Users</v-card-title>
          <v-card-text>
            <v-list :two-line="true">
              <v-list-item v-for="user in users" :key="user.id">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="user.firstName + ' ' + user.lastName"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="user.email"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-select
                      @change="role => updateRole(user.id, role)"
                      :loading="roles.length == 0"
                      :items="roles"
                      :value="$toTitleCase(user.role.name)"
                      label="Role"
                    ></v-select>
                  </v-list-item-title>
                </v-list-item-content>
                <v-spacer></v-spacer>

                <!-- <v-list-item-action>
                  <v-btn @click="updateUser(user.email)" icon>
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                </v-list-item-action> -->
                <v-list-item-action>
                  <v-btn @click="inactivateUser(user.email)" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
    users: "admin/users/getUsers",
    roles: "admin/users/getRoles"
  }),
  mounted() {
    this.list();
    this.listRoles();
  },
  methods: {
    inactivateUser() {
      alert();
    },
    updateRole(userID, role) {
      console.log("userID", userID);
      console.log("role", role);
      const updateOptions = {
        userID,
        role
      };
      this.$store.dispatch("admin/users/updateRole", updateOptions);

      console.log(userID, role);
    },
    async updateUser(id) {},
    listRoles() {
      this.$store.dispatch("admin/users/listRoles");
    },
    list() {
      this.$store.dispatch("admin/users/list");
    }
  }
};
</script>
