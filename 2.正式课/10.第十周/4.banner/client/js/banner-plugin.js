// 左右小耳朵组件
const bannerButton = {
  data() {
    return {

    }
  },
  props: {
    handle: {
      type: Function
    }
  },
  methods: {
    change(flag) {
      // this.handle(flag);
      this.$emit('ss', flag);
    }
  },
  template: `
  <div>
    <a href="javascript:;" class="button-prev" @click="change()"></a>
    <a href="javascript:;" class="button-next" @click="change(true)"></a>
  </div>

  `
}

const bannerFocus = {
  data() {
    return {

    }
  },
  props:["data","index","changeIndex"],
  created(){
    // console.log(this.data);
    // console.log(this.changeIndex);
  },
  methods:{
    isActive(id){
        // if(this.index === this.data){
        //   return id === 0
        // }
        // return id === this.index;
        let flag = this.index === this.data ? 0 : this.index;
        // 如果当前从父组件传递过来的index是3，那证明是克隆的第一张的图片(第一张图片的索引是0)，应该把0赋值给flag
        return flag === id;
        
    },
    change(id){
      this.changeIndex(id);
    }
  },
  template: `
  <div class="pagination">
    <span :class="{active:isActive(id)}" v-for="(item,id) in data" :key="id" @click="change(id)"></span>
</div>
  `
};

const banner = {
  data() {
    let ss = [...this.data, this.data[0]];
    let index = this.index;
    return {
      bannerData: ss,
      activeIndex: index,
      sty: {
        width: ss.length * 1000 + 'px',
        left: -index * 1000 + 'px',
        transition: `left ${this.speed}ms linear`
      }
    }
  },
  methods: {
    autoMove() {
      this.activeIndex++;
      if (this.activeIndex >= this.bannerData.length) {
        this.activeIndex = 0;
        this.sty.left = 0 + 'px';
        this.sty.transition = `left 0ms linear`;
        // nextTick里的回调函数会等到视图层渲染完成之后在执行
        this.$nextTick(function () {
          this.$refs.wrapper.offsetWidth;
          this.activeIndex = 1;
          this.sty.left = -this.activeIndex * 1000 + 'px';
          this.sty.transition = `left ${this.speed}ms linear`;
        });
        return;
      }
      this.sty.left = -this.activeIndex * 1000 + 'px';
      this.sty.transition = `left ${this.speed}ms linear`;
    },
    autoTimer(flag) {
      if (flag) {
        clearInterval(this.timer);
      }
      else {
        console.log(6666);
        this.timer = setInterval(this.autoMove, this.interval);
      }
    },
    handleButton(flag) {
      // 当点击右边的按钮，让图片正常轮播就可以
      if (flag) {
        this.autoMove();
      }
      else {
        this.activeIndex--;

        if (this.activeIndex <0) {
          // 如果activeIndex小于0说明用户已经点击到最左边了，
          // 把图片迅速移动到最后一张，这时候第一张和最后一张是一样的，用户感知不到，(把过度动画改为0)，
          // 之后，在把过度动画改回来，把activeIndex改为倒数第二张
          this.sty.transition = `left 0ms linear`;
          this.sty.left = -(this.bannerData.length-1)*1000 + 'px';
      
          // nextTick里的回调函数会等到视图层渲染完成之后在执行
          this.$nextTick(function () {
            this.$refs.wrapper.offsetWidth;
            this.activeIndex = this.bannerData.length-2; // 倒数第二张的索引
            this.sty.left = -this.activeIndex * 1000 + 'px';
            this.sty.transition = `left ${this.speed}ms linear`;
          });
          return;
        }
        this.sty.left = -this.activeIndex * 1000 + 'px';
        this.sty.transition = `left ${this.speed}ms linear`;

      }

    },
    changeIndex(id){
      this.activeIndex = id;
      this.sty.left = -this.activeIndex * 1000 + 'px';
    }
  },
  mounted() {
    // 为啥在这里启动定时器，因为这时候页面的视图已经渲染完成了
    // this.timer是给当前组件的实例上增加属性
    this.timer = setInterval(this.autoMove, this.interval);
    this.init(this);
  },
  updated(){
    this.transitioned(this);
  },
  props: {
    focus: {
      // 控制焦点是否显示的
      type: Boolean,
      default: true,
    },
    button: {
      // 控制左右耳朵是否显示
      type: Boolean,
      default: true,
    },
    data: {
      // 轮播的图片的数据
      type: Array,
      required: true,
      default: []
    },
    interval: {
      // 图片切换的时间间隔
      type: Number,
      default: 2000
    },
    speed: {
      // 切换图片的时候的速度
      type: Number,
      default: 1000
    },
    index: {
      type: Number,
      default: 0
    },
    init: {
      // 当轮播图的组件加载完成的时候执行的函数
      type: Function,
      default: function () { }
    },
    transitioned: {
      // 当切换完成一张图片的时候执行的函数
      type: Function,
      default: function () { }
    }

  },
  created() {
    // console.log(this.data);
    // console.log(this.focus);
  },
  template: `
  <section class="container" @mouseover="autoTimer(true)" @mouseout="autoTimer()">
    <div class="wrapper" :style="sty" ref="wrapper" >
      <div class="slide" v-for="item in bannerData" :key="item.id">
        <img :src="item.pic" alt="">
      </div>
    </div>
    <banner-button v-if="button" :handle="handleButton" @ss="handleButton"></banner-button>
    <banner-focus v-if="focus" :data="bannerData.length-1" :index="activeIndex" :change-index="changeIndex"></banner-focus>
</section>
  `,
  components: {
    bannerButton,
    bannerFocus
  }
}