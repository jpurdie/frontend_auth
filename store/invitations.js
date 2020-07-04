export const state = () => ({
  invitation: { email: "" },
  invitationStatus: "",
  invitations: [],
  errors: [],
  registerStatus: ""
});

export const actions = {
  sendInviteEmailReq({ commit, rootState }, inviteEmail) {
    const orgId = rootState.userauth.selectedOrg.uuid;
    commit("setInviteStatus", "pending");
    const sendData = {
      method: "post",
      url: "api/v1/invitations?org_id=" + orgId,
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

  register({ commit }, userDetails) {
    commit("setRegisterStatus", "");

    return this.$axios
      .post("api/v1/auth/invitations/users", userDetails)
      .then(response => {
        console.log("response", response);
        commit("setRegisterStatus", "success");
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
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
  resendInvite({ commit, rootState }, inviteEmail) {
    const orgId = rootState.userauth.selectedOrg.uuid;

    this.$axios
      .post("api/v1/invitations?org_id=" + orgId, {
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
    const orgId = rootState.userauth.selectedOrg.uuid;

    this.$axios
      .delete("api/v1/invitations/" + email + "?org_id=" + orgId)
      .then(response => {
        commit("removeFromInvitations", email);
      })
      .catch(error => {
        // Error 😨
        if (error.response) {
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
  async checkToken({ commit }, token) {
    console.log("checkToken()");

    try {
      const response = await this.$axios.get(
        "api/v1/auth/invitations/" + token
      );
      if (response.data != null && response.data.invitation != null) {
        commit("setInvitation", response.data.invitation);
      }
    } catch (error) {
      // Error 😨

      if (error.response) {
        // this is a "known" error type and handle it with the UI
        if (error.response.status >= 400 && error.response.status < 500) {
          commit("setErrors", error.response.data);
        }
      }
    }
  },
  fetchAll({ commit, rootState }) {
    const orgId = rootState.userauth.selectedOrg.uuid;
    console.log("selected org", orgId);
    this.$axios
      .get("api/v1/invitations?org_id=" + orgId)
      .then(response => {
        if (response.data !== null && response.data.invitations !== null) {
          commit("setInvitations", response.data.invitations);
        } else {
          commit("setInvitations", []);
        }
      })
      .catch(error => {
        // Error 😨

        if (error.response) {
          // this is a "known" error type and handle it with the UI
          if (error.response.status >= 400 && error.response.status < 500) {
            commit("setErrors", error.response.data);
          } else {
            // this is a 500 error. need to build an interceptor for these.

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
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
