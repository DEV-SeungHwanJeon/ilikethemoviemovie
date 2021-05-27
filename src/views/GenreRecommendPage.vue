<template>
  <div class="container">
    <div id='page' class="bg-transparent mx-5 animate__animated animate__bounceInDown">
      <h1 class="text-white pt-4 mb-2">Genre Recommend Page</h1>
      <div class="text-black d-flex flex-column justify-content-center align-items-center">
        <div class="dropdown mt-3 mb-5">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            {{ this.selectedGenre }}
          </button>
          <ul class="dropdown-menu genre-select-console" aria-labelledby="dropdownMenuButton1">
            <li v-for="(genre_id, idx) in this.$store.state.genredict" :key="idx">
              <a class="dropdown-item" href="#" @click="getGenreMovieRecommend(idx, genre_id)"> {{genre_id}} </a>
            </li>
          </ul>
        </div>
        <div class="text-black d-flex">
          <div class="col-4 blackbgc bordercolor-black border-0" v-for="(movie,idx) in this.$store.state.genrerecommendedlist" :key="idx">
            <MovieCard class="mx-3" :detailmovie="movie"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'GenreRecommendPage',
  data: function () {
    return {
      genredict: this.$store.state.genredict,
      onGenreSelector: false,
      user_id: 1,
      selectedGenre: '장르 선택'
    }
  },
  components : {
    MovieCard,
  },
  created: function () {
    this.$store.state.genrerecommendedlist = []
  },
  methods : {
    clickGenreSelector: function () {
      this.onGenreSelector = !this.onGenreSelector
    },
    getGenreMovieRecommend: function (genre_id, genre) {
      // console.log("GENRE 추천페이지에서 GetRecommendation 요청")
      this.selectedGenre = genre
      const info = {
        recommendmethod: 'genre',
        genre_id: genre_id,
        user_id: this.user_id,
      }
      this.$store.dispatch('getRecommendation', info)
    },
    setMoviesId: function (movie_id) {
      // console.log("todayRecommendPage에서 받은 movie.id ")
      // console.log(movie_id)
      this.$store.dispatch('getMovieDetail', movie_id)
    },
  }
}
</script>

<style scoped>
.blackbgc {
  background-color: black;
}

.bordercolor-black {
  border-color: black;
}

.onGenreSelector {
  display: block;
}

.offGenreSelector {
  display: none;
}

.genre-select-console {
  height:170px;
  overflow-y: scroll;
}


</style>