export const state = () => ({
  users: [],
  errors: [],
  roles: []
});

export const actions = {
  updateRole({ commit }, updateOptions) {
    console.log("updateOptions", updateOptions);
    const $vm = this;
    const userID = updateOptions.userID;
    const role = updateOptions.role;

    const options = {
      method: "PATCH",
      url: "api/v1/users/" + userID,
      data: {
        // eslint-disable-next-line object-shorthand
        role: role
      }
    };
    $vm.$axios(options);
  },
  delete({ commit }, userID) {
    const $vm = this;
    return $vm.$axios
      .$delete("api/v1/users/" + userID)
      .then(response => {
        console.log("delete");
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  listRoles({ commit }) {
    const $vm = this;
    return $vm.$axios
      .$get("api/v1/users/roles")
      .then(response => {
        if (response.roles !== null) {
          const roleArr = [];
          for (let i = 0; i < response.roles.length; i++) {
            const tempObj = {};
            tempObj.text = $vm.$toTitleCase(response.roles[i].name);
            tempObj.value = response.roles[i].id;
            roleArr.push(tempObj);
          }
          commit("setRoles", roleArr);
        }
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
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
  setErrors(state, errors) {
    state.errors = errors;
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
