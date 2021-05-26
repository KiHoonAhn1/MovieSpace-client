<template>
  <div class="text-white">
    <div class="mt-5">
      <h2 class="m-5">랜덤 추천</h2>
      <RandomMovie
      :pickmovies="this.pickmovies"
      />
    </div>
    <div class="m-5">
      <h2>내가 좋아한 장르</h2>
      <p>{{ this.likegenresList }}</p>
    </div>
    <!-- <RandomMovie /> -->
    <!-- <h5>좋아하는 장르 기반 추천</h5> -->

    <!-- 아래는 유저가 좋아하는 장르 입력해서 넣는 부분 -->
    <!-- <input type="text" v-model.trim="genre">
    <button @click="insertRecommend">+</button>
    장르 리스트 보여주고 삭제할 수 있는 부분 추가해야할듯 -->
  </div>
  <!-- 적혀있던 코드 일단 주석처리해놓음 -->
  <!-- <div class="text-white">
    <carousel-3d :disable3d="true" :space="365" :clickable="false" :controls-visible="true" :display="10">
      <slide v-for="(movie, i) in movies" :key="i" :index="i">
        <span class="title">You know</span>
        <p>You know, being a test pilot isn't always the healthiest business in the world.</p>
      </slide>
    </carousel-3d>
  </div> -->
</template>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
import RandomMovie from '@/components/movies/RandomMovie.vue'
// import axios from 'axios'
import { mapState } from 'vuex'
import _ from 'lodash'
// 적혀있던 코드 일단 주석처리해놓음
// import { mapState } from 'vuex'
// import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  name: 'MovieList',
  components: {
    RandomMovie,
  },
  data: function() {
    return {
      pickmovies: [],
      likegenres: '',
      likegenresList: [],
    }
  },
  created: function() {
    this.pickMovie()
    this.likeGenre()
  },
  computed: {
    ...mapState ([
      'movies',
      'user',
    ])
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    // 랜덤 영화 뽑기
    pickMovie: function () {
      this.pickmovies = _.sampleSize(this.movies, 10)
    },
    // 좋아하는 장르 기반 뽑기
    likeGenre: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/${this.user.username}/recommend/`,
        data: {},
        headers: this.setToken()
      })
      .then((res)=>{
        console.log(res.data)
        
      })
    }
  }
  // created: {
  //   // 여기에 나중에 this.getRecommend() 추가하기
  // },
  // computed: {
  //   ...mapState ([
  //     'user',
  //     'genres',
  //   ])
  // },
  // methods: {
  //   setToken: function () {
  //     const token = localStorage.getItem('jwt')
  //     const config = {
  //       Authorization: `JWT ${token}`
  //     }
  //     return config
  //   },
    

  // },
  // 적혀있던 코드 일단 주석처리 해놓음
  // name: 'MovieList',
  //   components: {
  //   Carousel3d,
  //   Slide
  // },
  // data: function () {
  //   return {
      
  //   }
  // },
  // computed: {
  //   ...mapState ([
  //     'movies',
  //   ]),
  // },
  // methods: {
  //   getImage: function (url) {
  //     return 'https://image.tmdb.org/t/p/original'+ url
  //   }
  // },
}
</script>

<style>

</style>