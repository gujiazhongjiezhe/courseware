import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home';
import Customer from '../pages/Customer';

import NoFound from '../pages/noFound';

import Organizer from '@/pages/Organizer';
import OrganizerAdd from '../pages/Organizer/add.vue'
import OrganizerList from '../pages/Organizer/list.vue'

//  @就代表/src 如果引入的路径用上@，就相当于从src目录下开始找

Vue.use(VueRouter);

// 配置路由映射表，路由通过判断当前url上的hash的值的不同，从而判定页面到底显示哪个组件(url的hash值一旦发生变化，路由就会做出响应)
const router =  new VueRouter({
  mode:'hash',
  routes:[
    // 当用户初次打开页面的时候，hash值是/，没有对应的路由，你要打haah重定向到一个指定的hash值，让路由在匹配一次，显示指定的组件
    {
      path:'/',
      // component:Home
      redirect:'/home' // 重定向hash值
      // 使用的作用就是当用户初次打开项目的时候，默认展示一个组件
    },
    {
      path:'/home', // 对应的是页面的hash值
      component:Home, // hash值对应的组件
      beforeEnter: (...ary) => {
        console.log('home-beforeEnter');
        ary[2]()
      }
    },
    {
      path:'/customer/:id',
      name:'cus',
      component:Customer
    },
    {
      path:'/organizer',
      component:Organizer,
      children:[
        {
          path:'/organizer',
          redirect:'/organizer/list'
        },
        {
          path:'/organizer/list',
          component:OrganizerList

        },
        {
          path:'add', // 二级路径以后他会自动把之前父级的路径拼接上 '/organizer/add'
          component:OrganizerAdd
        }
      ]
    },
    {
      path:'*',
      component:NoFound
    }
    // 路由映射表的匹配是从上往下进行的，只要匹配到对应的路由，那就停止匹配，那对应的组件渲染到页面，"*"代表全部hash，如果能够匹配到最后，说明上边都没有匹配通过，证明用户设置的hash值是错误的，这时候咱们而给用户导入到一个固定的错误页
  ]
});

router.beforeEach((...ary) => {
  // ...
  console.log('beforeEach');
  ary[2]();
});
router.afterEach(() => {
  // ...
  console.log('afterEach');
})
export default router;