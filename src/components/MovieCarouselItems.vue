<template>
  <div class="col-md-4" :class="{'clearfix': !(val%3), 'd-none': !(val%3), 'd-md-block': !(val%3)}">
    <div class="card mb-2 border-0" @mouseover="onPicture" @mouseleave="offPicture">
      <img :src="movie.poster_path" class="card-img-top position-relative" id="movie-img" alt="..." 
        :class="{beopacity: this.isHovered}"
      >
      <div class="card-body position-absolute text-black" v-if="this.isHovered">
        <br>
        <div class="d-flex flex-column justify-content-center">
          <h1 v-if="compareIndicator('Popularity Ranking')">{{ this.$store.state.popularitymovies.indexOf(movie)+1 }}위</h1>
          <h1 v-if="compareIndicator('Vote Ranking')">{{ this.$store.state.popularitymovies.indexOf(movie)+1 }}위</h1>
          <h4 class="card-text" v-if="compareIndicator('Popularity Ranking')"> 인기 점수 : {{ movie.popularity }}</h4>
          <h4 class="card-text" v-if="compareIndicator('Vote Ranking')"> 투표 평균 점수 : {{ movie.vote_average }}</h4>
          <h4 class="card-text" v-if="compareIndicator('현재상영작')"> 개봉일 : {{ movie.release_date }}</h4>
          <h4 class="card-text" v-if="compareIndicator('상영예정작')"> 개봉일 : {{ movie.release_date }}</h4>
          <br>
          <br>
          <router-link class="text-dark text-decoration-none fs-3" active-class="route-move" @click.native="getRecommendation(movie)" to="/moviedetail">{{ movie.title }}</router-link>
          
          <p class="card-text">{{ movie.overview | truncate(100, '...') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCarouselItems',
  props: {
    movie: Object,
    val: Number,
    idx: Number,
  },
  data: function () {
    return {
      isHovered: false
    }
  },
  methods: {
    onPicture: function () {
      this.isHovered = true
    },
    offPicture: function () {
      this.isHovered = false
    },
    compareIndicator: function (indicator) {
      return this.$store.state.indicator === indicator
    },
    getRecommendation: function (detailmovie) {
      // console.log("moviecard에서 getRecommendation")
      // console.log(detailmovie)
      const obj_id = detailmovie.id
      const info = {
        recommendmethod: 'item',
        obj_id: obj_id,
      }
      this.$store.state.detailmovie = [detailmovie]
      // console.log("moviecard에서 getRecommendation에 넘겨주는 info")
      // console.log(info)
      this.$store.dispatch('getRecommendation', info)
    }
  }
}
</script>

<style>
  .beopacity {
    opacity: 0.15;
    /* background-color: rgba(200,200,200, 0.3); */
  }
  .content-title {
    font-family: 'Single Day'!important;
  }

  #movie-img {
    /* width: 100%; */
    height: 500px;
    background-color: black;
  }
  
</style>