import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';


/* 导入公共样式 */
import './assets/reset.min.css';
import './assets/font/iconfont.css';

/* 导入UI库中所有的组件和对应的样式 */
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import { checkLogin,queryPower } from './api/login';
import { CHANGE_IS_LOGIN,CHANGE_POWER} from './store/store-types'

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.directive('power', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,obj) {
    let power = store.state.power;
    let value = obj.value; // 拿到当前指令执行时传递过来的值 'allcustomer'  'allcustomer|department'
     if(!power.includes(value)){
        // 把当前元素删除
        el.parentNode.removeChild(el)
     }
     
   console.log(el,value);

  }
})


// 检测当前用户是否登录
checkLogin().then(res => {
  // 当用户登录成功以后，你要把登录的状态保存到store中
  store.commit(CHANGE_IS_LOGIN, true);
  return queryPower() // 返回的是一个promise实例，那他的状态就能够控制下一个then中的回调函数的执行

  // store.dispatch(CHANGE_POWER); // 这里会做两个事：请求power、把请求来的power存储到store中
  // 当new Vue渲染组件的时候，在组件中可以拿到store中的power信息吗
}).then((res) => {
  // 这里需要把请求来的power存储到state里以后再去渲染组件，这样以后再组件里才能够拿到完整的power信息
  store.commit(CHANGE_POWER,res.power);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');

}).catch(() => {
  Vue.prototype.$alert('您当前是非法登录，请重新登录', '提示', {
    callback: () => {
      location.href = '/login.html'
    }
  })
})

// console.log('main.js')


