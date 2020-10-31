class EventBus {
  obj = {
    // 'myEvent':[fn]
  }; // 添加到当前实例上(相当于当前的事件大池子)

  $on(spaceName,func){
    if(!this.obj[spaceName]){
      this.obj[spaceName] = [];
    }
    this.obj[spaceName].push(func)
  }

  $emit(spaceName,...arg){
    let ary = this.obj[spaceName] || [];
    ary.forEach(item=>{
        item(...arg)
    })
  }
  
  // this.$emit('myEvent',100,200,300)
  // this.$on('myEvent',function(){})
  // this.$on('myEvent',function(){})
   // this.$on('sleep',function(){})
}

export default new EventBus