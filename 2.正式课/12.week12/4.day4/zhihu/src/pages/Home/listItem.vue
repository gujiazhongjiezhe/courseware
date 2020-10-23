<template>
  <div class="itemBox">
    <h4 class="time">
      <span>{{item.date}}</span>
      <i></i>
    </h4>
    <ul class="content">
      <li class="item" v-for="ite in item.stories" :key="ite.id">
        <router-link :to="{path:`/detail/${ite.id}`}" >
          <div class="con">
            <h3>{{ite.title}}</h3>
            <p>{{ite.hint}}</p>
          </div>
          <div class="img">
            <img :src="ite.images[0]" alt="">
          </div>
        </router-link>
      </li>

    </ul>
  </div>
</template>
<script>
export default {
    props:{
      item:{
        defalut(){
          return {}
        }
      }
    }
}
</script>
<style lang="less" scoped>
  .itemBox {
    margin-top: .2rem;
    .time {
      box-sizing: border-box;
      position: relative;
      height: .6rem;
      padding-top: .3rem;
      span {
        position: absolute;
        left:0;
        top:.1rem;
        font-size:.3rem;
      }
      i {
        display: block;
        height: 1px;
        background: black;
        margin-left: 2rem;
        
      }
    }
    .content {
      .item {
        padding:.2rem 0;
        // background: rgba(0,0,0,.3);
        a {
          display:flex;
          justify-content: space-between;
          .con {
            
            width:76%;
            h3,p {
              font-size: .3rem;
              color:gray;
              // line-height: .4rem;
            }
          }
          .img {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: .05rem;
            background: gray;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
</style>