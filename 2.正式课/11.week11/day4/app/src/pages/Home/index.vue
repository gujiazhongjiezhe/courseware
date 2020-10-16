<template>
  <div>
      我是home组件(我是首页)
  </div>
</template>
<script>
export default {
  beforeCreate(){
    console.log('beforeCreate');
  },
  created() {
      console.log('created');
  },
  beforeMount(){
    console.log('beforeMount');
  },
  mounted(){
     console.log('mounted');
  },
  destroyed(){
    console.log('destroyed');
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnte',to , from);
    next();
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
   beforeRouteLeave (...ary) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log('beforeRouteLeave');
    ary[2]()
  }
}
</script>
<style lang="less">
  
</style>