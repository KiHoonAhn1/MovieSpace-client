<template>
  <div>
    <ul v-for="(comment, idx) in comments" :key="idx">
      <li>{{ comment.content }}, {{ comment.username }}, {{ comment.created_at }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'CommentList',
  data: function () {
    return {
      commentList: []
    }
  },
  created: function () {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/community/${this.article.id}/comment/`,
      data: {},
      headers: this.setToken(),
    })
      .then(res => {
        this.commentList = res.data
        return res
      })
      .then(res => {
        this.$store.dispatch('getComments', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
  },
  computed: {
    ...mapState([
      'article',
      'comments'
    ])
  }
}
</script>

<style>

</style>