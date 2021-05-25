<template>
  <div class="text-white mx-3">
    <h1>Popular Movies</h1>
    <carousel-3d 
    :controls-visible="true" 
    :controls-prev-html="'&#10092;'" 
    :controls-next-html="'&#10093;'" 
    :controls-width="50"
    :controls-height="90"
    :width="360"
    :height="540"
    :display="11"
    :clickable="true"
    :draggable="true"
    :loop="false"
    :border="0"
    :animationSpeed="300"
    style="background:transparent;">
      <slide v-for="(movie, idx) in movies" :key="idx" :index="idx">
        <figure style="height:100%">
          <img :src="getImage(movie.poster_path)" style="height:100%">
        </figure>
      </slide>
    </carousel-3d>
    <hr>
    <!-- 나중에 밑에 Genre를 쭉 뿌려주고 각각의 Component에 carousel을 넣어주면 될 것 같다. -->
    <!-- 뿌려주면서 장르를 넘겨주고 받아서 뿌려주면 된다. -->
    <h1>Genre</h1>
    <carousel-3d
    :disable3d="true" 
    :space="310" 
    :clickable="true" 
    :controls-visible="true" 
    :display="10"
    :border="0"
    :height="200"
    :width="300"
    style="background-color:transparent;"
    >
      <slide v-for="(movie, i) in movies" :key="i" :index="i" style="background:transparent;">
        <!-- <router-link :to="{name: 'MovieDetail', params: { movie: movie }}"> -->
        <div class="d-inline" @click="getMovie(movie)" style="cursor:pointer">
          <img :src="getImage(movie.poster_path)" style="width:100%; height:85%;">
        
          <div class="title" style="background-color:transparent; font-size:18px;">{{ movie.title }}</div>
        </div>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  name: 'Home',
  components: {
    Carousel3d,
    Slide
  },
  data: function () {
    return {
      
    }
  },
  computed: {
    ...mapState ([
      'movies',
    ]),
  },
  methods: {
    getImage: function (url) {
      return 'https://image.tmdb.org/t/p/original'+ url
    },
    getMovie: function (movie) {
      this.$store.dispatch('getMovie', movie)
      this.$router.push({name: 'MovieDetail'})
    },
    
  }
}
</script>

<style scoped>
  .carousel-3d-slide {
    font-size: 22px; 
  }
</style>