export const state = () => ({
  userErrors: []
});

// export const state = { ...initialState };

export const actions = {
  requestPasswordReset({ commit }, email) {
    commit('resetErrors');

    return this.$axios
      .post(`api/v1/users/passwords/` + email)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.error('error', error);
        commit('addError', error.response.data);
      });
  },
  updateUserInfo({ commit }, requestObj) {
    commit('resetErrors');
    return this.$axios
      .patch(`api/v1/users/` + requestObj.userID, requestObj.body)
      .then(function(response) {
        console.log('resp', response);

        if (response !== undefined && response.status === 200) {
        }
      })
      .catch(function(error) {
        console.error('error', error);
        commit('addError', error.response.data);
      });
  }
};

export const mutations = {
  resetErrors(store) {
    store.userErrors = [];
  }
};

export const getters = {
  getUserErrors(state) {
    return state.userErrors;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
