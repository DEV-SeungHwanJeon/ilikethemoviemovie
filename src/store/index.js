import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'
import jwt_decode from "jwt-decode";

export default new Vuex.Store({
  state: {
    popularitymovies: [],
    indicator: '',
    recommendmethod: '',
    testImg: 'https://image.tmdb.org/t/p/w500//yvcNQv8fth51nWuaLwfpr50IRiO.jpg',
    emptycardindex: [],
    lastIndex: 99,
    rowlist: [],
    searchresult: [],
    todayrecommendedlist: [],
    genrerecommendedlist: [],
    userrecommendedlist: [],
    itemrecommendedlist: [],
    genredict: { 12: '모험',
                14: '판타지',
                16: '애니메이션',
                18: '드라마',
                27: '공포',
                28: '액션',
                35: '코미디',
                36: '역사',
                37: '서부',
                53: '스릴러',
                80: '범죄',
                99: '다큐멘터리',
                878: 'SF',
                9648: '미스터리',
                10402:	'음악',
                10749:	'로맨스',
                10751:	'가족',
                10752:	'전쟁',
                10770:	'TV 영화'},
    detailmovie: [],
    detailmoviename: '',
    detailmovieid: 0,
    needdata: false,
    articles: [],
    detailarticle: {},
    detailarticlecomments: [],
    isLogin: false,
    userName: '',
    user_id: 0,
    isArticles: false,
    ratingScore: '평점 선택',
    userInfo: {},
    userneeddata: false,
  },
  mutations: {
    SEARCH_QUERY: function (state, movies) {
      state.searchresult = movies
    },
    GET_MOVIES: function (state, data) {
      // console.log(data)
      // console.log('mutations 에서의 indicator')
      // console.log(data.indicator)
      // console.log(typeof(data.indicator))
      if (data.indicator === 'popularity') {
        state.indicator = 'Popularity Ranking'
      } else if (data.indicator === 'vote_average') {
        state.indicator = 'Vote Ranking'
      } else if (data.indicator === 'now_playing') {
        state.indicator = '현재상영작'
      } else if (data.indicator === 'upcoming') {
        state.indicator = '상영예정작'
      } else {
        state.indicator = '오류인듯'
      }
      data.movies.forEach(movie => {
        movie.poster_path = 'https://image.tmdb.org/t/p/original/' + movie.poster_path
      })
      state.popularitymovies = data.movies
      const temp = []
      if (data.movies.length%3) {
        for (let index = 0; index < 3-(data.movies.length%3); index++) {
          temp.push(index);
        }
      }
      state.emptycardindex = temp
      // console.log(temp)
      state.lastIndex = parseInt(state.popularitymovies.length/3)
      console.log(parseInt(state.popularitymovies.length/3))
      const temp2 = []
      for (let index = 0; index < state.lastIndex+1; index++) {
        temp2.push(index);
      }
      state.rowlist = temp2
      // console.log(temp2)
    },
    GET_RECOMMENDATION: function (state, data) {
      if (data==="데이터부족") {
        state.needdata = true
        state.userneeddata = true
      } else {
        state.needdata = false
        state.userneeddata = false
        // console.log(data.recommendmethod)
        data.movies.forEach(movie => {
          movie.poster_path = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
        })
        
        if (data.recommendmethod=="today") {
          state.recommendmethod = "Today "
          state.todayrecommendedlist = data.movies
          
        } else if (data.recommendmethod=="genre") {
          state.recommendmethod = "Genre "
          state.genrerecommendedlist = data.movies
        } else if (data.recommendmethod=="item") {
          state.recommendmethod = "Item "
          state.itemrecommendedlist = data.movies
        } else if (data.recommendmethod=="user") {
          state.recommendmethod = "User "
          state.userrecommendedlist = data.movies
          // console.log(`유저기반 추천 결과`)
          // console.log(state.userrecommendedlist)
        }
      }
    },
    GET_MOVIE_DETAIL: function (state, movie) {
      // console.log(movie)
      state.detailmoviename=movie.title
      state.detailmovieid = movie.id
      movie.poster_path = 'https://image.tmdb.org/t/p/original/' + movie.poster_path
      const temp = []
      temp.push(movie)
      state.detailmovie = temp
    },
    GET_ARTICLES: function (state, articles) {
      // console.log("mutation에 잘 도착한 articles")
      state.articles = articles
    },
    // GET_COMMENTS: function (state, data) {
    //   console.log(state)
    //   console.log(data)
    // },
    CREATE_ARTICLE: function (state, data) {
      // console.log(data)
      state.detailarticle = data
    },
    UPDATE_ARTICLE: function (state, data) {
      state.detailarticle = data
    },
    DELETE_ARTICLE: function (state, data) {
      console.log(`${data}가 삭제되었습니다. ${state}`)
    },
    GET_USERID: function (state, data) {
      state.user_id = data.id
    },
    GET_RATING: function (state, data) {
      state.ratingScore = data.score
    },
    GET_RATING_FAILED: function (state, err) {
      console.log(err)
      state.ratingScore = "평점 선택"
    },
    GET_USERINFO: function (state, data) {
      // console.log(`${data}를 state.userInfo로`)
      state.userInfo = data
    },
    // UPDATE_USERINFO: function (state, data) {
    //   console.log(state, data)
    // },
    // UPDATE_USERINFO_FAILED: function (state) {
    //   console.log(state)
    // }
  },
  actions: {
    getMovies: function ({commit}, indicator) {
      const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/movieapps/movies/${indicator}/`
      // console.log(URL)
      axios({
        method: 'get',
        url: URL,
        // headers: this.setToken(),
      })
        .then((res) => {
          const data = {
            movies : res.data,
            indicator : indicator
          }
          commit('GET_MOVIES', data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    searchQuery: function ({commit}, query) {
      if (query != '') {
        const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/movieapps/search/${query}/`
        axios({
          method: 'get',
          url: URL,
          // headers: this.setToken(),
        })
          .then((res) => {
            commit('SEARCH_QUERY', res.data)
          })
          .catch(() => {
            commit('SEARCH_QUERY', [])
          })
        }
    },
    getRecommendation: function ({commit}, info) {
      // console.log(info)
      let URL = ''
      if (info.recommendmethod === "today") {
        URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/movieapps/recommendation/${info.recommendmethod}/`
      } else if (info.recommendmethod === "genre") {
        URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/movieapps/recommendation/${info.recommendmethod}/user/${info.user_id}/genre/${info.genre_id}/`
      } else {
        URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/movieapps/recommendation/${info.recommendmethod}/object/${info.obj_id}/` // 
      }
      axios({
        method: 'get',
        url: URL,
        // headers: this.setToken(),
      })
        .then((res) => {
          // console.log('axios 요청 결과')
          // console.log(res)
          if ((info.recommendmethod==="today") || (info.recommendmethod==="genre")) {
            info = {...info, movies: res.data}
            commit('GET_RECOMMENDATION', info)
          } else {
            // console.log(res)
            if (res.data!="데이터부족") {
              info = {...info, movies: res.data}
              commit('GET_RECOMMENDATION', info)
            } else {
              commit('GET_RECOMMENDATION', '데이터부족')
            }
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    getMovieDetail: function ({commit}, movie_id) {
      const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/movieapps/movie/${movie_id}/`
      axios({
        method: 'get',
        url: URL,
        // headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res)
          commit('GET_MOVIE_DETAIL', res.data)
        })
        .catch((err) => {
          console.error(err)
        })
      },
    getArticles: function ({commit}, movie_id) {
      const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/communities/movie/${movie_id}/articles/` // ${movie_id}
      axios({
        method: 'get',
        url: URL,
        // headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res)
          // console.log(`GET_ARTICLES (${movie_id} id의 영화)`)
          this.state.isArticles = true
          commit('GET_ARTICLES', res.data)
        })
        .catch((err) => {
          console.error(err)
          this.state.articles = []
          this.state.isArticles = false
        })
      },
    // getComments: function ({commit}, articles) {
    //   console.log(`articles ${articles}`)
    //   for (let index = 0; index < articles.length; index++) {
    //     const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/communities/article/${articles[index].id}/comments/`
    //     console.log(URL)
    //     axios({
    //       method: 'get',
    //       url: URL,
    //       // headers: this.setToken(),
    //     })
    //       .then((res) => {
    //         console.log(`GET_COMMENTS (${articles[index].id} id의 게시글의 댓글)`)
    //         console.log(res)
    //         // commit('GET_COMMENTS', res.data, index)
    //       })
    //       .catch((err) => {
    //         console.log(commit)
    //         console.error(err)
    //       })
    //   }
    // },
    updateArticle: function ({commit}, info) {
      // console.log('index.js에 나와있는 info')
      // console.log(info)
      const formdata = new FormData()
      if (info.method ==='post') {
        formdata.append('title', info.title)
        formdata.append('content', info.content)
        formdata.append('user', info.user_id)
        formdata.append('movie', info.movie_id)
        const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/communities/movie/${info.movie_id}/user/${info.user_id}/article/`
        axios({
          method: 'post',
          url: URL,
          data: formdata,
          // headers: this.setToken(),
        })
          .then((res) => {
            // console.log(res)
            commit('CREATE_ARTICLE', res.data)
          })
          .catch((err) => {
            console.log(commit)
            console.error(err)
          })
      } else {
        formdata.append('id', info.id)
        formdata.append('title', info.title)
        formdata.append('content', info.content)
        formdata.append('user', info.user_id)
        formdata.append('movie', info.movie_id)
        const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/communities/movie/${info.movie_id}/user/${info.user_id}/article/`
        axios({
          method: 'put',
          url: URL,
          data: formdata,
          // headers: this.setToken(),
        })
          .then((res) => {
            // console.log(res)
            commit('UPDATE_ARTICLE', res.data)
          })
          .catch((err) => {
            console.log(commit)
            console.error(err)
          })
      }

    },
    deleteArticle: function ({commit}, info) {
      const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/communities/movie/${info.movie_id}/user/${info.user_id}/article/`
      const formdata = new FormData()
      formdata.append('id', info.id)
      axios({
        method: 'delete',
        url: URL,
        data: formdata,
        // headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res)
          commit('DELETE_ARTICLE', res.data)
        })
        .catch((err) => {
          console.log(commit)
          console.error(err)
        })
    },
    Signup : function ({commit}, userinfo) {
      const URL = `https://ilikethemoviemovie.herokuapp.com/accounts/signup/`
      const formdata = new FormData()
      formdata.append('username', userinfo.username)
      formdata.append('password', userinfo.password)
      formdata.append('passwordConfirmation', userinfo.passwordConfirmation)
      axios({
        method: 'post',
        url: URL,
        data: formdata,
        // headers: this.setToken(),
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(commit)
          console.error(err)
        })
    },
    Login : function ({commit}, userinfo) {
      const URL = `https://ilikethemoviemovie.herokuapp.com/accounts/login/`
      const formdata = new FormData()
      formdata.append('username', userinfo.username)
      formdata.append('password', userinfo.password)
      axios({
        method: 'post',
        url: URL,
        data: formdata,
        // headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res.data)
          this.state.isLogin = true
          localStorage.setItem('jwt', res.data.token)
          const token = localStorage.getItem('jwt')
          const decoded = jwt_decode(token)
          this.state.userName = decoded.username
          console.log('유저네임', this.state.userName)
          axios({
            method: 'get',
            url: `https://ilikethemoviemovie.herokuapp.com/accounts/getuserid/${this.state.userName}/`,
            // headers: this.setToken(),
            })
              .then((res) => {
                // console.log('user_id야 나와라')
                // console.log(res.data)
                commit('GET_USERID', res.data)
              })
        })
        .catch((err) => {
          console.log(commit)
          console.error(err)
        })
    },
    ratingMovie : function ({commit},info) {
      const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/movieapps/movie/${info.movie_id}/user/${info.user_id}/rating_movie/`
      const formdata = new FormData()
      formdata.append('movie', info.movie_id)
      formdata.append('user', info.user_id)
      formdata.append('score', info.score)
      axios({
        method: 'post',
        url: URL,
        data: formdata,
        // headers: this.setToken(),
      })
        .then((res) => {
          commit('GET_RATING',res.data.score)
        })
        .catch((err) => {
          console.log(commit)
          console.error(err)
        })
    },
    getRating: function ({commit}, info) {
      // console.log(`평점 가져올 영화 ID ${info.movie_id}`)
      const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/movieapps/movie/${info.movie_id}/user/${info.user_id}/rating_movie/`
      
      return axios({
        method: 'get',
        url: URL,
        // headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res.data)
          commit('GET_RATING', res.data)
          
        })
        .catch((err) => {
          console.error(err)
          commit("GET_RATING_FAILED", err)
        })
    },
    getUserInfo : function ({commit}, user_id) {
      const URL = `https://ilikethemoviemovie.herokuapp.com/accounts/profile/userinfo_change/${user_id}/`
      axios({
        method: 'get',
        url: URL,
        // headers: this.setToken(),
      })
        .then((res) => {
          // console.log(res.data)
          commit('GET_USERINFO', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateUserInfo : function ({commit}, userinfo) {
      const URL = `https://ilikethemoviemovie.herokuapp.com/accounts/profile/userinfo_change/${userinfo.user_id}/`
      const formdata = new FormData()
      
      formdata.append('user', userinfo.user_id)
      formdata.append('username', userinfo.username)
      formdata.append('email', userinfo.email)
      formdata.append('first_name', userinfo.first_name)
      formdata.append('last_name', userinfo.last_name)
      formdata.append('currentpassword', userinfo.currentpassword)
      formdata.append('nextpassword', userinfo.nextpassword)
      axios({
        method: 'put',
        url: URL,
        // headers: this.setToken(),
        data: formdata,
      })
        .then(() => {
          // console.log(res.data)
          // commit('UPDATE_USERINFO', res.data)
          console.log('유저정보 변경 성공')
        })
        .catch((err) => {
          console.error(err)
          console.error(commit)
          // commit('UPDATE_USERINFO_FAILED')
        })
    },
    pjtInit : function ({commit}) {
      const URL = `https://ilikethemoviemovie.herokuapp.com/api/v1/movieapps/pjtinit/`
      axios({
        method: 'get',
        url: URL,
        // headers: this.setToken(),
      })
        .then((res) => {
          console.log(res.data, commit)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },

  getters: {
    getRatingScore : function (state) {
      return state.ratingScore
    },
    getDetailMovie : function (state) {
      
      return state.detailmovie[0]
    },
  },
  modules: {
    
  }
})
