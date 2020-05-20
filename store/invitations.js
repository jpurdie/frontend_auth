console.log("inside auth of store");

export const state = () => ({
  invitation: {},
  invitationStatus: ""
});

export const actions = {
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
