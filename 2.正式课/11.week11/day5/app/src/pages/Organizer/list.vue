<template>
  <div>我是员工列表页</div>
</template>
<script>
export default {
  created() {
    console.log("list-created");
  },
  destroyed() {
    console.log("list-destroyed");
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to,13);
    next()
    // react to route changes...
    // don't forget to call next()
  },
};
</script>
<style lang="less">
</style>