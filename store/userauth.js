// import Vue from 'vue'
// const cookieparser = process.server ? require('cookieparser') : undefined
// import {setAuthToken, resetAuthToken} from '~/util/auth'
// import api from '~/api'

console.log("inside auth of store");

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
    commit("setErrors", []);
  },
  fetchOrgOptions({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`api/v1/organizations`)
        .then(function(response) {
          if (response !== null && response.status === 200) {
            commit("setUserOrgs", response.data);
            if (response.data.length === 1) {
              commit("setSelectedOrg", response.data[0]);
            }
            resolve(response.data);
          }
        })
        .catch(function(error) {
          if (error.response !== null && error.response.status === 422) {
            console.log(error.response);
            reject(error.response);
          }
        });
    });
  },
  register({ commit }, profile) {
    commit("setErrors", []);
    return this.$axios.post(`api/v1/organizations`, profile).catch(error => {
      console.log("error.response.data", error.response.data);
      if (error.response) {
        commit("setErrors", error.response.data.errors);
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
  setErrors(store, data) {
    store.errors = data;
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
