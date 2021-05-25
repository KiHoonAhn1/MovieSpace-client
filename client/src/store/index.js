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
    movie: {},
    user: {},
    articles: [],
    article: {},
    comments: [],
    genres: [],
  },
  mutations: {
    GET_MOVIES: function (state, movies) {
      state.movies = movies
    },
    GET_MOVIE: function (state, movie) {
      state.movie = movie
    },
    GET_GENRES: function (state, genres) {
      state.genres = genres
    },
    GET_USER: function (state, user) {
      state.user = user
    },
    LOGOUT: function (state) {
      state.user = {}
    },
    GET_ARTICLES: function (state, articles) {
      state.articles = articles
    },
    GET_ARTICLE: function (state, article) {
      state.article = article
    },
    GET_COMMENTS: function (state, comments) {
      state.comments = comments
    },
  },
  actions: {
    getMovies: function({commit}, movies) {
      commit('GET_MOVIES', movies)
    },
    getMovie: function({commit}, movie) {
      commit('GET_MOVIE', movie)
    },
    getGenres: function({commit}, genres) {
      // console.log(genres)
      commit('GET_GENRES', genres)
    },
    getUser: function({commit}, user) {
      commit('GET_USER', user)
    },
    logout: function ({commit}) {
      commit('LOGOUT')
    },
    getArticles: function ({commit}, articles) {
      commit('GET_ARTICLES', articles)
    },
    getArticle: function ({commit}, article) {
      commit('GET_ARTICLE', article)
    },
    getComments: function ({commit}, comments) {
      commit('GET_COMMENTS', comments)
    },

  },
  getters: {
    
  },
  modules: {
  }
})
