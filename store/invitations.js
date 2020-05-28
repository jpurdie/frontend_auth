console.log("inside auth of store");

export const state = () => ({
  invitation: { email: "" },
  invitationStatus: "",
  invitations: [],
  errors: []
});

export const actions = {
  register({ commit }, acceptDetails) {
    this.$axios
      .post("api/v1/users/", acceptDetails)
      .then(response => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
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
      const response = await this.$axios.get("api/v1/invitations/" + token);
      commit("setInvitation", response.data);
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
    console.log("Selected Org", orgId);
    this.$axios
      .get("api/v1/invitations?org_id=" + orgId)
      .then(response => {
        commit("setInvitations", response.data);
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
  setInvitation(state, invitation) {
    state.invitation = invitation;
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
