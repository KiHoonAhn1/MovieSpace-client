<template>
  <div class="mx-auto container">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="input-group tm-mb-30">
          <input name="username" type="text" class="form-control rounded-0 border-top-0 border-end-0 border-start-0" placeholder="아이디" v-model="credentials.username" required>
        </div>
        <div class="input-group tm-mb-30">
          <input name="password" type="password" class="form-control rounded-0 border-top-0 border-end-0 border-start-0" placeholder="비밀번호" v-model="credentials.password" required>
        </div>
        <div class="input-group tm-mb-30">
          <input name="passwordConfirmation" type="password" class="form-control rounded-0 border-top-0 border-end-0 border-start-0" placeholder="비밀번호 확인" v-model="credentials.passwordConfirmation" required>
        </div>
        <div class="input-group tm-mb-30">
          <input name="lastname" type="text" class="form-control rounded-0 border-top-0 border-end-0 border-start-0" placeholder="이름" v-model="credentials.last_name" required>
        </div>
        <div class="input tm-mb-30" @click="text">
          <b-form-datepicker id="signup" v-model="credentials.birth" class="form-control rounded-0 border-top-0 border-end-0 border-start-0 text-white"></b-form-datepicker>
        </div>
        <div class="input-group justify-content-end">
          <input type="button" class="btn btn-primary tm-btn-pad-2" value="Send" @click="signup()">
        </div>
      </div>
    </div>
  </div>           
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
        last_name: null,
        birth: null,
      }
    }
  },
  methods: {
    // 왜 send 버튼을 누르는데 한번에 이동되지 않고 2번 클릭해야 넘어갈까?
    signup: async function () {
      await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: this.credentials,
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          alert('정보를 모두 입력해주세요.')
        })
        /* jwt obtain 회원가입, 로그인 함께 처리하는 방법 고려 */
      await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
        .then(res => {
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
      // axios 요청을 너무 많이 보내는 것 같은데 괜찮을지 질문.
      await axios.get(`http://127.0.0.1:8000/accounts/${this.credentials.username}`)
        .then(res => {
          this.$store.dispatch('getUser', res.data)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    text: function () {
      const label = document.querySelector('#signup__value_')
      label.setAttribute('class', 'form-control text-dark')
    }
  },

}
</script>
<style scoped>
/* Signup CSS Start */
.tm-contact-left {
    padding-right: 55px;
}

.form-control {
    color: white;
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
    color: white;
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

.tm-btn-pad-2:hover {
    color: green;
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

/* Signup CSS end */
</style>