// import Vue from 'vue'
// const cookieparser = process.server ? require('cookieparser') : undefined
// import {setAuthToken, resetAuthToken} from '~/util/auth'
import cookies from 'js-cookie'
// import api from '~/api'

console.log('inside auth of store')

export const state = () => ({
  org: null,
  validationErrors: null,
  errors: null
})

// export const state = { ...initialState };

export const actions = {
  fetch({ commit }) {},
  refresh({ commit }) {
    commit('setValidationErrors', [])
  },
  register({ commit }, profile) {
    commit('setValidationErrors', [])
    commit('setSignUpStatus', 'register-pending')

    return new Promise((resolve, reject) => {
      this.$axios
        .post(`api/v1/organizations`, profile)
        .then(function(response) {
          if (response !== null && response.status === 200) {
            commit('setSignUpStatus', 'register-success')
            // setAuthToken(response.data.token)
            resolve()
          } else {
            commit('setValidationErrors', [response.data.msg])
            commit('setSignUpStatus', 'register-error')
          }
        })
        .catch(function(error) {
          if (error.response !== null && error.response.status === 422) {
            const errors = error.response.data.errors
            commit('setValidationErrors', errors)
            commit('setSignUpStatus', 'register-error')
            return reject(error)
          } else if (error.response !== null && error.response.status === 409) {
            const errors = error.response.data.errors
            commit('setValidationErrors', errors)
            commit('setSignUpStatus', 'register-error')
            return reject(error)
          } else {
            commit('setErrors', [{ msg: 'Problem registering' }])
            commit('setSignUpStatus', 'register-error')
            return reject(error)
          }
        })
    })
  },
  selectOrg({ commit }, orgId) {
    commit('setAuthErrors', [])

    return new Promise((resolve, reject) => {
      commit('setSignUpStatus', 'select-org-pending')

      // this.$axios.get(`api/user/`)

      this.$axios
        .post(`api/users/authorganization`, { orgId })
        .then(function(response) {
          if (response !== null && response.data.success) {
            console.log('response.data')
            console.log(response.data.token)

            commit('setSignUpStatus', 'select-org-success')
            commit('set_user', response.data.user)
            commit('setOrg', response.data.orgs)

            cookies.set('x-access-token', response.data.token, {
              expires: 7,
              httpOnly: true
            })
            resolve(response.data)
          } else if (response !== null && response.data.message !== null) {
            commit('setValidationErrors', [response.data.message])
            commit('setSignUpStatus', 'select-org-error')
            reject(response.data.message)
          }
        })
        .catch(function(error) {
          commit('setValidationErrors', ['Problem selecting org'])
          commit('setSignUpStatus', 'select-org-error')
          reject(error)
        })
    })
  }
}

export const mutations = {
  setSignUpStatus(state, data) {
    state.signUpStatus = data
  },
  setValidationErrors(state, validationErrors) {
    state.validationErrors = validationErrors
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
  getValidationErrors(state) {
    return state.validationErrors
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
