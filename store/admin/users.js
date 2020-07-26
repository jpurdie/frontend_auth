export const state = () => ({
  users: [],
  errors: [],
  roles: []
});

export const actions = {
  listRoles({ commit }) {
    const $vm = this;
    return $vm.$axios
      .$get("api/v1/users/roles")
      .then(response => {
        if (response.roles !== null) {
          const roleArr = [];
          for (let i = 0; i < response.roles.length; i++) {
            console.log(i + " " + response.roles[i]);
            const tempObj = {};
            tempObj.text = $vm.$toTitleCase(response.roles[i].name);
            roleArr.push(tempObj);
          }
          commit("setRoles", roleArr);
        }
      })
      .catch(error => {
        // commit("setRegisterStatus", "fail");
        // Error
        if (error.response) {
          commit("setErrors", error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          // Something happened in setting up the request and triggered an Error
          console.error(error.message);
        }
      });
  },
  list({ commit }) {
    // commit("setRegisterStatus", "");

    return this.$axios
      .$get("api/v1/users")
      .then(response => {
        if (response.users !== null) {
          commit("setUsers", response.users);
        }
      })
      .catch(error => {
        // commit("setRegisterStatus", "fail");
        // Error
        if (error.response) {
          commit("setErrors", error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          // Something happened in setting up the request and triggered an Error
          console.error(error.message);
        }
      });
  }
};

export const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setErrors(state, users) {
    state.users = users;
  },
  setRoles(state, roles) {
    state.roles = roles;
  }
};

export const getters = {
  getUsers(state) {
    return state.users;
  },
  getRoles(state) {
    return state.roles;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
