// import Vue from 'vue'
// const cookieparser = process.server ? require('cookieparser') : undefined
// import {setAuthToken, resetAuthToken} from '~/util/auth'
// import api from '~/api'

console.log("inside auth of store");

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
    const orgId = rootState.userauth.selectedOrg.uuid;
    this.$axios.get("api/ping?org_id=" + orgId);
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
  },
  getSelectedOrg(state, getters, rootState) {
    return rootState.userauth.selectedOrg;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
