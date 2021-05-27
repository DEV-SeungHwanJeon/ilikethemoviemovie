<template>
  <div class="container">
    <div class="container text-white" :moviename="this.$store.state.detailmoviename">
      <!-- <h1>{{ this.moviename }}</h1> -->
      <h1 class="mt-3">영화 "{{ this.$route.params.title }}"의 게시판</h1>
      <button class="btn btn-success btn-lg my-5">
          <router-link class="text-white text-decoration-none" :to="{ name: 'ArticleForm',  params: {title: '', content:'', movie_id: this.$route.params.id , user_id: this.$store.state.user_id, method:'작성'} }">해당 영화 게시글 작성하기</router-link>
      </button>
      <ul class="list-group mt-3" v-if="this.$store.state.isArticles">
        <ArticleItem v-for="article in this.$store.state.articles" :key="article.id" :article="article"/>
      </ul>
      <div v-if="!this.$store.state.isArticles" class="text-white my-5">
        <h1 class="display-1">첫 번째 게시글을 작성해보세요!</h1> 
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'

export default {
  name: 'NoticeBoard',
  data: function () {
    return {
      articles: this.$store.state.articles,
      detailmovie: this.$store.state.detailmovie[0],
      user_id : this.$store.state.user_id
      // routeparams
      // detailmovie: this.$store.state.detailmovie[0]
    }
  },
  components : {
    ArticleItem,
  },
  methods: {
    getArticles: function () {
      // console.log(`${this.$store.state.detailmovie[0].id} 영화의 article 요청하는 것`)
      this.$store.dispatch('getArticles', this.$store.state.detailmovie[0].id)
    }
  },
  created: function () {
    console.log('route params')
    console.log(this.$route.params)
    this.getArticles()
  },
  updated: function () {
    // this.getArticles()
  }
}
</script>

<style>

</style>