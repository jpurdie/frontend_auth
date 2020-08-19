export const state = () => ({
  invitation: { email: "" },
  invitationStatus: "",
  invitations: undefined,
  errors: [],
  registerStatus: ""
});

export const actions = {
  sendInviteEmailReq({ commit, rootState }, inviteEmail) {
    commit("setInviteStatus", "pending");
    const sendData = {
      method: "post",
      url: "api/v1/invitations",
      data: {
        email: inviteEmail
      }
    };
    console.log(sendData);

    return this.$axios(sendData)
      .then(response => {
        if (response.status === 201) {
          commit("setInviteStatus", "success");
        }
      })
      .catch(error => {
        commit("setInviteStatus", "fail");
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
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  },
  resendInvite({ commit, rootState }, inviteEmail) {
    this.$axios
      .post("api/v1/invitations", {
        email: inviteEmail
      })
      .then(response => {
        // fdsaf
      })
      .catch(error => {
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
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  },
  inactivateInvite({ commit, rootState }, email) {
    this.$axios
      .delete("api/v1/invitations/" + email)
      .then(response => {
        commit("removeFromInvitations", email);
      })
      .catch(error => {
        // Error 😨
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  },
  fetchAll({ commit, rootState }) {
    this.$axios
      .get("api/v1/invitations")
      .then(response => {
        if (response.data !== undefined && response.data !== null) {
          commit("setInvitations", response.data);
        } else {
          commit("setInvitations", []);
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status >= 400 && error.response.status < 500) {
            commit("setErrors", error.response.data);
          } else {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
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
