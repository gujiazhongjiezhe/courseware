<template>
  <div class="header">
    <div class="base">
      <span class="time">
        {{ handleTime(time)[0]}}
        <em>{{ handleTime(time)[1]}}</em>
      </span>
      <h1 class="title">知乎日报</h1>
    </div>
    <div class="user">
      <img src="" alt="" />
    </div>
  </div>
</template>
<script>
import {formatTime} from '../assets/utils'
export default {
  data(){
    // '20201023'
    return {
      time: formatTime(new Date())
    }
  },
  methods:{
    // 从字符串时间里提取出想要的月和日
    handleTime(time){
      let month = parseInt(time.substr(4,2)) ; // 截取月份
      let day = time.substr(6); // 截取日
      let arr = ['','一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']

      return [day,arr[month]];
      // ['23','十月']
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  // background: salmon;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;

  // 左边样式
  .base {
    display: flex;
    align-items: center;
    font-size: 0.34rem;
    .time {
      text-align: center;

      padding-right: 0.2rem;
      em {
        display: block;
        font-style:normal;
        font-weight: bold;
      }
    }
    .title {
    border-left:1px solid black;
    padding-left:.2rem;

    }
  }
  // 右边样式
  .user {
    width: 0.6rem;
    height: 0.6rem;
    background: url("../assets/images/timg.jpg") no-repeat center center;
    background-size: 100% 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

// 如果img的src是空，那就不让img显示
img[src=''] {
  display: none;
}
</style>