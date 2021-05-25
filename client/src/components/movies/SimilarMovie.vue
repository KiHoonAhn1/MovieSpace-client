<template>
  <div class="d-flex mt-3">
    <img :src="getImage(video.poster_path)" style="width:80px; height:100px; cursor:pointer;" @click="toDetail(video)">
    <div class="d-flex align-items-center ms-4" style="cursor:pointer;" @click="toDetail(video)"><h5 id="colorchange">{{ video.title }}</h5></div>
  </div>
</template>


<script>
export default {
  name: 'SimilarMovie',
  props: {
    video: {
      type: Object,
    }
  },
  methods: {
    // similar movie 이미지 포스터 가져오기
    getImage: function (url) {
      return 'https://image.tmdb.org/t/p/original'+ url
    },
    // setToken: function () {
    //   const token = localStorage.getItem('jwt')
    //   const config = {
    //     Authorization: `JWT ${token}`
    //   }
    //   return config
    // },
    toDetail: function (video) {
      // this.$router.push({name: 'MovieDetail', params: {movie:this.video}})
      this.$store.dispatch('getMovie', video)
      this.$router.go(this.$router.currentRoute)
    },
  }
}
</script>

<style scoped>
  #colorchange{
    color: white;
  }
  #colorchange:hover {
    color:crimson;
  }

</style>