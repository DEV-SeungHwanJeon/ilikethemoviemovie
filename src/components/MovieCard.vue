<template>
  <div class="card mb-2 border-0" @mouseover="onPicture" @mouseleave="offPicture">
    <img :src="detailmovie.poster_path" class="card-img-top position-relative" id="movie-img" alt="..." 
      :class="{beopacity: this.isHovered}"
    >
    <div class="card-body position-absolute text-black" v-if="this.isHovered">
      <br>
      <div class="d-flex flex-column justify-content-center">
        <router-link class="text-dark text-decoration-none fs-3" active-class="route-move" @click.native="getRecommendation(detailmovie)" to="/moviedetail">{{ detailmovie.title }}</router-link>
        
        <div class="card-text">
          <span v-for="(genre,idx) in detailmovie.genre" :key="idx" class="mx-1">{{genre.genre_name}}</span>
        </div>
        <p class="card-text m-0"  > 인기 점수 : {{ detailmovie.popularity }}</p>
        <p class="card-text mt-0 mb-4"> 개봉일 : {{ detailmovie.release_date }}</p>
        <p class="card-text">{{ detailmovie.overview | truncate(100, '...') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  data: function () {
    return {
      isHovered: false,
      genredict: this.$store.state.genredict,
    }
  },
  props: {
    detailmovie : Object,
  },
  created: function () {
    console.log(`이거 장르임 ${this.detailmovie.genre}`)
  },
  methods: {
    onPicture: function () {
      this.isHovered = true
    },
    offPicture: function () {
      this.isHovered = false
    },
    setMoviesId: function (movie_id) {
      console.log(movie_id)
      this.$store.dispatch('getMovieDetail', movie_id)
      
    },
    getRecommendation: function (detailmovie) {
      console.log("moviecard에서 getRecommendation")
      console.log(detailmovie)
      const obj_id = detailmovie.id
      const info = {
        recommendmethod: 'item',
        obj_id: obj_id,
      }
      this.$store.state.detailmovie = [detailmovie]
      console.log("moviecard에서 getRecommendation에 넘겨주는 info")
      console.log(info)
      this.$store.dispatch('getRecommendation', info)
      window.scrollTo(0,0);
      const userandmovieinfo = {
        movie_id : obj_id,
        user_id : this.$store.state.user_id,
      }
      this.$store.dispatch('getRating', userandmovieinfo)
    }
  }
}
</script>

<style>
.beopacity {
    opacity: 0.15;
    /* background-color: rgba(200,200,200, 0.3); */
  }

</style>