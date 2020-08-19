export const state = () => ({
  overlay: false,
  errors: []
});

export const actions = {
  updateOverlay({ commit }, overlayStatus) {
    commit("setOverlay", overlayStatus);
  },
  updateErrors({ commit }, errors) {
    commit("setErrors", errors);
  },
  authPing({ commit, rootState }) {
    this.$axios.get("api/v1/authping");
  },
  nonAuthPing() {
    this.$axios.get("api/v1/unauthping");
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
