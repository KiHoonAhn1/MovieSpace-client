<template>
  <div class="text-white border border-4">
    Popular Movie
    <MovieCard 
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MovieCard from '@/components/movies/MovieCard.vue'

export default {
  name: 'Home',
  components: {
    MovieCard,
  },
  data: function () {
    return {

    }
  },
  computed: {
    ...mapState ([
      'movies',
    ])
  },
  // methods: {

  // }
}
</script>

<style>

</style>