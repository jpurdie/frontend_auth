export const state = () => ({
  me: {},
  userErrors: [],
  signUpStatus: null,
  selectedProfile: {}
});

// export const state = { ...initialState };

export const actions = {
  fetch({ commit }) {},
  clearErrors({ commit }) {
    commit('resetErrors');
  },

  sendValidationEmail({ commit }) {
    commit('resetErrors');
    return this.$axios
      .post(`api/v1/users/validationemails`)
      .then(function(response) {
        if (response !== undefined && response.status === 200) {
        }
      })
      .catch(function(error) {
        commit('addError', error.response.data);
      });
  },
  selectProfile({ commit, state }, orgID) {
    for (let i = 0; i < state.me.profiles.length; i++) {
      console.log(state.me.profiles[i].organization.id + ' === ' + orgID);
      if (state.me.profiles[i].organization.id === orgID) {
        this.$cookies.set('user.profile', state.me.profiles[i], {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: true
        });
        commit('setSelectedProfile', state.me.profiles[i]);
        return true;
      }
    }
    return false;
  },
  async fetchMe({ commit }) {
    console.log('Inside fetchMe');
    return this.$axios
      .get('api/v1/users/me')
      .then(function(response) {
        if (response !== undefined && response.status === 200) {
          console.log('about to call set me');
          commit('setMe', response.data.user);
          console.log('about to call set me 2');
          return response;
        }
      })
      .catch(function(error) {
        return error.response;
      });
  },
  async register({ commit }, profile) {
    commit('resetErrors');
    return this.$axios
      .post(`api/v1/organizations`, profile)
      .then(function(response) {
        if (response !== undefined && response.status === 200) {
        }
      })
      .catch(function(error) {
        if (error.response !== undefined && error.response.status === 409) {
          commit('addError', error.response.data);
        } else {
          commit('addError', { msg: 'An unknown error has occurred.' });
        }
      });
  }
};

export const mutations = {
  setSignUpStatus(state, data) {
    state.signUpStatus = data;
  },
  setSelectedProfile(state, profileObj) {
    state.selectedProfile = profileObj;
  },
  clearProfiles(state) {
    state.me.profiles = [];
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
  resetErrors(store) {
    store.userErrors = [];
  },
  addError(store, err) {
    store.userErrors.push(err);
  }
};

export const getters = {
  getSignUpStatus(state) {
    return state.signUpStatus;
  },
  getMe(state) {
    return state.me;
  },
  getSelectedProfile(state) {
    if (state.selectedProfile) {
      return state.selectedProfile;
    }
    return undefined;
  },
  getRole(state) {
    if (state.selectedProfile && state.selectedProfile.role) {
      return state.selectedProfile.role.name;
    }
    return undefined;
  },
  getUserErrors(state) {
    return state.userErrors;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
