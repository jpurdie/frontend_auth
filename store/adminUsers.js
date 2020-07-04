export const state = () => ({
  inviteStatus: "",
  inviteEmail: "",
  errors: []
});

// export const state = { ...initialState };

export const actions = {
  updateInvateStatus({ commit }, status) {
    commit("setInviteStatus", status);
  }
};

export const mutations = {
  setInviteStatus(state, status) {
    state.inviteStatus = status;
  }
};

export const getters = {
  getInviteStatus(state) {
    return state.inviteStatus;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
