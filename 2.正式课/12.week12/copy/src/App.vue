<template>
  <div id="app">
    <!-- 头部主导航 -->
    <header class="headerBox" ref="headerBox">
      <h1 class="logo">CRM客户管理系统</h1>
      <el-menu
        mode="horizontal"
        class="el-menu-demo"
        background-color="#3A3D42"
        text-color="#FFF"
        active-text-color="#FFD04B"
        :default-active="activeIndex()"
      >
        <el-menu-item index="1">
          <router-link to="/custom">客户管理</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/system">系统设置</router-link>
        </el-menu-item>
      </el-menu>

      <div class="baseBox">
        <span >您好：蜘蛛侠</span>
        <a href="javascript:;" >修改密码</a>
        <a href="javascript:;" >安全退出</a>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="mainBox" ref="mainBox">
      <router-view></router-view>
    </main>

    <!-- DIALOG -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    activeIndex(){
      let hash = location.hash;
      if(hash.includes('custom')){
        return '1';
      }
      if(hash.includes('system')){
        return '2';
      }
    }
  },
  created() {},
  mounted() {
    let winH = document.documentElement.clientHeight,
      headerBox = this.$refs.headerBox,
      mainBox = this.$refs.mainBox;
    mainBox.style.height = winH - headerBox.offsetHeight + "px";
    this.$forceUpdate(); // 让视图强制刷新
  },
};
</script>

<style lang='less'>
html,
body,
#app {
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}

/* ==HEADER== */
@H: 62px;
.headerBox {
  display: flex;
  justify-content: space-between;
  height: @H;
  background: #3a3d42;
  overflow: hidden;

  .logo {
    width: 20%;
    line-height: @H;
    text-align: center;
    font-size: 20px;
    color: #fff;
    letter-spacing: 3px;
  }

  .baseBox {
    box-sizing: border-box;
    padding-right: 10px;
    width: 30%;
    line-height: @H;
    text-align: right;
    font-size: 16px;

    span,
    a {
      margin: 0 5px;
      color: #fff;
    }

    a {
      text-decoration: underline;
    }
  }

  .el-menu-demo {
    box-sizing: border-box;
    width: 46%;

    li {
      font-size: 16px !important;

      a {
        display: block;
        height: 100%;
      }
    }
  }
}

.mainBox {
  display: flex;
  overflow: hidden;
}
</style>