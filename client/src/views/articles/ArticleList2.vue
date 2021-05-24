<template>
  <div class="article-content">
    <div class="container">
      <button>글 작성</button>
      <Articles />
    </div>
  </div>
</template>

<script>
import Articles from '@/components/articles/Articles.vue'

// const URL = 'http://127.0.0.1:8000/community/'

export default {
  name: 'ArticleList',
  components: {
    Articles,
  },
}
</script>

<style scoped>

</style>