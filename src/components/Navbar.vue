<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand homepagetitle" href="#">
        <router-link to="/" class="text-dark text-decoration-none fs-1 homepagetitle">
          <p class="fs-5 m-0">I Like The</p>
          <p class="fs-5 m-0">Movie Movie</p>
        </router-link>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item dropdown" @mouseover="onPopVoteRankingDropDown" @mouseleave="offPopVoteRankingDropDown">
            <a class="nav-link fs-4" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              영화인기순위
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" @mouseover="onPopVoteRankingDropDown" @mouseleave="offPopVoteRankingDropDown" :class="{ onnavbar: this.onpopvoteranking, offnavbar: !this.onpopvoteranking}">
              <li>
                <router-link class="dropdown-item text-dark text-decoration-none" @click.native="setMoviesIndicator('popularity')" to="/ranking">
                  인기 순위
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <router-link class="dropdown-item text-dark text-decoration-none" @click.native="setMoviesIndicator('vote_average')" to="/ranking">
                  투표 순위
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown" @mouseover="onNowUpcomeRankingDropDown" @mouseleave="offNowUpcomeRankingDropDown">
            <a class="nav-link py-0" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <p class="fs-5 m-0">현재상영작</p>
              <p class="fs-5 m-0">상영예정작</p>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" @mouseover="onNowUpcomeRankingDropDown" @mouseleave="offNowUpcomeRankingDropDown" :class="{ onnavbar: this.onnowupcomeranking, offnavbar: !this.onnowupcomeranking}">
              <li>
                <router-link class="dropdown-item text-dark text-decoration-none" @click.native="setMoviesIndicator('now_playing')" to="/ranking">
                  현재상영작
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <router-link class="dropdown-item text-dark text-decoration-none" @click.native="setMoviesIndicator('upcoming')" to="/ranking">
                  상영예정작
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item dropdown" @mouseover="onRecommendationDropDown" @mouseleave="offRecommendationDropDown">
            <a class="nav-link fs-4" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              영화추천받기
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" @mouseover="onRecommendationDropDown" @mouseleave="offRecommendationDropDown" :class="{ onnavbar: this.onrecommendation, offnavbar: !this.onrecommendation}">
              <li>
                <router-link class="dropdown-item text-dark text-decoration-none" @click.native="getTodayRecommendation" to="/todayrecommendpage">
                  오늘의 추천
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <router-link class="dropdown-item text-dark text-decoration-none" to="/genrerecommendpage">
                  장르별 추천
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <div class="d-flex">

          <form class="d-flex align-items-center" >
            <li class="nav-item dropdown list-no-mark" >
              <input id="searchconsole" class="form-control me-2" type="search" placeholder="영화 제목을 입력하시오." aria-label="Search" 
                @input="searchQuery" @keypress.esc="offSearchDropDown" @focus="searchQuery" v-model="query" size=30
              >
              <div v-if="this.onsearch" :class="{ onnavbar: this.onsearch, offnavbar: !this.onsearch}">
                <ul class="dropdown-menu searchresultconsole" aria-labelledby="navbarDropdown" :class="{ onnavbar: this.query.length, offnavbar: !this.query.length}">
                  <li v-for="(movie, idx) in this.$store.state.searchresult" :key="idx" >
                    <!-- <a class="dropdown-item text-dark text-decoration-none" to="/moviedetail" @click="clickMovieTitle" @blur="offSearchDropDown" :movie_id="movie.id">{{movie.title}}</a> -->
                    <router-link class="dropdown-item text-dark text-decoration-none" @click.native="setMoviesId(movie.id)" @blur.native="offSearchDropDown" :movie_id="movie.id" to="/moviedetail">{{movie.title}} </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <button class="btn btn-outline-success navbar-search-btn fs-4 py-0 me-5" type="submit">Search</button>
          </form>

          <ul class="navbar-nav ms-2 mb-2 mb-lg-0 align-items-center" v-if="!this.$store.state.isLogin">
            <li class="nav-item">
              <router-link class="nav-link fs-4 text-decoration-none" to="/login">
                Login
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link fs-4 text-decoration-none" to="/signup">
                Sign Up
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-2 mb-2 mb-lg-0 align-items-center" v-else>
            <li class="nav-item">
              <router-link :userName="this.userName" class="nav-link fs-4 text-decoration-none" to="/profile" @click.native="getRecommendation">
                {{ userName }} 님
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link fs-4 text-decoration-none" @click.native="logout" to="/login">
                Logout
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: 'Navbar',
  data: function () {
    return {
      onpopvoteranking: false,
      onnowupcomeranking: false,
      onrecommendation: false,
      onsearch: false,
      query: '',
      userName: this.$store.state.userName,
    }
  },
  methods: {
    clickMovieTitle: function (event) {
      // console.log('클릭됐어용')
      // console.log(event.target.innerText)
      const movie_id = Number(event.target.attributes.movie_id.value)
      this.onsearch = !this.onsearch
      this.$store.dispatch('getMovieDetail', movie_id)

    },
    onPopVoteRankingDropDown: function() {
      this.onpopvoteranking = true
    },
    offPopVoteRankingDropDown: function() {
      this.onpopvoteranking = false
    },
    onNowUpcomeRankingDropDown: function() {
      this.onnowupcomeranking = true
    },
    offNowUpcomeRankingDropDown: function() {
      this.onnowupcomeranking = false
    },
    onRecommendationDropDown: function() {
      this.onrecommendation = true
    },
    offRecommendationDropDown: function() {
      this.onrecommendation = false
    },
    onSearchDropDown: function() {
      this.onsearch = true
    },
    offSearchDropDown: function() {
      this.onsearch = false
    },
    setMoviesId: function (movie_id) {
      this.$store.dispatch('getMovieDetail', movie_id)
      // this.onsearch = false
      this.query = ''
    },
    setMoviesIndicator: function (indicator) {
      this.$store.dispatch('getMovies', indicator)
    },
    getRecommendation: function () {
      this.$store.dispatch('getMovieDetail', info)
      const info = {
        recommendmethod: 'user',
        obj_id: this.$store.state.user_id,
      }
      // console.log("Moviedetail")
      // console.log(this.$store.state.detailmovie[0].id)
      this.$store.dispatch('getRecommendation', info)
    },
    getTodayRecommendation: function () {
      const info = {
        recommendmethod: 'today',
        obj_id: this.$store.state.user_id,
      }
      // console.log("Moviedetail")
      // console.log(this.$store.state.detailmovie[0].id)
      this.$store.dispatch('getRecommendation', info)
    },
    
    searchQuery: function (event) {
      this.onsearch = true
      this.query = event.target.value
      if(this.query.length !== 0) { 
        clearTimeout(this.debounce)
        this.debounce = setTimeout(() => { 
          this.$store.dispatch('searchQuery', this.query)
        }, 100)
      } else { 
        clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
          this.$store.state.searchresult = []
        }, 100)
      } 
    },
    
    logout: function () {
      this.$store.state.isLogin= false
      localStorage.removeItem('jwt')
    }
  },
  created: function () {
    const token = localStorage.getItem('jwt')
    if (token) {
      this.$store.state.isLogin = true
      const decoded = jwt_decode(token)
      // console.log('decoded')
      // console.log(decoded)
      this.$store.state.userName = decoded.username
      this.userName = decoded.username
    } else {
      this.$store.state.isLogin = false
    }
  },
  updated: function () {
    const token = localStorage.getItem('jwt')
    if (token) {
      this.$store.state.isLogin = true
      const decoded = jwt_decode(token)
      // console.log('decoded')
      // console.log(decoded)
      this.$store.state.userName = decoded.username
      this.userName = decoded.username
    } else {
      this.$store.state.isLogin = false
    }
  }
}

</script>

<style scoped>
  .onnavbar {
    display: block;
  }
  .offnavbar {
    display: none;
  }
  .searchresultconsole {
    height:150px;
    overflow-y: scroll;
  }
  .list-no-mark {
    list-style: none;
    padding-left: 0px;
  }
  #searchconsole {
    outline: black;
  }
</style>