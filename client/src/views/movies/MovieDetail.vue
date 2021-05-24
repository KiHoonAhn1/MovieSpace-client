<template>
  <div class="text-white container bg-dark">
    <div class="d-flex">
      <div class="p-4">
        <iframe id="player" type="text/html" width="640" height="360" :src="youtubeVideoSrc" frameborder="0"></iframe>
      </div>
      <div class="p-4">
        <h3>비슷한 영화</h3>
        <div v-for="video in similarVideo" v-bind:key="video.id" class="d-flex" @click="toDetail(video)">
          <img :src="getImage(video.poster_path)" style="width:80px; height:100px;">
          <div>{{ video.title }}</div>
        </div>
        <div>
          <h2>{{ movie.title }}</h2>
          <p>{{ movie.overview }}</p>
        </div>
      </div>
      <!-- 몇명이 좋아합니다 넣기 -->
    </div>
    <div>
      <div>
        <input type="number" v-model.trim="score">
        <input type="text" v-model.trim="content" @keyup.enter="createReview">
        <p>리뷰 리스트</p>
      </div>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
// const SERVER_URL = process.env.VUE_APP_SERVER_URL
export default {
  name: 'MovieDetail',
  data: function () {
    return {
      movie: this.$route.params.movie,
      movieVideo: '',
      similarVideo: [],
      reviewList: [],
      content: '',
      score: '',
    }
  },
  created: function () {
    /* 배경을 영화 backdrop_path로 바꾸기 진행중 */
    // const video = document.querySelector('#bg-video')
    // video.setAttribute('style', 'display:none;')
    // const body = document.querySelector('body')
    // const bg = document.createElement('div')
    // body.append(bg)
    // bg.setAttribute('url', this.movie.backdrop_path)
  },
  // 추가함
  created: async function () {

    // detail 영화 정보 불러오기
    const videoId = this.movie.id
    const apiKey = '7a8df8004890b70d9d4175ce5a47331d'
    const VIDEO_URL = `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${apiKey}&language=ko` 

    axios.get(VIDEO_URL)
    .then(response => {
      this.movieVideo = response.data.results[0].key
    })

    // similar 영화 정보 불러오기
    const SIMILAR_URL = `https://api.themoviedb.org/3/movie/${videoId}/similar?api_key=${apiKey}&language=ko&page=1`
    axios.get(SIMILAR_URL)
    .then(response=> {
      let i = 0
      while (this.similarVideo.length < 3) {
        if (response.data.results[i].poster_path) {
          this.similarVideo.push(response.data.results[i])
        }
        i ++
      }
    })

    // review list 불러오기
    this.getReviews()
  },
  computed: {
    youtubeVideoSrc: function () {
      return `http://www.youtube.com/embed/${this.movieVideo}?enablejsapi=1&origin=http://example.com`
    },
    ...mapState ([
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
    // similar movie 이미지 포스터 가져오기
    getImage: function (url) {
      return 'https://image.tmdb.org/t/p/original'+ url
    },
    // movie review list 불러오기
    getReviews: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${this.movie.id}/review/`,
      })
      .then((res)=> {
        console.log(res.data)
        this.reviewList = res.data
      })
    },

    // 아래 코드들이 잘 작동이 안됨..
    createReview: function() {
      const reviewScore = {
        content : this.content,
        score : this.score,
        user: this.user.id,
        movie: this.movie.id,
      }
      // console.log(reviewScore)
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${this.movie.id}/review/`,
        data: reviewScore,
        headers: this.setToken()
      })
        .then((res)=> {
          console.log(res)
          this.getReviews()
        })
        .catch(err => {
          console.log(err)
        })

    },
    toDetail : function () {
      this.$router.push({name: 'MovieDetail', params: {movie:video}})
    }
  },
}
</script>

<style scoped>
  #back {
    opacity: 0.5;
  }
</style>