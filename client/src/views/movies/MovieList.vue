<template>
  <div class="text-white">
    <carousel-3d :disable3d="true" :space="365" :clickable="false" :controls-visible="true" :display="10">
      <slide v-for="(movie, i) in movies" :key="i" :index="i">
        <span class="title">You know</span>
        <p>You know, being a test pilot isn't always the healthiest business in the world.</p>
      </slide>
    </carousel-3d>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  name: 'MovieList',
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
    }
  },
}
</script>

<style>

</style>