<template>
  <div class="text-white container bg-dark">
    <div class="d-flex">
      <div class="p-4">
        <iframe id="player" type="text/html" width="640" height="360" :src="youtubeVideoSrc" frameborder="0"></iframe>
      </div>
      <div class="p-4">
        <div v-for="video in similarVideo" v-bind:key="video.id" class="d-flex">
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
        <p>리뷰 리스트</p>
      </div>
    </div>
    <!-- <h5>{{ movie }}</h5> -->
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
import axios from 'axios'
export default {
  name: 'MovieDetail',
  data: function () {
    return {
      movie: this.$route.params.movie,
      movieVideo: '',
      // similarVideos: [],
      similarVideo: [],
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
    const videoId = this.movie.id
    const apiKey = '7a8df8004890b70d9d4175ce5a47331d'
    const VIDEO_URL = `https://api.themoviedb.org/3/movie/${videoId}/videos?api_key=${apiKey}&language=ko` 

    axios.get(VIDEO_URL)
    .then(response => {
      this.movieVideo = response.data.results[0].key
    })

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

      // this.similarVideo.push(response.data.results[0])
      // this.similarVideo.push(response.data.results[1])
      // this.similarVideo.push(response.data.results[2])

      console.log(this.similarVideo)
    })
  },
  computed: {
    youtubeVideoSrc: function () {
      return `http://www.youtube.com/embed/${this.movieVideo}?enablejsapi=1&origin=http://example.com`
    },
  },
  methods: {
    getImage: function (url) {
      return 'https://image.tmdb.org/t/p/original'+ url
    }
  },
}
</script>

<style scoped>
  #back {
    opacity: 0.5;
  }
</style>