<template>
  <div>
    <!-- <div>这是我新建的页面</div>
    <span>这是我第二次新增的标签</span> -->
    <swiper indicator-dots :autoplay="true" :circular="true">
            <swiper-item v-for="item in list" :key="item">
                  {{item}}
            </swiper-item>
      
    </swiper>
    <van-button type="info">我是按钮</van-button>
  </div>
</template>

<script>


export default {
  data () {
    return {
      list:[1,2,3]
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped >

</style>
