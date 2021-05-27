<template>
  <div class="container">
    <div class="rankingpopularity mx-5 animate__animated animate__bounceInDown animate__slower">
      <h1 class="text-white carousel-indicatortitle display-1 animate__animated animate__pulse"> {{ this.$store.state.indicator }}</h1>
      <MovieCarousel class="container my-5"/>
    </div>
  </div>
</template>

<script>
import MovieCarousel from '@/components/MovieCarousel.vue'

export default {
  name: 'Ranking',
  components: {
    MovieCarousel
  },
  data: function () {
    return {
      
    }
  },
  method: {
  }
  

}
</script>


<style>
.rankingpopularity {
  background-color: black ;
  /* background: no-repeat center/30% url("../../public/film.png"); */
  height: 87%;
}
</style>