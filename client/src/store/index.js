import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies: [],
  },
  mutations: {
    GET_MOVIES: function (state, movies) {
      state.movies = movies
    }
  },
  actions: {
    getMovies: function({commit}, movies) {
      commit('GET_MOVIES', movies)
    },
  },
  getters: {
    
  },
  modules: {
  }
})
