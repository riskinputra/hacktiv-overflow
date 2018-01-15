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
    loading: false,
    error: null,
    questions: [],
    answer: []
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      console.log('setError', payload)
      state.error = payload
    },
    setAllQuestions (state, payload) {
      console.log('questions', payload)
      state.questions = payload
    },
    setAddQuestions (state, payload) {
      state.questions.push(payload)
    },
    setAnswer (state, payload) {
      state.answer = payload
    },
    setAddAnswer (state, payload) {
      state.answer.push(payload)
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      http.post('/api/signup', payload)
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.error(err)
          commit('setLoading', false)
          commit('setError', {message: 'Please Check Your Data !'})
        })
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      http.post('/api/signin', payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
        })
        .catch(err => {
          console.error(err)
          commit('setLoading', false)
          commit('setError', {message: 'E-mail or Password Wrong !'})
        })
    },
    getAllQuestions ({ commit }) {
      http.get('/api/questions')
        .then(({ data }) => {
          console.log('allQuestions', data.data)
          commit('setAllQuestions', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    createQuestions ({ commit }, payload) {
      console.log('createQuestions', payload)
      http.post('/api/questions', payload, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('allQuestions', data.data)
          commit('setAddQuestions', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getAnswers ({ commit }) {
      console.log('answer')
      http.get('/api/answers')
        .then(({ data }) => {
          console.log('answer', data.data)
          commit('setAnswer', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    createAnswer ({ commit }, payload) {
      commit('setLoading', true)
      console.log(payload)
      let newData = {
        comment: payload.comment
      }
      http.post('/api/answers', newData, {
        headers: {
          'token': localStorage.getItem('token'),
          'questionId': payload.questionId
        }
      })
        .then(({ data }) => {
          console.log('createAnswer', data.data)
          commit('setLoading', false)
          commit('setAddAnswer', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    questions (state) {
      return state.questions
    },
    answers (state) {
      return state.answer
    }
  }
})
