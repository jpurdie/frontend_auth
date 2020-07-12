// import Vue from 'vue'
// const cookieparser = process.server ? require('cookieparser') : undefined
// import {setAuthToken, resetAuthToken} from '~/util/auth'
// import api from '~/api'

console.log("inside userauth.js vuex");

export const state = () => ({
  userOrgs: [],
  selectedOrg: "",
  errors: [],
  signUpStatus: null
});

// export const state = { ...initialState };

export const actions = {
  fetch({ commit }) {},
  refresh({ commit }) {
    commit("clearErrors");
  },
  fetchOrgOptions({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`api/v1/organizations`)
        .then(function(response) {
          if (response !== null && response.status === 200) {
            commit("setUserOrgs", response.data.orgs);
            if (response.data.orgs.length === 1) {
              commit("setSelectedOrg", response.data.orgs[0]);
            }
            resolve(response.data);
          }
        })
        .catch(function(error) {
          if (error.response !== null && error.response.status === 422) {
            reject(error.response);
          }
          if (error.response !== null && error.response.status === 409) {
            reject(error.response);
          }
        });
    });
  },
  async register({ commit }, profile) {
    commit("clearErrors");
    await this.$axios
      .post(`api/v1/auth/organizations`, profile)
      .catch(error => {
        if (error.response && error.response.data) {
          commit("addError", error.response.data.error);
        }
      });
  }
};

export const mutations = {
  setSignUpStatus(state, data) {
    state.signUpStatus = data;
  },
  setUserOrgs(state, data) {
    state.userOrgs = data;
  },
  setSelectedOrg(state, selectedOrg) {
    state.selectedOrg = selectedOrg;
  },
  set_user(store, data) {
    store.user = data;
  },
  reset_user(store) {
    store.user = null;
  },
  setOrg(store, data) {
    store.org = data;
  },
  clearErrors(store) {
    store.errors = [];
  },
  addError(store, err) {
    store.errors.push(err);
  }
};

export const getters = {
  getSignUpStatus(state) {
    return state.signUpStatus;
  },
  getOrg(state) {
    return state.org;
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
