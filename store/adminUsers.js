export const state = () => ({
  inviteStatus: "",
  inviteEmail: ""
});

// export const state = { ...initialState };

export const actions = {
  updateInvateStatus({ commit }, status) {
    commit("setInviteStatus", status);
  },
  sendInviteEmailReq({ commit }, inviteEmail) {
    const sendData = {
      method: "post",
      url: "api/v1/invitations",
      data: {
        email: inviteEmail,
        orgId: "CarterandAnthonyTraders|84445b02-7c63-4df9-b483-449ea43d9ffc"
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
