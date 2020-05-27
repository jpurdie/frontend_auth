console.log("inside auth of store");

export const state = () => ({
  invitation: {},
  invitationStatus: "",
  invitations: []
});

export const actions = {
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
  checkToken({ commit }, token) {
    this.$axios
      .get("api/v1/invitations/" + token)
      .then(response => {
        commit("setInvitation", response.data);
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
  }
};

export const mutations = {
  setInvitation(state, invitation) {
    state.invitation = invitation;
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
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
