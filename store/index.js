// import Vue from 'vue'
// const cookieparser = process.server ? require('cookieparser') : undefined
// import {setAuthToken, resetAuthToken} from '~/util/auth'
// import api from '~/api'

console.log('inside auth of store')

export const state = () => ({
  overlay: false
})

// export const state = { ...initialState };

export const actions = {
  updateOverlay({ commit }, overlayStatus) {
    commit('setOverlay', overlayStatus)
  },
  authPing({commit}, accessToken) {
    const config = {
      headers: { Authorization: accessToken }
    }
    console.log(JSON.stringify(config))
    this.$axios.get('api/ping', config)
  }
}

export const mutations = {
  setOverlay(state, status) {
    state.overlay = status
  }
}

export const getters = {
  getOverlay(state) {
    return state.overlay
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
