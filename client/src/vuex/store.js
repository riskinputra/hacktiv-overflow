import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import jwtDecode from 'jwt-decode'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})
Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    loading: false
  },
  getters: {
    loading (state) {
      return state.loading
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      http.post('/api/signup', payload)
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
})
