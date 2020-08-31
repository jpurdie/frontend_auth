export const state = () => ({
  projects: undefined,
  projectStatus: undefined,
  errors: undefined
});

export const actions = {};

export const mutations = {
  setInviteStatus(state, status) {
    state.invitationStatus = status;
  }
};

export const getters = {
  getInvitation(state) {
    return state.invitation;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
