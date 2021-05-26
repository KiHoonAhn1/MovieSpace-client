<template>
<!-- CSS only -->
  <div id="app">
    <!-- style을 줘서 해결을 하긴 했는데 글씨가 잘 안 보이는 문제가 있다. -->
    <video autoplay muted loop id="bg-video">
      <source src="@/assets/v1.mp4" type="video/mp4">
    </video>
    <!-- 'bg-transparent'가 배경 투명하게 하는 것 -->
    <div id="nav" class="navbar navbar-expand-lg navbar-light bg-transparent">
      <div class="container-fluid">
        <router-link to="/" class="nav-link">
          <a class="navbar-brand" style="font-size:30px;" href="#">
            <img src="@/assets/rocket.jpg" alt="" style="width:30px; border-radius:15px;">
            Movie Space
          </a>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/movielist" class="nav-link">추천</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                게시판
              </a>
              <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#">최근 한줄평</a>
                </li>
                <li>
                  <router-link to="/articleList" class="dropdown-item">게시판</router-link>
                </li>
                <li><hr class="dropdown-divider bg-light"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form id="search-content" class="nav-item">
            <input type="text" name="input" class="search-input" id="search-input">
            <button type="reset" class="search" id="search-btn"></button>
          </form>
          <!-- mouseover style을 줘야 한다. -->
          <div class="nav-item navbar p-0" v-if="isLogin">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img class="me-2" :src="user.image" style="width:40px; height:40px; border-radius:20px;" v-if="user.image">
              <img class="me-2" src="@/assets/img.jpg" style="width:40px; height:40px; border-radius:20px;" v-else>
              {{ user.username }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end bg-dark mt-4" style="font-size:20px;" aria-labelledby="navbarDropdown">
              <li @click="getAnotherUser">
                <a class="dropdown-item" href="#">내 정보</a>
              </li>
              <li><a class="dropdown-item" href="#">플레이리스트</a></li>
              <li><hr class="dropdown-divider bg-light"></li>
              <li>
                <a @click="logout" class="dropdown-item" href="#">로그아웃</a>
              </li>
            </ul>
          </div>
          <span v-else class="nav-item navbar">
            <ul class="navbar">
              <li class="navbar-nav">
                <router-link to="/login" class="nav-link">로그인</router-link>
              </li>
              <li class="navbar-nav">
                <router-link to="/signup" class="nav-link">회원가입</router-link>
              </li>
            </ul>
          </span>   
        </div>
      </div>
    </div>
    <router-view @login="isLogin = true" :key="$route.fullPath" />
  </div>
</template>
<script>
/* 일단 cdn으로 붙여넣었는데 axios오류... 어떡할까... */
import axios from 'axios'
import { mapState } from 'vuex'

const URL = 'http://127.0.0.1:8000/movies/'

export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
      username: 'user',
    }
  },
  created: function () {
    axios.get(URL)
      .then(response => {
        this.$store.dispatch('getMovies', response.data)
        return response
      })
      .catch(error => {
        console.log(error)
      })
    // token이 있으면 로그인 처리
    const token = localStorage.getItem('jwt')
    if (token) {
      this.isLogin = true
    }
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/movies/genres/',
      data: {},
      headers: this.setToken()
    })
    .then((res)=> {
      this.$store.dispatch('getGenres', res.data)
    })
  },
  /* DOM이 모두 구성된 후에 인식할 수 있으므로 mounted 사용 */
  mounted: function () {
    const input = document.querySelector("#search-input");
    const searchBtn = document.querySelector("#search-btn");
    
    const expand = () => {
      searchBtn.classList.toggle("close");
      input.classList.toggle("square");
    };
    searchBtn.addEventListener("click", expand);
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$store.dispatch('logout')
      this.$router.push({ name: 'Login' })
    },
    getAnotherUser: function () {
      this.$store.dispatch('getAnotherUser', this.user)
      this.$router.push({ name: 'Profile' }).catch(() => {
        this.$router.go(this.$router.currentPage)
      })
    },
    /* 이곳에 methods로 검색 기능 넣어줘야 함 */
  },
  computed: {
    ...mapState ([
      'user',
    ]),
  },

}

