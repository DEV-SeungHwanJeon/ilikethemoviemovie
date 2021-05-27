<template>
  <div id="screen" class="d-flex flex-column">
    <div class="d-flex">
      <button class="side-btn text-black" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>

      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" role="listbox">
          <MovieCarouselRows v-for="index in this.$store.state.rowlist" :key="index" :index="index" class="animate__animated animate__bounceInRight animate__slow"/>
        </div>
      </div>
      
      <button class="side-btn" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>

    </div>
    <div class="">
      <button type="button" data-bs-target="#carouselExampleIndicators" 
        v-for="index in this.$store.state.rowlist" :key="index" :data-bs-slide-to="index.toString()" :class="{active: index===0}" :aria-current="{true: index==0}" :aria-label="`Slide ${index+1}`">
      </button>
    </div>
  </div>
  
</template>


<script>
import MovieCarouselRows from '@/components/MovieCarouselRows.vue'

export default {
  name: 'MovieCarousel',
  data: function () {
    return {
    } 
  },
  components: {
    MovieCarouselRows,
  },
  methods: {
    clickImg : function (idx) {
      this.$store.dispatch('clickImg', idx)
    },
    isClicked : function (idx) {
      console.log('isClicked')
      console.log(this.$store.state.clicked)

      return !this.$store.state.clicked[idx]
    }
  },
}
</script>


<style>

.bgc-w {
  background-color: white;
}

.isClicked {
  display: none;
}

.text-div-background {
  background-color: rgba(200, 200, 200, 0.7);
}

.side-btn {
  background-color: black;
  border: 0;
}

</style>