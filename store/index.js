// import Vue from 'vue'
// const cookieparser = process.server ? require('cookieparser') : undefined
// import {setAuthToken, resetAuthToken} from '~/util/auth'
// import api from '~/api'

console.log("inside index.js vuex");

export const state = () => ({
  overlay: false,
  errors: []
});

// export const state = { ...initialState };

export const actions = {
  updateOverlay({ commit }, overlayStatus) {
    commit("setOverlay", overlayStatus);
  },
  updateErrors({ commit }, errors) {
    commit("setErrors", errors);
  },
  authPing({ commit, rootState }) {
    this.$axios.get("api/v1/ping");
  },
  nonAuthPing() {
    this.$axios.get("public/ping");
  }
};

export const mutations = {
  setOverlay(state, status) {
    state.overlay = status;
  },
  setErrors(state, errors) {
    state.errors = errors;
  }
};

export const getters = {
  getOverlay(state) {
    return state.overlay;
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
