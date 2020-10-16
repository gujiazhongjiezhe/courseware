<template>
  <div id="app">
    <!-- 头部 -->
    <header class="header">
      <div class="title">crm客户管理系统</div>
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1"
          ><router-link to="/home">首页</router-link></el-menu-item
        >
        <!-- router-link行间的to属性就是控制页面hash值的改变，要和router中index.js中的path保持一致 -->
        <el-menu-item index="2"
          ><router-link to="/organizer">组织结构</router-link></el-menu-item
        >
        <el-menu-item index="3"
          ><router-link to="/customer/3">客户管理</router-link></el-menu-item
        >
      </el-menu>
    </header>

    <!-- 显示页面级组件地方 -->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // active:'2'
    };
  },
  components: {},
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  // height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .header {
    position: relative;
    height: 10vh;
    .title {
      position: absolute;
      left: 10px;
      z-index: 1;
      line-height: 61px;
      color: white;
      height: 100%;
    }
    .el-menu-demo {
      padding-left: 200px;
      height: 100%;
    }
  }
  .container {
    height: 80vh;
    // background: orangered;
  }
}
</style>
