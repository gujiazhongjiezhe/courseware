let Vuex = (function () {
  class Store {
    constructor(options) {
      // this-->是当前Store类正在创建的实例store
      // 利用vue创建会把data中的所有属性进行数据劫持增加get和set函数
      let ss = new Vue(
        {
          data: {
            state: options.state || {},
          }

        }
      );
      this.state = ss.state;
      // this.state = options.state || {},

      // 处理commit
      this.commit = (type, payload) => {
        // 在这里执行mutations对象里的方法
        // mutations里的方法执行时应该是store实例，咱们咱们用call把函数内部的this改为store实例
        options.mutations[type].call(this, this.state, payload)
        // mutations.add()
      }

      // 处理dispatch
      this.dispatch = (type, payload) => {
        // 执行actions里的方法
        options.actions[type].call(this, this, payload)
      }

      this.getters = {};
      // Object.defineProperty(this.getters,'sex',{
      //     get:()=>{
      //       return options.getters.sex(this.state)
      //       // return state.num%2 === 0 ? '男':'女';
      //       options.getters.sex()
      //     }
      // })
      Object.keys(options.getters).forEach(item => {
        Object.defineProperty(this.getters, item, {
          get: () => {
            return options.getters[item](this.state)
          }
        })
      })
      // ['sex','ss']

    }
  }
  let install = (vm) => {
    // vm是当前Vue类
    // install的作用就是把$store挂载到每一个组件实例上
    vm.mixin({
      beforeCreate() {
        // $options里存储的是new Vue实例的时候传递的实参，只有最外层的vue跟实例才会传递store，所有这里的if只会走一次，当第一次执行完beforeCreate的时候，vue的跟实例上已经挂载好$store属性，然后当beforeCreate第二次执行的时候，if是不成立的，走else，这时候从父级身上拿到$store属性赋值到自己身上
        this.$store = 100;
        if (this.$options && this.$options.store) {

          this.$store = this.$options.store;
          // console.log(this);
        }
        else {
          // 假设当前的this是child
          this.$store = this.$parent.$store;
          // 第三个儿子.$store = child.$store
        }
        console.log(this);

      }
    })
  }
  let mapState = (ary)=>{
    // ['num','msg']
     // num(){ return this.$store.state.num}
     // msg(){ return this.$store.state.msg}
   let obj = {};
    ary.forEach(item=>{
      obj[item] = function() {return  this.$store.state[item]}
    })
    return obj;
  }
  // ...Vuex.mapMutations(['add']);
  let mapMutations = (ary)=>{
    let obj = {};
    // add(value){
    //   this.$store.commit('add',value)
      // }
    ary.forEach(item=>{
      obj[item] = function(value) {this.$store.commit(item,value)}
    })
    return obj
  }

  let mapActions = (ary)=>{
    let obj = {};
    ary.forEach(item=>{
      obj[item] = function(value) {this.$store.dispatch(item,value)}
    })
    return obj
  }
  return {
    Store,
    install,
    mapState,
    mapMutations,
    mapActions
  }
})()


// let store = new Vuex.Store({
//   state:{num:100}
// })
// {state:{...}}