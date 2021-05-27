<template>
  <div class="container">
    <p class="text-white fs-1 my-5">로그인</p>
    <div class="d-flex justify-content-center">
      <div class="col-8">
          <div class="input-group mb-5">
            <span class="input-group-text" id="basic-addon1">유저 이름 :</span>
            <input type="text" class="form-control" placeholder="유저 이름 작성" aria-label="username" aria-describedby="basic-addon1" v-model="username">
          </div>
          <div class="input-group mb-5">
            <span class="input-group-text" id="basic-addon2">비밀번호 :</span>
            <input type="password" class="form-control" placeholder="비밀번호 작성" aria-label="password" aria-describedby="basic-addon2" v-model="password">
          </div>
      </div>
    </div>
    <button class="btn btn-success">
      <router-link class="text-white text-decoration-none"  @click.native="Login" :to="{ name: 'Home'}">로그인하기</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      username: '',
      password: '',
    }
  },
  methods : {
    Login : function () {
      const userinfo = {
        'username': this.username,
        'password' : this.password,
      }
      // console.log(userinfo)
      this.$store.dispatch('Login', userinfo)
    }
  }
}
</script>

<style>

</style>