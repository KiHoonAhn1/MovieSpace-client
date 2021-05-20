<template>
<!-- CSS only -->
  <div id="app">
    <!-- style을 줘서 해결을 하긴 했는데 글씨가 잘 안 보이는 문제가 있다. -->
    <video autoplay muted loop id="bg-video">
      <source src="@/assets/gfp-astro-timelapse.mp4" type="video/mp4">
    </video>
    <!-- 'bg-transparent'가 배경 투명하게 하는 것 -->
    <div id="nav" class="navbar navbar-expand-lg navbar-light bg-transparent">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/movielist" class="nav-link">MovieList</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                탐색하기
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">최근 한줄평</a></li>
                <li><a class="dropdown-item" href="#">게시판</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <router-link to="/movielist" class="nav-link">My list</router-link>
          <!-- mouseover function 줘야 한다. dropdown 나오는 위치도 이상함 -->
          <div class="nav-item">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              탐색하기
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">최근 한줄평</a></li>
              <li><a class="dropdown-item" href="#">게시판</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>      
          </div>   
        </div>
      </div>
    </div>
    <router-view/>
    <div id="body">
      <form id="content">
        <input type="text" name="input" class="input" id="search-input">
        <button type="reset" class="search" id="search-btn"></button>
      </form>
    </div>
  </div>
  
</template>
<script>

export default {
  mounted: function() {
  const input = document.querySelector("#search-input");
  const searchBtn = document.querySelector("#search-btn");
  
  const expand = () => {
    searchBtn.classList.toggle("close");
    input.classList.toggle("square");
  };
  searchBtn.addEventListener("click", expand);
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
    color: #2c3e50;
    color: dark;
  }

  #nav {
    padding: 40px;
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
    background-image: url(assets/tm-astro-bg.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

#content {
  position: absolute;
  height: 50px;
  width: 300px;
  margin-left: 170px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#content.on {
  -webkit-animation-name: in-out;
  animation-name: in-out;
  -webkit-animation-duration: 0.7s;
  animation-duration: 0.7s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: 1;
  animation-iteration-count: 1;
}

/* 왜 body에 주면 작동하고 본인한테 직접 주면 상속된 속성에 먹히는지 질문 */
#body {
  text-align: start;
}

input {
  text-align: start;
  box-sizing: border-box;
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


</style>