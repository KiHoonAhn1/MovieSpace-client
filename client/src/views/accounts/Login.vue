<template>
  <div class="mx-auto container">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="input-group tm-mb-30">
            <input name="username" type="text" class="form-control rounded-0 border-top-0 border-end-0 border-start-0" placeholder="아이디" v-model="credentials.username">
        </div>
        <div class="input-group tm-mb-30">
            <input name="password" type="password" class="form-control rounded-0 border-top-0 border-end-0 border-start-0" placeholder="비밀번호" v-model="credentials.password"  @keyup.enter="login(credentials)">
        </div>
        <div class="input-group justify-content-end">
            <input type="button" class="btn btn-primary tm-btn-pad-2" value="Send" @click="login(credentials)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      }
    }
  },
  methods: {
    login: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$store.dispatch()
          console.log(this.credentials.username)
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
/* Login CSS Start */
.tm-contact-left {
    padding-right: 55px;
}

.form-control {
    font-size: 1.2rem;
    padding: 15px 0;
}

.form-control,
.form-control:focus {
    color: white;
    background-color: transparent;
}

.form-control:focus {
    border-bottom: 1px solid dark;
    outline: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.form-control::-webkit-input-placeholder { color: white; }
.form-control:-moz-placeholder { color: white; }
.form-control::-moz-placeholder { color: white; }
.form-control:-ms-input-placeholder { color: white; }

.tm-mb-30 {
    margin-bottom: 30px;
}

.tm-mb-45 {
    margin-bottom: 45px;
}

.tm-btn-pad-2 {
    padding: 10px 38px;
}

.btn {
    font-size: 1.3rem;
    padding: 13px 23px;
    border-radius: 0;
}

.btn-primary {
    background-color: white;
    border: none;
    color: #333;
}

.btn-primary:hover,
.btn-primary:focus {
    color: dark;
    background-color: white;
}

input:focus::placeholder {
  color: grey;
}
/* Login CSS end */
</style>