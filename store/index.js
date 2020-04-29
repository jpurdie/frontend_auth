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
  authPing({ commit }) {
    this.$axios.get("api/ping?org_id=aa6ed69d-7516-48b2-a84c-cb67f4d20866");
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
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
