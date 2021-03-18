export const state = () => ({
  overlay: false,
  errors: [],
  dispNavDrawer: true
});

export const actions = {
  updateOverlay({ commit }, overlayStatus) {
    commit('setOverlay', overlayStatus);
  },
  updateErrors({ commit }, errors) {
    commit('setErrors', errors);
  },
  authPing({ commit, rootState }) {
    this.$axios.get('api/v1/authping');
  },
  nonAuthPing() {
    this.$axios.get('api/v1/unauthping');
  },
  toggleNavDrawer({ commit }) {
    commit('toggleNavDrawer');
  },
  updateNavDrawerDisp({ commit }, vis) {
    commit('seteNavDrawerDisp', vis);
  }
};

export const mutations = {
  setOverlay(state, status) {
    state.overlay = status;
  },
  setErrors(state, errors) {
    state.errors = errors;
  },
  toggleNavDrawer(state) {
    console.log('state.nav.navDrawerDashboard from:' + state.dispNavDrawer + ' to: ' + !state.dispNavDrawer);
    state.dispNavDrawer = !state.dispNavDrawer;
  },
  seteNavDrawerDisp(state, vis) {
    console.log('seteNavDrawerDisp', vis);
    state.dispNavDrawer = vis;
  }
};

export const getters = {
  getOverlay(state) {
    return state.overlay;
  },
  getErrors(state) {
    return state.errors;
  },
  dispNavDrawer(state) {
    return state.dispNavDrawer;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
