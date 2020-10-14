import Vue from 'vue';
import Vuex from 'vuex';
import task from './task';
import logger from 'vuex/dist/logger';

// 因为Vuex是Vue的一个插件，所以在使用vues之前要注册一下
Vue.use(Vuex);



export default new Vuex.Store({
  modules:{
    task
  },
  state:{

  },
  getters:{

  },
  mutations:{
 
  },
  actions:{
  
  },
  // 在你更改store中的状态的时候在页面打印更改之前和更改之后的状态
  plugins:[logger()]
});

