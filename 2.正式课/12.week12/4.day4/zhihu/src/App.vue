<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>

    <!-- 这里存放的是导航组件 -->
    <my-menu></my-menu>
  </div>
</template>

<script>
import myMenu from "./components/menu";
export default {
  components: {
    myMenu,
  },
};
</script>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #f4f4f4;
}

#app {
  margin: 0 auto;
  max-width: 750px;
  min-height: 100%;
  background: #f4f4f4;
}
</style>