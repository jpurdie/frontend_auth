// import Vue from 'vue'
// const cookieparser = process.server ? require('cookieparser') : undefined
// import {setAuthToken, resetAuthToken} from '~/util/auth'
// import api from '~/api'

console.log('inside auth of store')

export const state = () => ({
  org: null,
  errors: null,
  signUpStatus: null
})

// export const state = { ...initialState };

export const actions = {
  fetch({ commit }) {},
  refresh({ commit }) {
    commit('setErrors', [])
  },
  register({ commit }, profile) {
    commit('setErrors', [])
    commit('setSignUpStatus', 'register-pending')

    return new Promise((resolve, reject) => {
      this.$axios
        .post(`api/v1/organizations`, profile)
        .then(function(response) {
          if (response !== null && response.status === 201) {
            commit('setSignUpStatus', 'register-success')
            // setAuthToken(response.data.token)
            resolve()
          } else {
            commit('setErrors', [response.data.msg])
            commit('setSignUpStatus', 'register-error')
            reject(new Error('Registration error'))
          }
        })
        .catch(function(error) {
          if (error.response !== null && error.response.status === 422) {
            const errors = error.response.data.errors
            commit('setErrors', errors)
            commit('setSignUpStatus', 'register-error')
            reject(error)
          } else if (error.response !== null && error.response.status === 409) {
            const errors = error.response.data.errors
            commit('setErrors', errors)
            commit('setSignUpStatus', 'register-error')
            reject(error)
          } else {
            commit('setErrors', [{ msg: 'Problem registering' }])
            commit('setSignUpStatus', 'register-error')
            reject(error)
          }
        })
    })
  }
}

export const mutations = {
  setSignUpStatus(state, data) {
    state.signUpStatus = data
  },
  set_user(store, data) {
    store.user = data
  },
  reset_user(store) {
    store.user = null
  },
  setOrg(store, data) {
    store.org = data
  },
  setErrors(store, data) {
    store.errors = data
  }
}

export const getters = {
  getSignUpStatus(state) {
    return state.signUpStatus
  },
  getOrg(state) {
    return state.org
  },
  getErrors(state) {
    return state.errors
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
