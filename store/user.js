export const state = () => ({
  me: {},
  errors: [],
  signUpStatus: null
});

// export const state = { ...initialState };

export const actions = {
  fetch({ commit }) {},
  clearErrors({ commit }) {
    commit("clearErrors");
  },
  selectProfile({ commit, state }, profileID) {
    console.log("Inside selectProfile " + profileID);
    for (let i = 0; i < state.me.profiles.length; i++) {
      if (state.me.profiles[i].profileID === profileID) {
        console.log("calling setSelectedProfile");
        commit("setSelectedProfile", profileID);
        return true;
      }
    }
    return false;
  },
  fetchMe({ commit }) {
    console.log("Inside fetchMe");

    return new Promise((resolve, reject) => {
      this.$axios
        .get("api/v1/users/me")
        .then(function(response) {
          if (response !== null && response.status === 200) {
            // const profiles = response.data.user.profiles;
            // profiles[0].selected = true;
            console.log("about to call setMe");

            commit("setMe", response.data.user);
            resolve();
          }
        })
        .catch(function(error) {
          if (error.response !== null && error.response.status === 422) {
            reject(error.response);
          }
          if (error.response !== null && error.response.status === 409) {
            reject(error.response);
          }
        });
    });
  },
  async register({ commit }, profile) {
    commit("clearErrors");
    await this.$axios
      .post(`api/v1/auth/organizations`, profile)
      .catch(error => {
        if (error.response && error.response.data) {
          commit("addError", error.response.data.error);
        }
      });
  }
};

export const mutations = {
  setSignUpStatus(state, data) {
    state.signUpStatus = data;
  },
  setSelectedProfile(state, profileID) {
    console.log("Inside setSelectedProfile");
    for (let i = 0; i < state.me.profiles.length; i++) {
      if (state.me.profiles[i].profileID === profileID) {
        state.me.profiles[i].selected = true;
      }
    }
  },
  setOrgs(state, data) {
    state.orgs = data;
  },
  setMe(store, data) {
    console.log("Inside setMe");
    store.me = data;
  },
  reset_user(store) {
    store.user = null;
  },
  clearErrors(store) {
    store.errors = [];
  },
  addError(store, err) {
    store.errors.push(err);
  }
};

export const getters = {
  getSignUpStatus(state) {
    return state.signUpStatus;
  },
  getMe(state) {
    console.log("Inside getMe");
    return state.me;
  },
  getSelectedProfile(state) {
    if (state.me !== undefined && state.me.profiles !== undefined) {
      const selectedProfile = state.me.profiles.filter(e => e.selected);
      if (selectedProfile.length > 0) {
        return selectedProfile[0];
      } else {
        return undefined;
      }
    }
  },
  getRole(state) {
    if (state.me !== undefined && state.me.profiles !== undefined) {
      const selectedProfile = state.me.profiles.filter(e => e.selected);
      if (selectedProfile.length > 0) {
        return selectedProfile[0].role.name;
      } else {
        return undefined;
      }
    }
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
