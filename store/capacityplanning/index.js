export const state = () => ({
  overlay: false,
  errors: [],
  capacityPlanEntries: [],
  capacityMonthlySummary: [],
  capacityPlanTemplate: {
    capacityPlanEntryID: 0,
    projectID: '',
    workPercent: 0
  }
});

export const actions = {
  async removeCapacityEntry({ commit }) {
    await commit('removeCapacityEntry');
  },
  async addCapacityEntry({ commit }) {
    await commit('addCapEntryRow');
  },
  createCapacityPlan({ commit }, capacityPlanObj) {
    const $vm = this;
    return $vm.$axios
      .post('api/v1/capacityplans', capacityPlanObj)
      .then(response => {
        const resp = response.data;
      })
      .catch(error => {
        if (error.response) {
          console.error('1', error.response.data);
          commit('setErrors', [error.response.data]);
          return '';
        } else if (error.request) {
          console.error('2', error.request);
          return '';
        } else {
          console.error('3', error.message);
          return '';
        }
      });
  },
  deleteEntry({ commit }, capEntryID) {
    const $vm = this;
    return $vm.$axios
      .delete('api/v1/capacityplans/' + capEntryID)
      .then(response => {
        const resp = response.data;
        if (response.data != null && response.data.length > 0) {
          return resp;
        } else {
          return [];
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('1', error.response.data);
          commit('setErrors', [error.response.data]);
          return [];
        } else if (error.request) {
          console.error('2', error.request);
          return [];
        } else {
          console.error('3', error);
          return [];
        }
      });
  },
  listResourceDate({ commit }, req) {
    commit('setCapacityPlanEntries', []);
    const $vm = this;
    return $vm.$axios
      .get('api/v1/capacityplans/' + req.resourceID + '/' + req.startDate + '/' + req.endDate)
      .then(response => {
        const resp = response.data;
        if (response.data != null && response.data.length > 0) {
          return resp;
        } else {
          return [];
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('1', error.response.data);
          commit('setErrors', [error.response.data]);
          return [];
        } else if (error.request) {
          console.error('2', error.request);
          return [];
        } else {
          console.error('3', error);
          return [];
        }
      });
  },
  listResourceSummary({ commit }, req) {
    const $vm = this;
    commit('setMonthlySummary', []);
    return $vm.$axios
      .get('api/v1/capacityplans/summaries/' + req.resourceID + '/' + req.startDate + '/' + req.endDate + '')
      .then(response => {
        const resp = response.data;
        if (response.data != null && response.data.length > 0) {
          commit('setMonthlySummary', resp);
          return;
        } else {
          commit('setMonthlySummary', []);
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('1', error.response.data);
          commit('setErrors', [error.response.data]);
          return [];
        } else if (error.request) {
          console.error('2', error.request);
          return [];
        } else {
          console.error('3', error);
          return [];
        }
      });
  }
};

export const mutations = {
  async addCapEntryRow(state) {
    await state.capacityPlanEntries.push(JSON.parse(JSON.stringify(state.capacityPlanTemplate)));
  },
  setMonthlySummary(state, summary) {
    state.capacityMonthlySummary = summary;
  },
  removeCapacityEntry(state) {
    state.capacityPlanEntries.pop();
  },
  setOverlay(state, status) {
    state.overlay = status;
  },
  setCapacityPlanEntries(state, entries) {
    state.capacityPlanEntries = entries;
  }
};

export const getters = {
  getErrors(state) {
    return state.errors;
  },
  getMonthlySummary(state) {
    return state.capacityMonthlySummary;
  },
  getCapacityPlanEntries(state) {
    return state.capacityPlanEntries;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
