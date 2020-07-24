export const state = () => ({
  user: [],
  errors: []
});

export const actions = {
  list({ commit }, userDetails) {
    // commit("setRegisterStatus", "");

    return this.$axios
      .get("api/v1/users")
      .then(response => {
        console.log("response", response);
        // commit("setRegisterStatus", "success");
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
  }
};

export const getters = {
  getUsers(state) {
    return state.users;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
