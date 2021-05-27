<template>
  <div class="carousel-item" :class="{active: !index}">
    <div class="row" v-if="compareIndicator('Popularity Ranking')">
      <MovieCarouselItems v-for="(movie, idx) in this.$store.state.popularitymovies.slice(3*this.index,3*this.index+3)"
        :key="idx" :idx="idx+1" :movie="movie" class="col-md-4"/>

      <div class="col-md-4 clearfix d-none d-md-block">
        <div class="card mb-2 border-0" v-if="this.index===(parseInt(this.$store.state.popularitymovies.length,3))">
          <div style="position:absolute; background-color:rgba(0, 0, 0, 1); z-index:10; height:100%; width:100% "></div>
          <img id="movie-img" :src="this.$store.state.testImg" class="card-img-top invisible-card position-relative" alt="..." >
        </div>
      </div>
    </div>

    <div class="row" v-if="compareIndicator('Vote Ranking')">
      <MovieCarouselItems v-for="(movie, idx) in this.$store.state.popularitymovies.slice(3*this.index,3*this.index+3)"
        :key="idx" :idx="idx+1" :movie="movie" class="col-md-4"/>

      <div class="col-md-4 clearfix d-none d-md-block">
        <div class="card mb-2 border-0" v-if="this.index===(parseInt(this.$store.state.popularitymovies.length,3))">
          <div style="position:absolute; background-color:rgba(0, 0, 0, 1); z-index:10; height:100%; width:100% "></div>
          <img id="movie-img" :src="this.$store.state.testImg" class="card-img-top invisible-card position-relative" alt="..." >
        </div>
      </div>
    </div>

    <div class="row" v-if="compareIndicator('현재상영작')">
      <MovieCarouselItems v-for="(movie, idx) in this.$store.state.popularitymovies.slice(3*this.index,3*this.index+3)"
        :key="idx" :idx="idx+1" :movie="movie" class="col-md-4"/>

      <div class="col-md-4 clearfix d-none d-md-block">
        <div class="card mb-2 border-0" v-if="this.index===(parseInt(this.$store.state.popularitymovies.length,3))">
          <div style="position:absolute; background-color:rgba(0, 0, 0, 1); z-index:10; height:100%; width:100% "></div>
          <img id="movie-img" :src="this.$store.state.testImg" class="card-img-top invisible-card position-relative" alt="..." >
        </div>
      </div>
    </div>

    <div class="row" v-if="compareIndicator('상영예정작')">
      <MovieCarouselItems v-for="(movie, idx) in this.$store.state.popularitymovies.slice(3*this.index,3*this.index+3)"
        :key="idx" :idx="idx+1" :movie="movie" class="col-md-4"/>

      <div class="col-md-4 clearfix d-none d-md-block">
        <div class="card mb-2 border-0" v-if="this.index===(parseInt(this.$store.state.popularitymovies.length,3))">
          <div style="position:absolute; background-color:rgba(0, 0, 0, 1); z-index:10; height:100%; width:100% "></div>
          <img id="movie-img" :src="this.$store.state.testImg" class="card-img-top invisible-card position-relative" alt="..." >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCarouselItems from '@/components/MovieCarouselItems.vue'
export default {
  name: 'MovieCarouselRows',
  data: function () {
    return {
    }
  },
  props: {
    index: Number,
  },
  components: {
    MovieCarouselItems,
  },
  methods: {
    compareIndicator: function (indicator) {
      return this.$store.state.indicator === indicator
    }
  },
}
</script>

<style>
  .invisible-card {
    opacity: 0;
    background-color: black;
    z-index: 1;
  }

  #movie-img {
    height: 500px;
  }
</style>