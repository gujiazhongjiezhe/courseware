import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../pages/Home';
import Detail from '../pages/Detail';


Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/detail/:id',
      component:Detail
    }
    
  ]
});
export default router;