</script>
<!-- CSS only -->
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* color: #2c3e50; */
    /* 혹시 몰라 위에 color 안 지움. */
    color: white;
  }

  #nav {
    font-size: 15px;
    padding: 20px;
    padding-right: 0px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
    color: white;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
    font-weight: bold;
  }

  /* 비디오 background로 보여주기 */
  #bg-video {
    position: fixed;
    left: 50%;
    top: 50%;
    bottom: auto;
    right: auto;
    min-width: 100%;
    min-height: 100%;
    transform: translateX(-50%) translateY(-50%);
    z-index: -100;
    background-image: url(assets/astro.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

/*  */
/* 여기부터 Search Box 관련 CSS */
/*  */
/* 나중에 absolute 위치와 글씨 크기를 조정해서 레이아웃을 깔끔하게 만들어야 한다. */
  #search-content {
    text-align: start;
    position: absolute;
    height: 50px;
    width: 300px;
    margin-left: 170px;
    top: 77%;
    right: -20%;
    transform: translate(-50%, -50%);
  }

  #search-content.on {
    -webkit-animation-name: in-out;
    animation-name: in-out;
    -webkit-animation-duration: 0.7s;
    animation-duration: 0.7s;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
  }

  .search-input {
    text-align: start;
    box-sizing: border-box;
    /* 이곳과 search, close, square 등 건드려서 크기 조절 */
    width: 50px;
    height: 50px;
    border: 4px solid #ffffff;
    border-radius: 50%;
    background: none;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    font-family: Roboto;
    outline: 0;
    -webkit-transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
      padding 0.2s;
    transition: width 0.4s ease-in-out, border-radius 0.8s ease-in-out,
      padding 0.2s;
    -webkit-transition-delay: 0.4s;
    transition-delay: 0.4s;
    -webkit-transform: translate(-100%, -50%);
    -ms-transform: translate(-100%, -50%);
    transform: translate(-100%, -50%);
  }

  .search {
    background: none;
    position: absolute;
    top: 0px;
    left: 0;
    height: 50px;
    width: 50px;
    padding: 0;
    border-radius: 100%;
    outline: 0;
    border: 0;
    color: inherit;
    cursor: pointer;
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
    -webkit-transform: translate(-100%, -50%);
    -ms-transform: translate(-100%, -50%);
    transform: translate(-100%, -50%);
  }

  .search:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 4px;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    margin-top: 26px;
    margin-left: 17px;
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
  }

  .close {
    -webkit-transition: 0.4s ease-in-out;
    transition: 0.4s ease-in-out;
    -webkit-transition-delay: 0.4s;
    transition-delay: 0.4s;
  }

  .close:before {
    content: "";
    position: absolute;
    width: 27px;
    height: 4px;
    margin-top: -1px;
    margin-left: -13px;
    background-color: #fff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
  }

  .close:after {
    content: "";
    position: absolute;
    width: 27px;
    height: 4px;
    background-color: #fff;
    margin-top: -1px;
    margin-left: -13px;
    cursor: pointer;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .square {
    box-sizing: border-box;
    padding: 0 40px 0 10px;
    width: 300px;
    height: 50px;
    border: 4px solid #ffffff;
    border-radius: 0;
    background: none;
    color: #fff;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    outline: 0;
    -webkit-transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
      padding 0.2s;
    transition: width 0.4s ease-in-out, border-radius 0.4s ease-in-out,
      padding 0.2s;
    -webkit-transition-delay: 0.4s, 0s, 0.4s;
    transition-delay: 0.4s, 0s, 0.4s;
    -webkit-transform: translate(-100%, -50%);
    -ms-transform: translate(-100%, -50%);
    transform: translate(-100%, -50%);
  }
/*  */
/* 여기까지 Search Box 관련 CSS */
/*  */

/*  */
/* 여기부터 profile 관련 CSS */
/*  */

/*  */
/* 여기까지 profile 관련 CSS */
/*  */
</style>