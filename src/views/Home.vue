<template>
  <div class="home">
    <div class="container">
      <div class="d-flex animate__animated animate__bounceInDown" style="margin-top : 130px;">
        <div class="row">
          <div id="largepill" class="display-1">
            <span class="text-dark badge rounded-pill bg-warning">
              <router-link class="text-dark text-decoration-none" @click.native="setMoviesIndicator('popularity')" to="/ranking">
                인기 순위
              </router-link>
            </span>
          </div>
          <div class="display-1">
            <span class="badge rounded-pill bg-danger">
              <router-link class="text-dark text-decoration-none" @click.native="setMoviesIndicator('vote_average')" to="/ranking">
                투표 순위
              </router-link>
            </span>
          </div>
          <div class="display-1">
            <span class="badge rounded-pill bg-success">
              <router-link class="text-dark text-decoration-none" @click.native="setMoviesIndicator('now_playing')" to="/ranking">
                현재상영작
              </router-link>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="display-1">
            <span class="badge rounded-pill bg-primary">
              <router-link class="text-dark text-decoration-none" @click.native="setMoviesIndicator('upcoming')" to="/ranking">
                상영예정작
              </router-link>
            </span>
          </div>
          <div class="display-1">
            <span class="text-dark badge rounded-pill bg-info">
              <router-link class="text-dark text-decoration-none" @click.native="getRecommendation('today')" to="/todayrecommendpage">
                오늘의 추천
              </router-link>
            </span>
          </div>
          <div class="display-1">
            <span class="text-dark badge rounded-pill bg-light">
              <router-link class="text-dark text-decoration-none" to="/genrerecommendpage">
                장르별 추천
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import jwt_decode from "jwt-decode";

export default {
  name: 'Home',
  components: {
    
  },
  created: function () {
    this.$store.dispatch('pjtInit')
    const token = localStorage.getItem('jwt')
    if (token) {
      this.$store.state.isLogin = true
      const decoded = jwt_decode(token)
      this.$store.state.userName = decoded.username
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/getuserid/${this.$store.state.userName}/`,
        // headers: this.setToken(),
        })
          .then((res) => {
            this.$store.state.user_id = res.data
          })
      this.getRecommendation()
    } else {
      this.$store.state.isLogin = false
      this.$store.state.userName = ''
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>

.display-1 {
  height: 200px;
}

/* #largepill {
  height: 200px;
} */
</style>