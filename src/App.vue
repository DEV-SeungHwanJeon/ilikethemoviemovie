<template>
  <div id="app" class="bg-screen">
    <Navbar/>
    <router-view id="router-z"/>
    <Footer id="footer-z"/>
  </div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  data: function () {
    return {
      
    }
  },
  components: {
    Navbar,
    Footer,
  },
  
  methods: {
    
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  z-index: -1;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.bg-screen {
  background: url("../public/movie_screen.png") no-repeat center #000000;
  background-size: 100% auto;
}
#footer-z {
  z-index: 0;
}

#router-z {
  z-index: 1;
}
</style>
