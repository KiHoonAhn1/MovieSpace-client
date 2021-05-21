<template>
  <div class="text-white">
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
  }
}
</script>

<style>

</style>