import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';

// 因为Vuex是Vue的一个插件，所以在使用vues之前要注册一下
Vue.use(Vuex);



export default new Vuex.Store({

  state:{
    title:'板牙拖车',
    supNum:0,
    popNum:0,
    obj:{
      num:1
    }
  },
  getters:{
    rate(state){
      return state.supNum === 0 ? '0%': state.supNum/(state.supNum + state.popNum)*100 + '%';
    }
  },
  mutations:{
    sup(state){
      state.supNum++;
    },
    pop(state){
      state.popNum++;
    }
  },
  actions:{
    popAction({commit}){
      setTimeout(()=>{
          commit('pop')
      },3000);
    }
  },
  // 在你更改store中的状态的时候在页面打印更改之前和更改之后的状态
  plugins:[logger()]
});

