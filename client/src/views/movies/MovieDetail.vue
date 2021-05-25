<template>
  <div class="text-white container bg-dark">
    
    <div class="d-flex m-3 row">
      
      <div class="p-4 d-flex flex-column mt-3 col-8">
        <div class="d-inline-flex justify-content-between ms-2">
          <h1><strong>{{ movie.title }}</strong></h1>
          <div class="d-flex flex-column justify-content-center me-3"><i class="far fa-heart fa-2x" style="color:crimson;" size="lg"></i></div>
        </div>
        <!-- width="640" height="360" -->
        <iframe id="player" type="text/html" :src="youtubeVideoSrc" frameborder="0" class="mt-4 w-100 h-100"></iframe>
      </div>
      <div class="p-4 mt-4 col-4">
        <h4>비슷한 영화 추천</h4>
        <div class="mt-4 ms-4">
          <SimilarMovie
          v-for= "(video, idx) in similarVideo"
          :key="idx"
          :video="video"
          @click="toDetail(video)"
          />
        </div>
        <div class="mt-5">
          <h4>영화 정보</h4>
          <div class="d-flex justify-content-between mt-4" >
            <p style="color:white;">발매일 {{ movie.release_date }}</p>
            <p style="color:white;">평점 {{ movie.vote_average }}</p>
          </div>
          <div>
            <p class="textlength" style="color:white;">{{ movie.overview }}</p>
          </div>
          <div class="d-flex">
            <div v-for="(genre,idx) in genreList" :key="idx" class="me-4">
              #{{ genre.name }}
            </div>
          </div>
          
        </div>
      </div>
      <!-- 몇명이 좋아합니다 넣기 -->
    </div>
    <div>
      <div>
        <div class="d-flex mx-4">
          <div class="star-rating space-x-4">
            <input type="radio" id="5-stars" name="rating" value="5" v-model="score"/>
            <label for="5-stars" class="star pr-4">★</label>
            <input type="radio" id="4-stars" name="rating" value="4" v-model="score"/>
            <label for="4-stars" class="star">★</label>
            <input type="radio" id="3-stars" name="rating" value="3" v-model="score"/>
            <label for="3-stars" class="star">★</label>
            <input type="radio" id="2-stars" name="rating" value="2" v-model="score"/>
            <label for="2-stars" class="star">★</label>
            <input type="radio" id="1-star" name="rating" value="1" v-model="score" />
            <label for="1-star" class="star">★</label>
          </div>
          <!-- <input type="number" v-model.trim="score"> -->
          <!-- <input type="text" v-model.trim="content" @keyup.enter="createReview" class="mx-4"> -->
          <div class="input-group tm-mb-30 mx-4">
            <input name="username" type="text" class="form-control rounded-0 border-top-0 border-end-0 border-start-0" placeholder="한줄평" v-model="content" @keyup.enter="createReview">
          </div>
        </div>
        <!-- 아래 코드 추가함 -->
        <div class="table-responsive mt-5">
          <b-table 
          id="my-table"
          :items="reviewList"
          :fields="['username','score', 'content', 'updated_at']"
          :per-page="perPage"
          :current-page="currentPage"
          class="table table-striped custom-table"
          small
          >
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
            pills
            first-number
            last-number
            class="my-5 d-flex"
          >
          </b-pagination>
        </div>

        <!-- <div v-for="review in reviewList" v-bind:key="review.id" class="d-flex mx-2">
          <div class="m-2">{{ review.username }}</div>
          <div class="m-2">{{ review.score }}</div>
          <div class="m-2">{{ review.content }}</div>
          <div class="m-2">{{ review.updated_at }}</div>
        </div> -->
      </div>
    </div>
  </div>
</template>






<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import SimilarMovie from '@/components/movies/SimilarMovie.vue'

// const SERVER_URL = process.env.VUE_APP_SERVER_URL
export default {
  name: 'MovieDetail',
  data: function () {
    return {
      movieData: {},
      movieVideo: '',
      similarVideo: [],
      reviewList: [],
      content: '',
      score: '',
      perPage: 10,
      currentPage: 1,
      genreList: [],
    }
  },
  components: {
    SimilarMovie,
  },
  // created: function () {
    /* 배경을 영화 backdrop_path로 바꾸기 진행중 */
    // const video = document.querySelector('#bg-video')
    // video.setAttribute('style', 'display:none;')
    // const body = document.querySelector('body')
    // const bg = document.createElement('div')
    // body.append(bg)
    // bg.setAttribute('url', this.movie.backdrop_path)
  // },
  // 추가함
  mounted: async function () {

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
    this.getGenres()
    this.getReviews()
    this.getGenres()
  },
  created: function() {
    this.movieData = this.movie
    // console.log(this.genres)
  },
  computed: {
    youtubeVideoSrc: function () {
      return `http://www.youtube.com/embed/${this.movieVideo}?enablejsapi=1&origin=http://example.com`
    },
    ...mapState ([
      'user',
      'movie',
      'genres',
    ]),
    rows() {
      return this.reviewList.length
    },
    

    // filterByGenre : function (name) {
    //   this.genreList.filter(function(ge) {
    //     if (ge.id === name) {
    //       console.log(ge.name)
    //       return ge.name
          
    //     }
    //   })
    // }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    // // similar movie 이미지 포스터 가져오기
    // getImage: function (url) {
    //   return 'https://image.tmdb.org/t/p/original'+ url
    // },
    // movie review list 불러오기
    getReviews: function () {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/movies/${this.movie.id}/review/`,
        data: {},
        headers: this.setToken()
      })
      .then((res)=> {
        // console.log(res.data)
        this.reviewList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getGenres: function () {
      this.genreList = this.genres.filter((genre) => {
        // console.log(genre)
        return this.movie.genres.includes(genre.id)
      })
    },
    // 아래 코드들이 잘 작동이 안됨..
    createReview: function() {
      const reviewScore = {
        content : this.content,
        score : this.score,
        user: this.user.id,
        movie: this.movie.id,
        username: this.user.username,
      }
      // console.log(reviewScore)
      // console.log(this.setToken())
      // console.log(this.user.username)
      
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
    toDetail : function (video) {
      this.$store.dispatch('getMovie', video)
      this.$router.go(this.$router.currentPage)
      
      // console.log(this.reviewList)
      // console.log(rows)
    },
  },
}
</script>

<style scoped>
  #back {
    opacity: 0.5;
  }
  
  .star-rating {
  display: flex;
  flex-direction: row-reverse;
  font-size: 2.25rem;
  line-height: 2.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  text-align: center;
  width: 5em;
}
 
.star-rating input {
  display: none;
}
 
.star-rating label {
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color:rgb(170, 169, 169);
  cursor: pointer;
}
 
.star-rating :checked ~ label {
  -webkit-text-fill-color: gold;
}
 
.star-rating label:hover,
.star-rating label:hover ~ label {
  -webkit-text-fill-color: #fff58c;
}

.form-control {
    font-size: 1.2rem;
    padding: 5px 0;
}

.form-control,
.form-control:focus {
    color: white;
    background-color: transparent;
}

.form-control:focus {
    border-bottom: 1px solid dark;
    outline: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.form-control::-webkit-input-placeholder { color: white; }
.form-control:-moz-placeholder { color: white; }
.form-control::-moz-placeholder { color: white; }
.form-control:-ms-input-placeholder { color: white; }

.textlength {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

</style>