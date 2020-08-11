<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-card id="errors-div" v-if="userErrors" class="elevation-12">
          <v-alert v-for="(item, index) in userErrors" v-bind:key="index" show type="error">{{ item.msg }}</v-alert>
        </v-card>

        <v-card elevation="4">
          <v-card-title class="headline">Users</v-card-title>
          <v-card-text>
            <v-skeleton-loader v-if="!users.length" type="list-item-two-line@3" tile></v-skeleton-loader>
            <v-list :two-line="true">
              <v-list-item v-for="user in users" :key="user.id">
                <v-list-item-content>
                  <v-list-item-title v-text="user.firstName + ' ' + user.lastName"></v-list-item-title>
                  <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-select
                      @change="role => updateRole(user.userID, role)"
                      :disabled="user.email === me.email"
                      :loading="roles.length == 0"
                      :items="roles"
                      :value="$toTitleCase(user.profiles[0].role.name)"
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
                  <v-btn :disabled="user.email === me.email" @click="deleteUser(user.userID)" icon>
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
    selectedProfile: "user/getSelectedProfile",
    users: "admin/users/getUsers",
    roles: "admin/users/getRoles",
    userErrors: "admin/users/getErrors",
    me: "user/getMe"
  }),
  mounted() {
    this.list();
    this.listRoles();
  },
  methods: {
    async deleteUser(userID) {
      console.log("before deleteUser");
      await this.$store.dispatch("admin/users/delete", userID);
      console.log("after deleteUser before list");

      this.list();
      console.log("after list");
    },
    updateRole(userID, role) {
      const updateOptions = {
        userID,
        role
      };
      this.$store.dispatch("admin/users/updateRole", updateOptions);

      console.log(userID, role);
    },
    async updateUser(userID) {},
    listRoles() {
      this.$store.dispatch("admin/users/listRoles");
    },
    list() {
      this.$store.dispatch("admin/users/list");
    }
  }
};
</script>
