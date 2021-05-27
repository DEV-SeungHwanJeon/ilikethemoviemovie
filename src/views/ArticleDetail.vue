<template>
  <div class="text-white">
    <p class="fs-3">Article Detail</p>
    <p class="display-3"> {{this.$route.params.title }}</p>
    <p class="fs-4"> 작성자 : {{this.$route.params.user.username }}
      <span><button class="btn btn-success">
        <router-link class="text-white text-decoration-none" :to="{ name: 'ArticleForm',  params: this.$route.params}">수정하기</router-link>
      </button></span>
      <span><button class="btn btn-danger">
        <router-link class="text-white text-decoration-none" @click.native="deleteArticle()" :to="{ name: 'MovieDetail', params: this.detailmovie }">삭제하기</router-link>
      </button></span>
    </p>
    <p class="fs-4"> 작성시간 : {{ this.$route.params.updated_at.slice(0,10) }} {{ this.$route.params.updated_at.slice(11,16)}}</p>
    <p class="fs-2"> 내용 : {{this.$route.params.content }}</p>
  </div>
</template>

<script>
export default { 
  name: 'ArticleDetail',
  data: function () {
    return {
      detailarticle : this.$store.state.detailarticle,
      article_id : this.$route.params.id,
      detailmovie : this.$store.state.detailmovie[0]
    }
  },
  created: function () {
    console.log('this.$route.params')
    console.log(this.$route.params)
  },
  methods: {
    deleteArticle : function () {
      console.log('deleteArticle시에 들어오는 $route param')
      const moviedata = this.$route.params
      console.log(moviedata)
      const info = {
        'id': this.article_id,
        'movie_id' : moviedata.id,
        'user_id': this.$store.state.user_id
      }
      // console.log(info)
      this.$store.dispatch('deleteArticle', info)
    }
  }
}
</script>

<style>

</style>