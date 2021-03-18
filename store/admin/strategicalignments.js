export const state = () => ({
  strategicAlignments: [],
  errors: []
});

export const actions = {
  updateBeingEdited({ commit }, alignmentID) {
    commit('updateBeingEdited', alignmentID);
  },
  clearErrors({ commit }) {
    commit('clearErrors');
  },
  delete({ commit }, alignmentID) {
    const sendData = {
      method: 'DELETE',
      url: 'api/v1/strategicalignments/' + alignmentID
    };
    return this.$axios(sendData)
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          commit('deleteAlignment', alignmentID);
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
      url: 'api/v1/strategicalignments/' + sa.id,
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
      url: 'api/v1/strategicalignments',
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
      url: 'api/v1/strategicalignments'
    };
    return this.$axios(sendData)
      .then(response => {
        const resp = response.data;
        const alignmentList = [];
        console.log(response.data);
        if (response.status === 200) {
          resp.forEach((alignment, index) => {
            const tempAlignment = alignment;
            tempAlignment.beingEdited = false;
            alignmentList.push(tempAlignment);
          });

          commit('setAlignments', alignmentList);
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
  updateBeingEdited(state, alignmentID) {
    state.strategicAlignments.forEach(alignment => {
      if (alignment.id === alignmentID) {
        alignment.beingEdited = true;
      } else {
        alignment.beingEdited = false;
      }
    });
  },
  deleteAlignment(state, alignmentToRemove) {
    state.strategicAlignments.splice(
      state.strategicAlignments.findIndex(function(i) {
        return i.id === alignmentToRemove;
      }),
      1
    );
  },
  setAlignments(state, alignments) {
    state.strategicAlignments = alignments;
  }
};

export const getters = {
  getErrors(state) {
    return state.errors;
  },
  getAlignments(state) {
    return state.strategicAlignments;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
