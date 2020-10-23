<template>
  <div class="box">
    <!-- 头部 -->
    <my-header></my-header>

    <!-- 轮播图部分 -->
    <my-swiper :bannerData="bannerData"></my-swiper>

    <!-- 列表部分 -->
    <van-skeleton title :row="5" v-if="!newsData.length" />
    <div class="newsBox" v-else>
      <!-- my-list-item是每一天的数据展示 -->
      <my-list-item
        v-for="item in newsData"
        :key="item.date"
        :item="item"
      ></my-list-item>
      <div class="flag" v-if="!flag">正在加载中</div>
    </div>
  </div>
</template>
<script>
import myHeader from "../../components/header";
import mySwiper from "./swiper";
import myListItem from "./listItem";
import { latest, before } from "../../api/index";
import { formatTime, delay } from "../../assets/utils";
export default {
  name:'Home',
  components: {
    myHeader,
    mySwiper,
    myListItem,
  },
  data() {
    return {
      flag: true,
      time: "", // 当以后发送请求过往的数据的时候当做时间标识
      bannerData: [],
      newsData: [
        // { 这是一天的对象
        //   date:'20201023',
        //   stories:[{},{},{这是小新闻}]
        // }
      ],
    };
  },
  methods: {
    getMore() {
      if (!this.flag) {
        return;
      }
      let app = document.getElementById("app");
      let realHeight = app.offsetHeight; // 内容真实的高度
      let winH = document.documentElement.clientHeight; // 屏幕的高度；
      let scoT = document.documentElement.scrollTop; // 滚定条卷曲的高度
      if (scoT + winH + 100 >= realHeight) {
        // 当此条件成立时，说明永不已经滚定到底部了，需要再次进行加载数据，发送接口请求
        // console.log("您到底部了");
        this.flag = false;
        this.lazyLoad();
      }
    },
    async lazyLoad() {
      await delay();

      // 请求过往的数据
      let time = this.time; // '20201023'-->标准的时间，然后减去一天的时间，-->在转回来 '20201022'
      time = time.match(/^(\d{4})(\d{2})(\d{2})$/); // ['20201023','2020','10,'23']
      time = formatTime(
        new Date(new Date(`${time[1]}/${time[2]}/${time[3]}`) - 86400000)
      );
      // console.log(time);
      let { date, stories } = await before(time);

      this.newsData.push({
        date: date,
        stories: stories,
      });
      // console.log(date, 666666);
      this.time = date;
      this.flag = true;
    },
  },
  async created() {
    window.addEventListener("scroll", this.getMore);
    // await后面是一个promise实例，当promise实例变为成功态以后，会把resolve的实参返回，这里拿对象进行解构
    // 而且变成成功态以后，await下边的代码才会执行
    let { stories, top_stories, date } = await latest();

    this.bannerData = top_stories;
    this.time = date;
    this.newsData.push({
      date: date,
      stories: stories,
    });
  },
};
</script>
<style lang="less" scoped>
.box {
  // background: rgba(0, 0, 0, 0.2);
  padding-bottom: 10vh;
  .newsBox {
    padding: 0.2rem;
    // background: wheat;
  }
}
.flag {
  height: 10vh;
  background: greenyellow;
  text-align: center;
  line-height: 10vh;
}
</style>