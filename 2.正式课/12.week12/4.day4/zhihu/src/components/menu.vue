<template>
  <nav class="navBox">
    <router-link to="/home">
      <span>首页</span>
    </router-link>
     <router-link to="/detail">
      <span>详情</span>
    </router-link>
     <router-link to="/personal">
      <span>我的</span>
    </router-link>
     <router-link to="/notice">
      <span>通知</span>
    </router-link>
  </nav>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
    .navBox {
      // background: orangered;
      border-top:1px solid black;
      height: 10vh;
      width: 100%;
      position: fixed;
      bottom:0;
      left:0;
      display: flex;
      font-size:.5rem;
      text-align: center;
      align-items: center;
      background: white;
      a { // a标签就是routerlink组件
        flex:1
      }
      a.router-link-active {
        color:red
      }
    }
</style>