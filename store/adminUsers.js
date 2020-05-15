export const state = () => ({
  inviteStatus: "",
  inviteEmail: ""
});

// export const state = { ...initialState };

export const actions = {
  updateInvateStatus({ commit }, status) {
    commit("setInviteStatus", status);
  },
  sendInviteEmailReq({ commit, rootState }, inviteEmail) {
    const orgId = rootState.userauth.selectedOrg.uuid;

    const sendData = {
      method: "post",
      url: "api/v1/invitations?org_id=" + orgId,
      data: {
        email: inviteEmail
      }
    };
    console.log(sendData);

    this.$axios(sendData);
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
