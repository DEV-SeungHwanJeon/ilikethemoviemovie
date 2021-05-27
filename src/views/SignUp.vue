<template>
  <div class="container">
    <p class="text-white fs-1 my-5">회원가입</p>
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
          <div class="input-group mb-5">
            <span class="input-group-text" id="basic-addon3">비밀번호 확인 :</span>
            <input type="password" class="form-control" placeholder="비밀번호 확인 작성" aria-label="password" aria-describedby="basic-addon3" v-model="passwordConfirmation">
          </div>
      </div>
    </div>
    <button class="btn btn-success" @click="Signup">
      <router-link class="text-white text-decoration-none" :to="{ name: 'Login'}">가입하기</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data: function () {
    return {
      username: '',
      password: '',
      passwordConfirmation : '',
    }
  },
  methods : {
    Signup : function () {
      const userinfo = {
        'username': this.username,
        'password' : this.password,
        'passwordConfirmation' : this.passwordConfirmation,
      }
      // console.log(userinfo)
      this.$store.dispatch('Signup', userinfo)
    }
  }
}
</script>

<style>

</style>