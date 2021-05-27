<template>
  <div>
    <h1 class="text-white mt-2">My Page</h1>
    <div class="d-flex mt-2">
      <div class="col-4"></div>
      <div class="d-flex flex-column align-items-start">
        <p class="text-white fs-4 p-0 m-0" v-if="this.$store.state.userInfo.username">유저 ID : {{ this.$store.state.userInfo.username }} </p>
        <p class="text-white fs-4 p-0 m-0" v-else>유저 ID : (비어있음) </p>
        <p class="text-white fs-4 p-0 m-0" v-if="this.$store.state.userInfo.email">유저 Email : {{ this.$store.state.userInfo.email }} </p>
        <p class="text-white fs-4 p-0 m-0" v-else>유저 Email : (비어있음) </p>
        <p class="text-white fs-4 p-0 m-0" v-if="this.$store.state.userInfo.first_name">유저 First Name : {{ this.$store.state.userInfo.first_name }} </p>
        <p class="text-white fs-4 p-0 m-0" v-else>유저 First Name : (비어있음) </p>
        <p class="text-white fs-4 p-0 m-0" v-if="this.$store.state.userInfo.last_name">유저 Last Name : {{ this.$store.state.userInfo.last_name }} </p>
        <p class="text-white fs-4 p-0 m-0" v-else>유저 Last Name : (비어있음) </p>
      </div>
      <div class="col-1"></div>
      <div>
        <button class="btn btn-success btn-lg mt-2">
          <router-link class="text-white text-decoration-none" :to="{ name: 'ProfileForm',  params: this.$store.state.userInfo}">내 정보 수정</router-link>
        </button>
      </div>
    </div>
    <div>
      <div v-if="(this.$store.state.userneeddata)" class="">
        <h1 class="text-white"> 데이터가 부족합니다. 평점을 더 매겨주세요!</h1>
      </div>
      <div v-else class="container w-50 mt-4 pb-5">
        <h3 class="text-white">비슷한 취향의 유저들이 본 영화</h3>
        <div class="d-flex justify-content-center">
          <MovieCard v-for="(detailmovie, idx) in this.$store.state.userrecommendedlist" :key="idx" :detailmovie="detailmovie" id="control-height"/>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'Profile',
  data: function () {
    return {
    }
  },
  components : {
    MovieCard,
  },
  created: function () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo : function () {
      this.$store.dispatch('getUserInfo', this.$store.state.user_id)
    }
  }
}
</script>

<style>

</style>