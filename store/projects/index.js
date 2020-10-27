const projTemplate = {
  id: undefined,
  name: undefined,
  descr: undefined,
  rgt: undefined,
  status: { name: undefined, id: undefined },
  type: { name: undefined, id: undefined },
  complexity: { name: undefined, id: undefined },
  size: { name: undefined, id: undefined }
};

export const state = () => ({
  projectBeingViewed: projTemplate,
  projects: [],
  statuses: [],
  types: [],
  complexities: [],
  sizes: [],
  errors: []
});

export const actions = {
  updateProject({ commit }, req) {
    commit("clearErrors");
    const $vm = this;
    return $vm.$axios
      .patch("api/v1/projects/" + req.projectID, req.body)
      .then(response => {
        const resp = response.data;
        console.log("resp", resp);
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
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
    commit("setProjectBeingViewed", projTemplate);
    commit("clearErrors");
    const $vm = this;
    return $vm.$axios
      .get("api/v1/projects/" + id)
      .then(response => {
        const resp = response.data;
        commit("setProjectBeingViewed", resp);
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
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
    commit("clearErrors");
    const $vm = this;
    return $vm.$axios
      .post("api/v1/projects", project)
      .then(response => {
        const resp = response.data;
        if (resp.id !== null) {
          return resp.id;
        }
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  edit({ commit }, project) {
    commit("clearErrors");
    const $vm = this;
    return $vm.$axios
      .post("api/v1/projects", project)
      .then(response => {
        const resp = response.data;
        if (resp.id !== null) {
          return resp.id;
        }
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
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
    commit("clearSizes");
    const $vm = this;
    return $vm.$axios
      .get("api/v1/projects/sizes")
      .then(response => {
        const resp = response.data;
        const sizesUpdated = [];
        if (resp !== null) {
          for (let i = 0; i < resp.length; i++) {
            const obj = { text: resp[i].name, value: resp[i].id };
            sizesUpdated.push(obj);
          }
          commit("setSizes", sizesUpdated);
        }
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
          return false;
        } else if (error.request) {
          console.error(error.request);
          return false;
        } else {
          console.error(error.message);
        }
      });
  },
  listProjects({ commit }) {
    commit("clearProjects");
    const $vm = this;
    return $vm.$axios
      .get("api/v1/projects")
      .then(response => {
        commit("clearProjects");

        const resp = response.data;
        if (resp !== null) {
          for (let i = 0; i < resp.length; i++) {
            commit("addProject", resp[i]);
          }
        }
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
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
    commit("clearComplexities");
    const $vm = this;
    return $vm.$axios
      .get("api/v1/projects/complexities")
      .then(response => {
        const resp = response.data;
        const complexitiesUpdated = [];
        if (resp !== null) {
          for (let i = 0; i < resp.length; i++) {
            const obj = { text: resp[i].name, value: resp[i].id };
            complexitiesUpdated.push(obj);
          }
          commit("setComplexities", complexitiesUpdated);
        }
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
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
    commit("clearTypes");
    const $vm = this;
    return $vm.$axios
      .get("api/v1/projects/types")
      .then(response => {
        const resp = response.data;
        const typesUpdated = [];
        if (resp !== null) {
          for (let i = 0; i < resp.length; i++) {
            const obj = { text: resp[i].name, value: resp[i].id };
            typesUpdated.push(obj);
          }
          commit("setTypes", typesUpdated);
        }
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
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
    commit("clearStatuses");
    const $vm = this;
    return $vm.$axios
      .get("api/v1/projects/statuses")
      .then(response => {
        const resp = response.data;
        const statusesUpdated = [];
        if (resp !== null) {
          for (let i = 0; i < resp.length; i++) {
            const obj = { text: resp[i].name, value: resp[i].id };
            statusesUpdated.push(obj);
          }
          commit("setStatuses", statusesUpdated);
        }
      })
      .catch(error => {
        if (error.response) {
          commit("setErrors", error.response.data);
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
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
