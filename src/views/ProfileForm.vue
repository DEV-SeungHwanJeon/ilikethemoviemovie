<template>
  <div>
    <h1 class="text-white display-2 my-5">My Page 수정하기</h1>
    <div class="d-flex my-5 justify-content-center">
      <div class="d-flex flex-column align-items-start my-5">
        <div class="input-group mb-2">
          <span class="input-group-text" id="basic-addon1">유저 ID :</span>
          <input type="text" size=100 class="form-control" placeholder="유저 ID 작성" aria-label="username" aria-describedby="basic-addon1" v-model="username">
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text" id="basic-addon2">유저 Email :</span>
          <input type="text" class="form-control" placeholder="(비어있음)" aria-label="email" aria-describedby="basic-addon2" v-model="email">
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text" id="basic-addon3">유저 First Name :</span>
          <input type="text" class="form-control" placeholder="(비어있음)" aria-label="first_name" aria-describedby="basic-addon3" v-model="first_name">
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text" id="basic-addon4">유저 Last Name :</span>
          <input type="text" class="form-control" placeholder="(비어있음)" aria-label="last_name" aria-describedby="basic-addon4" v-model="last_name">
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text" id="basic-addon5">유저 현재 비밀번호 확인 :</span>
          <input type="password" class="form-control" placeholder="현재 비밀번호를 작성하시오" aria-label="currentpassword" aria-describedby="basic-addon5" v-model="currentpassword">
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text" id="basic-addon6">변경할 비밀번호 :</span>
          <input type="password" class="form-control" placeholder="변경할 비밀번호를 작성하시오" aria-label="nextpassword" aria-describedby="basic-addon6" v-model="nextpassword">
        </div>
      </div>
    </div>
    <button class="btn btn-success btn-lg mt-5">
      <router-link class="text-white text-decoration-none" @click.native="updateUserInfo" :to="{ name: 'Home' }">내 정보 수정</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProfileForm',
  data: function () {
    return {
      // username: this.$route.params.username
      username: this.$store.state.userInfo.username,
      email: this.$store.state.userInfo.email,
      first_name : this.$store.state.userInfo.first_name,
      last_name : this.$store.state.userInfo.last_name,
      currentpassword : '',
      nextpassword : '',
    }
  },
  methods : {
    updateUserInfo : function () {
      const info = {
        username : this.username,
        email : this.email,
        first_name : this.first_name,
        last_name : this.last_name,
        currentpassword : this.currentpassword,
        nextpassword : this.nextpassword,
        user_id : this.$store.state.user_id,
      }
      this.$store.dispatch('updateUserInfo', info)
    }
  }
}
</script>

<style>

</style>