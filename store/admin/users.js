export const state = () => ({
  users: undefined,
  errors: [],
  roles: []
});

export const actions = {
  clearErrors({ commit }) {
    commit('setErrors', []);
  },
  updateRole({ commit }, updateOptions) {
    commit('setErrors', []);
    console.log('updateOptions', updateOptions);
    const $vm = this;

    const options = {
      method: 'PATCH',
      url: 'api/v1/users/' + updateOptions.userID,
      data: updateOptions.payload
    };
    $vm
      .$axios(options)
      .then(response => {})
      .catch(error => {
        if (error.response && error.response.data) {
          commit('setErrors', [error.response.data.error]);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  delete({ commit }, userID) {
    commit('setErrors', []);
    const $vm = this;
    return $vm.$axios
      .$delete('api/v1/users/' + userID)
      .then(response => {
        console.log('delete');
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', error.response.data);
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
    commit('setErrors', []);
    const $vm = this;
    return $vm.$axios
      .get('api/v1/users/roles')
      .then(response => {
        const rolesResp = response.data;
        console.log('rolesResp', rolesResp);
        if (response.data !== null) {
          const roleArr = [];
          console.log('rolesResp', rolesResp);
          for (let i = 0; i < rolesResp.length; i++) {
            console.log('response.roles[i].name', rolesResp[i].name);
            const tempObj = {};
            tempObj.text = $vm.$toTitleCase(rolesResp[i].name);
            tempObj.value = rolesResp[i].id;
            roleArr.push(tempObj);
          }
          commit('setRoles', roleArr);
        }
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', error.response.data);
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
    commit('setErrors', []);
    // commit("setRegisterStatus", "");

    return this.$axios
      .get('api/v1/users')
      .then(response => {
        if (response.data !== null) {
          commit('setUsers', response.data);
        }
      })
      .catch(error => {
        // commit("setRegisterStatus", "fail");
        // Error
        if (error.response) {
          commit('setErrors', [error.response.data]);
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
  },
  getErrors(state) {
    return state.errors;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
