<template>
  <div class="container">
    <!-- 左边是菜单导航 -->
    <div class="left">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>员工管理</span>
          </template>
          <el-menu-item index="1-1"><router-link to="/organizer/list?name=1">员工列表</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/organizer/add?type=2">新增员工</router-link></el-menu-item>
        </el-submenu>
         <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>部门管理</span>
          </template>
          <el-menu-item index="2-1">部门列表</el-menu-item>
          <el-menu-item index="2-2">新增部门</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!-- 右边是显示区域 -->
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" >
  .container {
    display: flex;
  }
  .left {
    width:20vw;
     .el-menu-vertical-demo {
    height: 100%;
  }
  }
  .right {
    width:77vw;
    // background: green;
  }

 
</style>