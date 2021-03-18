const projTemplate = {
  id: undefined,
  name: undefined,
  descr: undefined,
  rgt: undefined,
  status: { name: undefined, id: undefined },
  type: { name: undefined, id: undefined },
  complexity: { name: undefined, id: undefined },
  size: { name: undefined, id: undefined },
  strategicAlignments: undefined,
  sponsorAreas: []
};

export const state = () => ({
  projectBeingViewed: projTemplate,
  projects: [],
  statuses: [],
  types: [],
  complexities: [],
  sizes: [],
  errors: [],
  strategicAlignments: []
});

export const actions = {
  clearErrors({ commit }) {
    commit('clearErrors');
  },
  updateProject({ commit }, req) {
    commit('clearErrors');
    const $vm = this;
    return $vm.$axios
      .patch('api/v1/projects/' + req.projectID, req.body)
      .then(response => {
        const resp = response.data;
        console.log('resp', resp);
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  fetchProject({ commit }, id) {
    commit('setProjectBeingViewed', projTemplate);
    commit('clearErrors');
    const $vm = this;
    return $vm.$axios
      .get('api/v1/projects/' + id)
      .then(response => {
        const proj = response.data;

        if (proj.strategicAlignments != null && proj.strategicAlignments.length > 0) {
          let newSAs = [];
          for (let i = 0; i < proj.strategicAlignments.length; i++) {
            newSAs.push(proj.strategicAlignments[i].id);
          }
          proj.strategicAlignments = newSAs;
        }

        if (proj.sponsorAreas != null && proj.sponsorAreas.length > 0) {
          let newSAs = [];
          for (let i = 0; i < proj.sponsorAreas.length; i++) {
            newSAs.push(proj.sponsorAreas[i].id);
          }
          proj.sponsorAreas = newSAs;
        }

        commit('setProjectBeingViewed', proj);
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  create({ commit }, project) {
    commit('clearErrors');
    const $vm = this;
    let projReq = JSON.parse(JSON.stringify(project));

    //formatting to accepted json
    if (project.strategicAlignments.length > 0) {
      let formattedSAs = [];
      project.strategicAlignments.forEach(el => {
        formattedSAs.push({ id: el });
      });
      projReq.strategicAlignments = formattedSAs;
    }
    let sponsorArea = [];

    if (project.sponsorAreas.length > 0) {
      let formattedSAs = [];
      project.sponsorAreas.forEach(el => {
        formattedSAs.push({ id: el });
      });
      projReq.sponsorAreas = formattedSAs;
    }

    return $vm.$axios
      .post('api/v1/projects', projReq)
      .then(response => {
        const resp = response.data;
        if (resp.id !== null) {
          return resp.id;
        }
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
  edit({ commit }, project) {
    commit('clearErrors');
    const $vm = this;
    return $vm.$axios
      .post('api/v1/projects', project)
      .then(response => {
        const resp = response.data;
        if (resp.id !== null) {
          return resp.id;
        }
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  fetchSizes({ commit }) {
    commit('clearSizes');
    const $vm = this;
    return $vm.$axios
      .get('api/v1/projects/sizes')
      .then(response => {
        const resp = response.data;
        const sizesUpdated = [];
        if (resp !== null) {
          for (let i = 0; i < resp.length; i++) {
            const obj = { text: resp[i].name, value: resp[i].id };
            sizesUpdated.push(obj);
          }
          commit('setSizes', sizesUpdated);
        }
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  listProjects({ commit }, filterArr = []) {
    commit('clearProjects');
    const $vm = this;

    let queryString = '';
    for (let i = 0; i < filterArr.length; i++) {
      queryString += filterArr;
      if (i !== filterArr.length - 1) {
        queryString += '&';
      }
    }

    return $vm.$axios
      .get('api/v1/projects?' + queryString)
      .then(response => {
        commit('clearProjects');

        const resp = response.data;
        if (resp !== null) {
          for (let i = 0; i < resp.length; i++) {
            commit('addProject', resp[i]);
          }
        }
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  fetchComplexities({ commit }) {
    commit('clearComplexities');
    const $vm = this;
    return $vm.$axios
      .get('api/v1/projects/complexities')
      .then(response => {
        const resp = response.data;
        const complexitiesUpdated = [];
        if (resp !== null) {
          for (let i = 0; i < resp.length; i++) {
            const obj = { text: resp[i].name, value: resp[i].id };
            complexitiesUpdated.push(obj);
          }
          commit('setComplexities', complexitiesUpdated);
        }
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  fetchTypes({ commit }) {
    commit('clearTypes');
    const $vm = this;
    return $vm.$axios
      .get('api/v1/projects/types')
      .then(response => {
        const resp = response.data;
        const typesUpdated = [];
        if (resp !== null) {
          for (let i = 0; i < resp.length; i++) {
            const obj = { text: resp[i].name, value: resp[i].id };
            typesUpdated.push(obj);
          }
          commit('setTypes', typesUpdated);
        }
      })
      .catch(error => {
        if (error.response) {
          commit('setErrors', error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  fetchStatuses({ commit }) {
    commit('clearStatuses');
    const $vm = this;
    return $vm.$axios
      .get('api/v1/projects/statuses')
      .then(response => {
        const resp = response.data;
        const statusesUpdated = [];
        if (resp !== null) {
          for (let i = 0; i < resp.length; i++) {
            const obj = { text: resp[i].name, value: resp[i].id };
            statusesUpdated.push(obj);
          }
          commit('setStatuses', statusesUpdated);
        }
      })
      .catch(error => {
        if (error.response) {
          commit('addError', error.response.data);
          return false;
        } else if (error.request) {
          commit('addError', error.request);
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  fetchStrategicAlignments({ commit }) {
    commit('clearStrategicAlignments');
    const $vm = this;
    return $vm.$axios
      .get('api/v1/strategicalignments')
      .then(response => {
        const respData = response.data;
        const stratAlignsUpdated = [];
        if (respData !== null) {
          for (let i = 0; i < respData.length; i++) {
            const obj = { text: respData[i].name, value: respData[i].id };
            stratAlignsUpdated.push(obj);
          }
          commit('setStrategicAlignments', stratAlignsUpdated);
        }
      })
      .catch(error => {
        if (error.response) {
          //commit('setErrors', error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  }
};

export const mutations = {
  setProjectBeingViewed(state, proj) {
    state.projectBeingViewed = proj;
  },
  clearErrors(state) {
    state.errors = [];
  },
  clearProjects(state) {
    state.projects = [];
  },
  addProject(state, project) {
    state.projects.push(project);
  },
  clearStatuses(state) {
    state.statuses = [];
  },
  setStatuses(state, status) {
    state.statuses = status;
  },
  setErrors(state, errors) {
    state.errors = errors;
  },
  addError(state, error) {
    state.errors.push(error);
  },
  clearTypes(state) {
    state.types = [];
  },
  setTypes(state, types) {
    state.types = types;
  },
  clearComplexities(state) {
    state.complexities = [];
  },
  setComplexities(state, complexities) {
    state.complexities = complexities;
  },
  clearStrategicAlignments(state) {
    state.strategicAlignments = [];
  },
  setStrategicAlignments(state, strategicAlignments) {
    state.strategicAlignments = strategicAlignments;
  },
  clearSizes(state) {
    state.sizes = [];
  },
  setSizes(state, sizes) {
    state.sizes = sizes;
  }
};

export const getters = {
  getProjectBeingViewed(state) {
    return state.projectBeingViewed;
  },
  getTypes(state) {
    return state.types;
  },
  getStatuses(state) {
    return state.statuses;
  },
  getComplexities(state) {
    return state.complexities;
  },
  getErrors(state) {
    return state.errors;
  },
  getSizes(state) {
    return state.sizes;
  },
  getProjects(state) {
    return state.projects;
  },
  getStrategicAlignments(state) {
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
