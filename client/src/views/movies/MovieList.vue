<template>
  <div class="text-white">
    <h5>좋아하는 장르 기반 추천</h5>
    <!-- 아래는 유저가 좋아하는 장르 입력해서 넣는 부분 -->
    <input type="text" v-model.trim="genre">
    <button @click="insertRecommend">+</button>
    장르 리스트 보여주고 삭제할 수 있는 부분 추가해야할듯



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
import axios from 'axios'
import { mapState } from 'vuex'
// 적혀있던 코드 일단 주석처리해놓음
// import { mapState } from 'vuex'
// import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  name: 'Recommendation',
  data: function() {
    return {
      genre: null,
    }
  },
  created: {
    // 여기에 나중에 this.getRecommend() 추가하기
  },
  computed: {
    ...mapState ([
      'user',
      'genres',
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
    // 1. 좋아하는 장르 기반 추천 가져오는 부분
    // getRecommend : function () {
    //   pass
    // },

    // 2. 유저가 좋아하는 장르 넣어주는 함수
    insertRecommend: function () {

      // input의 장르 이름을 genreId로 바꿔줌
      
      // const genreId = this.genres.filter((ge)=>{
      //   return this.genre.includes(ge.name)
      // })
      // console.log(genreId)
      // console.log(genreId)
      // const genreItem = {
      //   id: genreId[0].id,
      //   name: genreId[0].name,
      // }
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/${this.user.id}/like_genre/`,
        data: {},
        headers: this.setToken()
      })
      .then((res)=>{
        console.log(res)
      })
    }

  },
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