<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <router-link class="text-dark text-decoration-none" :to="{name: 'ArticleDetail', params: this.article}" @click.native="getArticleDetail">{{this.article.title}}</router-link>
    
    
    <span class="badge bg-primary rounded-pill">{{this.article.user.username}}</span>
  </li>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: Object
  },
  created: function () {
    // console.log('ARticleitem의 this.article')
    // console.log(this.article)
  },
  methods : {
    getArticleDetail : function () {
      // console.log("getArticleDetail")
      // console.log(this.article)
      this.$store.state.detailarticle = this.article
    }
  }
}
</script>

<style>

</style>