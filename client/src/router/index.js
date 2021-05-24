import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/movies/Home.vue'
import MovieList from '@/views/movies/MovieList.vue'
import MovieDetail from '@/views/movies/MovieDetail.vue'
import ArticleList from '@/views/articles/ArticleList.vue'
import Signup from '@/views/accounts/Signup.vue'
import Login from '@/views/accounts/Login.vue'
import CreateArticle from '@/views/articles/CreateArticle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movielist',
    name: 'MovieList',
    component: MovieList
  },
  {
    path: '/movieDetail',
    name: 'MovieDetail',
    component: MovieDetail,
    props: true,
  },
  {
    path: '/articleList',
    name: 'ArticleList',
    component: ArticleList,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/createarticle',
    name: 'CreateArticle',
    component: CreateArticle,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
