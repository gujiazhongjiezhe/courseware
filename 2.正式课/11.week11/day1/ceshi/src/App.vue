<template>
  <div id="app">
    <div id="nav">
      <home></home>
    </div>
    
  </div>
</template>
<script>
import home from '@/views/Home.vue';
export default {
  components:{
    home
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:url('./assets/logo.png')
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
