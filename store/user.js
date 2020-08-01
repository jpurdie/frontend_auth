// import Vue from 'vue'
// const cookieparser = process.server ? require('cookieparser') : undefined
// import {setAuthToken, resetAuthToken} from '~/util/auth'
// import api from '~/api'

console.log("inside userauth.js vuex");

export const state = () => ({
  orgs: [],
  errors: [],
  signUpStatus: null
});

// export const state = { ...initialState };

export const actions = {
  fetch({ commit }) {},
  clearErrors({ commit }) {
    commit("clearErrors");
  },
  fetchUser({ commit }) {
    const $vm = this;
    return new Promise((resolve, reject) => {
      const userExternalID = $vm.$auth.$state.user.sub;
      this.$axios
        .get(`api/v1/users/` + userExternalID)
        .then(function(response) {
          if (response !== null && response.status === 200) {
            commit("setUser", response.data.user);
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
  fetchOrgOptions({ commit }) {
    const $vm = this;

    return new Promise((resolve, reject) => {
      const userExternalID = $vm.$auth.$state.user.sub;

      this.$axios
        .get(`api/v1/users/` + userExternalID + `/organizations`)
        .then(function(response) {
          if (response !== null && response.status === 200) {
            const orgs = response.data.orgs;
            orgs[0].selected = true;
            commit("setOrgs", orgs);
            // if (response.data.orgs.length === 1) {
            //   commit("setSelectedOrg", response.data.orgs[0].selected =);
            // }
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
  setOrgs(state, data) {
    state.orgs = data;
  },
  setUser(store, data) {
    store.user = data;
  },
  reset_user(store) {
    store.user = null;
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
  getSelectedOrg(state) {
    for (let i = 0; i < state.orgs.length; i++) {
      if (state.orgs[i].selected === true) {
        return state.orgs[i];
      }
    }
    return undefined;
  },
  getRole(state) {
    for (let i = 0; i < state.orgs.length; i++) {
      if (state.orgs[i].selected === true) {
        return state.orgs[i].role.name;
      }
    }
    return undefined;
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
