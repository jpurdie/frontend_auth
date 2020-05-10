// import Vue from 'vue'
// const cookieparser = process.server ? require('cookieparser') : undefined
// import {setAuthToken, resetAuthToken} from '~/util/auth'
// import api from '~/api'

console.log("inside auth of store");

export const state = () => ({
  overlay: false
});

// export const state = { ...initialState };

export const actions = {
  updateOverlay({ commit }, overlayStatus) {
    commit("setOverlay", overlayStatus);
  },
  authPing({ commit, rootState }) {
    const orgId = rootState.userauth.selectedOrg.uuid;
    this.$axios.get("api/ping?org_id=d" + orgId);
  }
};

export const mutations = {
  setOverlay(state, status) {
    state.overlay = status;
  }
};

export const getters = {
  getOverlay(state) {
    return state.overlay;
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
