export const state = () => ({
  invitation: { email: "" },
  invitationStatus: "",
  invitations: [],
  errors: [],
  registerStatus: ""
});

export const actions = {
  register({ commit }, userDetails) {
    commit("setRegisterStatus", "");

    return this.$axios
      .post("api/v1/auth/invitations/users", userDetails)
      .then(response => {
        console.log("response", response);
        commit("setRegisterStatus", "success");
      })
      .catch(error => {
        commit("setRegisterStatus", "fail");
        // Error 😨
        if (error.response) {
          commit("setErrors", error.response.data);

          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return false;
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
          return false;
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  },
  async checkToken({ commit }, token) {
    try {
      const response = await this.$axios.get(
        `api/v1/auth/invitations/${token}`
      );
      if (response.data != null && response.data.invitation != null) {
        commit("setInvitation", response.data.invitation);
      }
    } catch (error) {
      // Error 😨
      console.log("invitations checkToken() error", error);

      if (error.response) {
        // this is a "known" error type and handle it with the UI
        if (error.response.status >= 400 && error.response.status < 500) {
          commit("setErrors", error.response.data);
        }
      }
    }
  }
};

export const mutations = {
  setInviteStatus(state, status) {
    state.invitationStatus = status;
  },
  setInvitation(state, invitation) {
    state.invitation = invitation;
  },
  setRegisterStatus(state, registerStatus) {
    state.registerStatus = registerStatus;
  },
  setErrors(state, errors) {
    state.errors = errors;
  },
  setInvitations(state, invitations) {
    state.invitations = invitations;
  },
  removeFromInvitations(state, email) {
    state.invitations = state.invitations.filter(obj => obj.email !== email);
  }
};

export const getters = {
  getInvitation(state) {
    return state.invitation;
  },
  getInvitations(state) {
    return state.invitations;
  },
  getInviteStatus(state) {
    return state.invitationStatus;
  },
  getErrors(state) {
    return state.errors;
  },
  getRegisterStatus(state) {
    return state.registerStatus;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
