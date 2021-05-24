import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    movies: [],
    user: {},
  },
  mutations: {
    GET_MOVIES: function (state, movies) {
      state.movies = movies
    },
    GET_USER: function (state, user) {
      console.log(user)
      state.user = user
    },
    LOGOUT: function (state) {
      state.user = {}
    }
  },
  actions: {
    getMovies: function({commit}, movies) {
      commit('GET_MOVIES', movies)
    },
    getUser: function({commit}, user) {
      commit('GET_USER', user)
    },
    logout: function ({commit}) {
      commit('LOGOUT')
    }
  },
  getters: {
    
  },
  modules: {
  }
})
