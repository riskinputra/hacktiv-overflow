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
    answer: [],
    questionsById: null,
    isLogin: false
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setAllQuestions (state, payload) {
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
    setDeleteAnswer (state, payload) {
      const filterAnswer = state.answer.filter(newAnswer => {
        return newAnswer._id !== payload._id
      })
      state.answer = filterAnswer
    },
    setQuestionById (state, payload) {
      state.questionsById = payload
    },
    setQuestionUpdate (state, payload) {
      let idx = state.questions.findIndex(question => question._id === payload._id)
      state.questions.splice(idx, 1, payload)
    },
    setDeleteQuestions (state, payload) {
      const filterQuestions = state.questions.filter(newQuestion => {
        return newQuestion._id !== payload._id
      })
      state.questions = filterQuestions
    },
    setQuestionsUpvote (state, payload) {
      let idx = state.questions.findIndex(question => question._id === payload._id)
      state.questions.splice(idx, 1, payload)
    },
    setQuestionsDownvote (state, payload) {
      let idx = state.questions.findIndex(question => question._id === payload._id)
      state.questions.splice(idx, 1, payload)
    },
    setAnswersUpvote (state, payload) {
      let idx = state.answer.findIndex(question => question._id === payload._id)
      state.answer.splice(idx, 1, payload)
    },
    setAnswersDownvote (state, payload) {
      let idx = state.answer.findIndex(question => question._id === payload._id)
      state.answer.splice(idx, 1, payload)
    },
    setIsLogin (state, payload) {
      state.isLogin = payload
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
          commit('setLoading', false)
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
          location.reload()
          commit('setIsLogin', true)
          commit('setLoading', false)
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
          commit('setAllQuestions', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    createQuestions ({ commit }, payload) {
      http.post('/api/questions', payload, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setAddQuestions', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getQuestionsById ({ commit }, payload) {
      http.get(`/api/questions/${payload}`)
        .then(({ data }) => {
          commit('setQuestionById', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    updateQuestions ({ commit }, payload) {
      http.put(`/api/questions/${payload.questionId}`, payload, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setQuestionUpdate', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    removeQuestions ({ commit }, payload) {
      http.delete(`/api/questions/${payload}`, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setDeleteQuestions', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getAnswers ({ commit }) {
      http.get('/api/answers')
        .then(({ data }) => {
          commit('setAnswer', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    createAnswer ({ commit }, payload) {
      commit('setLoading', true)
      let newData = {
        comment: payload.comment,
        questionId: payload.questionId
      }
      http.post('/api/answers', newData, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setLoading', false)
          commit('setAddAnswer', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    removeAnswer ({ commit }, payload) {
      http.delete(`/api/answers/${payload}`, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setDeleteAnswer', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    questionsUpVote ({ commit }, payload) {
      http.put(`/api/questions/${payload}/upvote`, {}, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setQuestionsUpvote', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    questionsDownVote ({ commit }, payload) {
      http.put(`/api/questions/${payload}/downvote`, {}, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setQuestionsDownvote', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    answerUpVote ({ commit }, payload) {
      http.put(`/api/answers/${payload}/upvote`, {}, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setAnswersUpvote', data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    answerDownVote ({ commit }, payload) {
      http.put(`/api/answers/${payload}/downvote`, {}, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setAnswersDownvote', data.data)
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
    },
    isLogin (state) {
      return state.isLogin
    }
  }
})
