<template>
  <div>
      您当前访问的路径不存在~~~
      <!-- <router-link to="/home">点击回到首页</router-link> -->
      <button @click="fn"></button>
  </div>
</template>
<script>
export default {
    methods:{
      fn(){
        console.log(this);
        // this.$router.back(); // 后退
        // this.$router.forward() // 前进
        // this.$router.go(n) // 既可以前进也可以后退指定的路由
        this.$router.push('/customer'); // push可以传递指定的路由从而跳转到指定的页面
      }
    }
}
</script>
<style lang="less">
  
</style>