<template>
  <div class="article-content">
    <div class="container">
      <button>글 작성</button>
      <Articles2 />
    </div>
  </div>
</template>

<script>
import Articles2 from '@/components/articles/Articles2.vue'

// const URL = 'http://127.0.0.1:8000/community/'

export default {
  name: 'ArticleList',
  components: {
    Articles2,
  },
}
</script>

<style scoped>

</style>