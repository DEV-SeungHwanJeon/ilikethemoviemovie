<template>
  <div class="container">
    <p class="text-white fs-1 my-5" v-if="(this.$route.params.method==='작성')">게시글 작성</p>
    <p class="text-white fs-1 my-5" v-else>게시글 수정</p>
    <div class="d-flex justify-content-center">
      <div class="col-8">
          <div class="input-group mb-5">
            <span class="input-group-text" id="basic-addon1">게시글 제목 :</span>
            <input type="text" class="form-control" placeholder="게시글 제목 작성" aria-label="title" aria-describedby="basic-addon1" v-model="title">
          </div>
          <div class="input-group mb-5">
            <span class="input-group-text" id="basic-addon2">게시글 내용 :</span>
            <input type="text" class="form-control" placeholder="게시글 내용 작성" aria-label="content" aria-describedby="basic-addon2" v-model="content">
          </div>
      </div>
    </div>
    <button class="btn btn-success">
      <router-link class="text-white text-decoration-none" @click.native="createArticle" :to="{ name: 'MovieDetail',  params: this.$store.state.detailartrcle }" v-if="(this.$route.params.method==='작성')">작성하기</router-link>
      <router-link class="text-white text-decoration-none" @click.native="updateArticle" :to="{ name: 'MovieDetail',  params: this.$store.state.detailartrcle}" v-else>수정하기</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ArticleForm',
  data: function () {
    return {
      title: this.$route.params.title,
      content: this.$route.params.content,
      article : this.$route.params,
      method: this.$route.params.method,
      user_id: this.$route.params.user_id,
    }
  },
  created: function () {
    console.log("this.article에 들어있는 정보")
    console.log(this.article)
  },
  methods : {
    createArticle : function () {
      console.log("this.article에 들어있는 정보")
      console.log(this.article)
      const info = {
        'title' : this.title,
        'content' : this.content,
        'movie_id' : this.article.movie_id,
        'user_id': this.user_id,
        'username' : this.username,
        'method' : 'post',
      }
      
      this.$store.dispatch('updateArticle', info)
    },
    updateArticle : function () {
      console.log("this.article에 들어있는 정보")
      console.log(this.article)
      const info = {
        'id': this.article.id,
        'title' : this.title,
        'content' : this.content,
        'movie_id' : this.article.movie.id,
        'user_id': this.article.user.id,
        'method' : 'put'
      }
      this.$store.dispatch('updateArticle', info)
    }
  }
}
</script>

<style>

</style>