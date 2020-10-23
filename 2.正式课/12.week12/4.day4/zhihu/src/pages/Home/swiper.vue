<template>
  <div class="swiper">
    <van-swipe indicator-color="red" :loop="true" v-if="bannerData.length">
      <van-swipe-item v-for="item in bannerData" :key="item.id">
        <router-link :to="{path:`/detail/${item.id}`}" class="item">
          <img :src="item.image" />
          <div class="desc">
            <p>{{item.title}}</p>
            <p>{{item.hint}}</p>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  props: {
    bannerData: {
      default() {
        return [];
      },
    },
  },
};
</script>
<style lang="less" scoped>
.swiper {
  height: 5rem;
  .van-swipe {
    height: 100%;
  }
  /deep/.van-swipe__indicators {
    left: 80%;
  }
  /deep/ .van-swipe__indicator {
    background-color: green;
  }

  .item {
    display: block;
    position: relative;
    height: 100%;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .desc {
      box-sizing: border-box;
      position: absolute;
      // height: 2rem;
      width: 100%;
      // background: rgba(0,0,0,.7);
      background: -webkit-linear-gradient(
        top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.9)
      );
      left: 0;
      bottom: 0;
      padding: 0.3rem;
      p {
        font-size: 0.4rem;
        color: white;
        &:nth-child(2) {
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>