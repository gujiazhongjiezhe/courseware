<template>
  <div id='box'>
    <p class="refreshText" ref='refreshText_top'></p>
    <ul id="refreshContainer" ref='refreshContainer'>
      <li>111</li>
      <li>111</li>
      <li>111</li>
     
      

	</ul>
  <p class="refreshText1" ref='refreshText_bottom'></p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      startPos: 0,
      transitionHeight: 0,
      scrollTop:0,
      clientHeight:0,
      scrollHeight:0
    }
  },
  mounted(){
    var that = this;
    this.$refs.refreshContainer.addEventListener('touchstart', function(e) {
			
			that.startPos = e.touches[0].pageY;
			that.$refs.refreshContainer.style.position = 'relative';
			that.$refs.refreshContainer.style.transition = 'transform 0s';
    }, false);
    
   this.$refs.refreshContainer.addEventListener('touchmove', function(e) {
			
			that.transitionHeight = e.touches[0].pageY - that.startPos;
			
			if (that.transitionHeight > 0 && that.transitionHeight < 60) {
				that.$refs.refreshText_top.innerText = '下拉刷新';
				that.$refs.refreshContainer.style.transform = 'translateY('+that.transitionHeight+'px)';

				if (that.transitionHeight > 55) {
				  that.$refs.refreshText_top.innerText = '释放更新';
				}
			}				
    }, false);
    
    this.$refs.refreshContainer.addEventListener('touchend', function(e) {
			that.$refs.refreshContainer.style.transition = 'transform 0.5s ease 1s';
			that.$refs.refreshContainer.style.transform = 'translateY(0px)';
			that.$refs.refreshText_top.innerText = '更新中...';

			// todo...

    }, false);
    
    window.addEventListener('scroll',function() {
        console.log(1)
        console.log(that.getScrollTop())
        console.log(that.getClientHeight())
      if (that.getScrollTop() + that.getClientHeight() == that.getScrollHeight()) {
          that.$refs.refreshText_bottom.innerText = '加载中...';
          that.throttle(that.fetchData(),that)
      }else if(that.getScrollTop() + that.getClientHeight()<0){
          that.$refs.refreshText_bottom.innerText = '数据已加载完毕';
      }
    });
  },
  methods:{
    //// 获取当前滚动条的位置
    getScrollTop(){
      if(document.documentElement&&document.documentElement.scrollTop){
        this.scrollTop = document.documentElement.scrollTop
      }else if(document.body){
        this.scrollTop = document.body.scrollTop; 
      }
      return this.scrollTop;
    },
    // 获取当前可视范围的高度
    getClientHeight(){
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) { 
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
        } 
        else { 
            this.clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
        } 
        return clientHeight; 
    },
    // 获取文档完整的高度
    getScrollHeight() { 
        this.scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        return this.scrollHeight 
    },
    throttle (method, context){
      clearTimeout(method.tId);
      if(!method.tId){
        method.tId = setTimeout(function(){
		    method.call(context);
		  }, 300);
      }
		  
    },
    fetchData() {
      let that = this
        setTimeout(function() {
            that.$refs.refreshContainer.insertAdjacentHTML('beforeend', '<li>new add...</li>');
        }, 1000);
    }



  }
}
</script>

<style>

    ul,li{ margin: 0; padding: 0; }
		#refreshContainer li{ background-color: #eee; margin-bottom: 1px; padding: 20px 10px; }
		.refreshText{ position: absolute; width: 100%; line-height: 50px; text-align: center; left: 0; top: 0; }
    .refreshText1{ line-height: 50px; text-align: center; }
</style>




