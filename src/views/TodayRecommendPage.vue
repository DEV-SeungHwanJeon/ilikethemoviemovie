<template>
  <div class="container">
    <div class="bg-transparent mx-5 animate__animated animate__bounceInDown animate__slower">
      <h1 class="text-white pt-3 mb-5">Today Recommend Page</h1>
      <div class="text-black d-flex">
        <div class="col-4 border-0" v-for="(movie, idx) in this.$store.state.todayrecommendedlist" :key="idx">
          <MovieCard class="mx-3" :detailmovie="movie"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'TodayRecommendPage',
  components: {
    MovieCard,
  },
  data: function () {
    return {
      genredict: this.$store.state.genredict,
    }
  },
  methods: {
  },
}
</script>

<style scoped>
.blackbgc {
  background-color: black;
}


.bordercolor-black {
  border-color: black;
}

</style>