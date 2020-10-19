<template>
  <div class="container">
    <div class="leftBox">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#343D4A"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeIndex()"
        @select="changeRoute"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <span>我的客户</span>
            </el-menu-item>
            <el-menu-item index="1-2" v-power="msg">
              <span>所有客户</span>
            </el-menu-item>
            <el-menu-item index="1-3" >
              <span>新增客户</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <!--右侧内容-->
    <div class="rightBox">
      <!-- KEEP-ALIVE组件可以保证路由切换的时候，当前组件不销毁 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg:'allcustomer'
    };
  },
  methods: {
    activeIndex(){
      let href = location.href;
      if(href.includes('/custom/handle')){
        return '1-3'
      }
      if(href.includes('/custom/list')){
        let {type} = this.$route.query
        if(type === 'my'){
          return '1-1';
        }
        return '1-2';
      }
    },
    changeRoute(index){
      console.log(index);
      let ary = [
        '/custom/list?type=my',
        '/custom/list?type=all',
        '/custom/handle'
      ];
      index = index.slice(2) - 1; // '1 2 3' // 拿到当前获取页面对应路径的索引
      // 'http://127.0.0.1:8080/#/custom/list?type=all'
      if(location.href.includes(ary[index])) return; // 因为路由不允许跳转的路径和当前的一样，所以为了取消这个页面的爆红，如果跳转的路径一样，就不让他跳转了
      this.$router.push(ary[index]);
    }
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;

  .leftBox {
    width: 18%;
    height: 100%;
    min-width:200px;
    // background: #343d4a;
  }

  .rightBox {
    width: 82%;
    height: 100%;
    background: red;
  }
}
</style>