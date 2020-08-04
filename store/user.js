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
    commit("clearErrors");
    return new Promise((resolve, reject) => {
      for (let i = 0; i < state.me.profiles.length; i++) {
        // checking to make sure the profile exists
        if (state.me.profiles[i].profileID === profileID) {
          commit("setSelectedProfile", profileID);
          resolve();
          break;
        }
      }
      commit("addError", { msg: "Invalid organization selection" });
      reject(new Error("Invalid profile"));
    });
  },
  fetchMe({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get("api/v1/users/me")
        .then(function(response) {
          if (response !== null && response.status === 200) {
            // const profiles = response.data.user.profiles;
            // profiles[0].selected = true;

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
  fetchOrgOptions({ commit }) {
    const $vm = this;

    return new Promise((resolve, reject) => {
      const userExternalID = $vm.$auth.$state.user.sub;

      this.$axios
        .get(`api/v1/users/` + userExternalID + `/organizations`)
        .then(function(response) {
          if (response !== null && response.status === 200) {
            const orgs = response.data.orgs;
            orgs[0].selected = true;
            commit("setOrgs", orgs);
            // if (response.data.orgs.length === 1) {
            //   commit("setSelectedOrg", response.data.orgs[0].selected =);
            // }
            resolve(response.data);
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
  clearSelectedProfile(state) {
    for (let i = 0; i < state.me.profiles.length; i++) {
      state.me.profiles[i].selected = undefined;
    }
  },
  setSelectedProfile(state, profileID) {
    for (let i = 0; i < state.me.profiles.length; i++) {
      if (state.me.profiles[i].profileID === profileID) {
        state.me.profiles[i].selected = true;
      } else {
        state.me.profiles[i].selected = undefined;
      }
    }
  },
  setOrgs(state, data) {
    state.orgs = data;
  },
  setMe(store, data) {
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
    return state.me;
  },
  getSelectedOrg(state) {
    for (let i = 0; i < state.me.profiles.length; i++) {
      if (state.me.profiles[i].selected === true) {
        return state.me.profiles[i].organization;
      }
    }
    return undefined;
  },
  getRole(state) {
    for (let i = 0; i < state.me.profiles.length; i++) {
      if (state.me.profiles[i].selected === true) {
        return state.me.profiles[i].role.name;
      }
    }
    return undefined;
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
