<template>
  <div class="text-white container bg-dark" style="opacity:0.5;">
    <h1>Movie Detail</h1>
    <h5>{{ movie }}</h5>
  </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  data: function () {
    return {
      movie: this.$route.params.movie
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
  }
}
</script>

<style scoped>
</style>