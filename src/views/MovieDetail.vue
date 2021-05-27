<template>
  <div class="container">
    <div class="mx-5 animate__animated animate__bounceInDown animate__slower">
      <h1 class="bg-transparent text-white pt-2">Movie Detail Page</h1>
      <div class="bg-transparent text-black d-flex justify-content-center align-items-center">
        <div class="col-12 card mb-3 mt-1 bordercolor-black" style="">
          <div class="row g-0 border-0" v-for="(detailmovie, idx) in this.$store.state.detailmovie" :key="idx">
            <div class="col-4 bordercolor-black">
              <img :src="detailmovie.poster_path" class="movie-img img-fluid rounded-start" alt="..." >
            </div>
            <div class="col-8">
              <div class="card-body">
                <h5 class="card-title fs-1">{{ detailmovie.title }}</h5>
                <div class="dropdown mb-2">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {{ ratingScore }}
                  </button>
                  <ul class="dropdown-menu genre-select-console" aria-labelledby="dropdownMenuButton1">
                    <li v-for="(score, idx) in scoreList" :key="idx">
                      <a class="dropdown-item" href="#" @click="ratingMovie(detailmovie.id, score)"> {{score}} </a>
                    </li>
                  </ul>
                </div>
                <hr>
                <div class="fs-5">
                  <span v-for="(genre,idx) in detailmovie.genre" :key="idx" class="mx-2">
                    {{genre.genre_name}}
                  </span>
                  <p class="mb-0">개봉일: {{ detailmovie.release_date }}</p>
                  <p> 
                    <span>인기도: {{ detailmovie.popularity }}</span>
                    <span class="mx-3">평점: {{ detailmovie.vote_average }}</span>
                    <span>투표수: {{ detailmovie.vote_count }}</span>
                  </p>
                </div>
                <hr>
                <div class="d-flex">
                  <div class="px-2">
                    <p class="fs-3 mt-2">줄거리</p>
                    <p class="card-text fs-6">{{ detailmovie.overview }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="term-transparent-top"></div>
      <img class="arrow" src="../../public/arrow.png" alt="">
      <div class="term-transparent-bottom"></div>
      <div class="mt-2 mb-5">
        <button class="btn btn-success btn-lg">
          <router-link class="text-white text-decoration-none" :to="{ name: 'NoticeBoard',  params: this.$store.state.detailmovie[0]}" @click.native="getArticles">해당 영화 게시판 보러가기</router-link>
        </button>
      </div>
      <div v-if="this.$store.state.needdata" class="pb-5">
        <h1 class="mt-5 pb-5"> 데이터가 부족합니다. 평점을 더 매겨주세요!</h1>
      </div>
      <div v-else class="pb-5">
        <h1 class="mt-5">비슷한 영화 추천</h1>
        <div class="d-flex">
          <MovieCard v-for="(detailmovie, idx) in this.$store.state.itemrecommendedlist" :key="idx" :detailmovie="detailmovie"/>
        </div>
      </div>
      

  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MovieDetail',
  data: function () {
    return { 
      genredict: this.$store.state.genredict,
      scoreList: [1,2,3,4,5,6,7,8,9,10] ,

      detailmovie : this.$store.state.detailmovie[0],
      // ratingScore : '평점 선택', 
    }
  },
  components: {
    MovieCard,
  },
  updated: function () {
    
    this.detailmovie = this.$store.state.detailmovie[0]
    this.setRating()
  },
  methods: {
    getRecommendation: function () {
      this.$store.dispatch('getMovieDetail', info)
      const info = {
        recommendmethod: 'item',
        obj_id: this.$store.state.detailmovie[0],
      }
      // console.log("Moviedetail")
      // console.log(this.$store.state.detailmovie[0].id)
      this.$store.dispatch('getRecommendation', info)
    },
    getArticles: function () {
      // console.log(`${this.$store.state.detailmovie[0].id} 영화의 article 요청하는 것`)
      this.$store.dispatch('getArticles', this.$store.state.detailmovie[0].id)
    },
    ratingMovie: function (movie_id, score) {
      // console.log(movie_id, score)
      // this.$store.state.ratingScore = score
      // this.ratingScore = score
      const info = {
        movie_id : movie_id,
        user_id: this.$store.state.user_id,
        score: score
      }
      this.$store.dispatch('ratingMovie', info)
    },
    setRating: function () {
      // const movie_id = this.detailmovie.id
      // console.log('this.detailmovie.id')
      // console.log(this.detailmovie)
      const info = {
        movie_id : this.detailmovie.id,
        user_id : this.$store.state.user_id
      }
      return this.$store.dispatch('getRating', info)
    },
  },
  computed : {
    ratingScore : function () {
      return this.$store.getters.getRatingScore
    }
  },
}
</script>

<style scoped>
.blackbgc {
  background-color: black;
  /* background: no-repeat center/30% url("../../public/film.png"); */
  
}

.bordercolor-black {
  border-color: black;
}

#page {
  height: 80vh;
  width: 60vw
}

.term-transparent-top {
  background-color: transparent;
  height: 150px;
}

.term-transparent-bottom {
  background-color: transparent;
  height: 60px;
}

.arrow {
  width: 70px;
  height: auto;
  animation: bounce; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s; /* don't forget to set a duration! */
  animation-iteration-count: infinite;
}
</style>