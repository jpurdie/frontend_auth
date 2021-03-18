export const state = () => ({
  sponsorAreas: [],
  errors: []
});

export const actions = {
  updateBeingEdited({ commit }, sponsorAreaID) {
    commit('updateBeingEdited', sponsorAreaID);
  },
  clearErrors({ commit }) {
    commit('clearErrors');
  },
  delete({ commit }, sponsorAreaID) {
    const sendData = {
      method: 'DELETE',
      url: 'api/v1/sponsorareas/' + sponsorAreaID
    };
    return this.$axios(sendData)
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          commit('deleteSponsorArea', sponsorAreaID);
        }
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', []);
          commit('addError', error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  },
  update({ commit }, sa) {
    const sendData = {
      method: 'PUT',
      url: 'api/v1/sponsorareas/' + sa.id,
      data: {
        name: sa.name
      }
    };
    return this.$axios(sendData)
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
        }
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', []);
          commit('addError', error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  },
  create({ commit }, sa) {
    const sendData = {
      method: 'post',
      url: 'api/v1/sponsorareas',
      data: {
        name: sa
      }
    };
    return this.$axios(sendData)
      .then(response => {
        console.log(response.data);
        if (response.status === 201) {
        }
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', []);
          commit('addError', error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  },
  list({ commit }) {
    const sendData = {
      method: 'get',
      url: 'api/v1/sponsorareas'
    };
    return this.$axios(sendData)
      .then(response => {
        const resp = response.data;
        const saList = [];
        console.log(response.data);
        if (response.status === 200) {
          resp.forEach((sa, index) => {
            const tempSA = sa;
            tempSA.beingEdited = false;
            saList.push(tempSA);
          });

          commit('setSponsorAreas', saList);
        }
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', []);
          commit('addError', error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }
};

export const mutations = {
  setErrors(state) {
    state.errors = [];
  },
  addError(state, error) {
    state.errors.push(error);
  },
  clearErrors(state) {
    state.errors = [];
  },
  updateBeingEdited(state, sponsorAreaID) {
    state.sponsorAreas.forEach(sa => {
      if (sa.id === sponsorAreaID) {
        sa.beingEdited = true;
      } else {
        sa.beingEdited = false;
      }
    });
  },
  deleteSponsorArea(state, saToRemove) {
    state.sponsorAreas.splice(
      state.sponsorAreas.findIndex(function(i) {
        return i.id === saToRemove;
      }),
      1
    );
  },
  setSponsorAreas(state, sponsorAreas) {
    state.sponsorAreas = sponsorAreas;
  }
};

export const getters = {
  getErrors(state) {
    return state.errors;
  },
  getSponsorAreas(state) {
    return state.sponsorAreas;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
