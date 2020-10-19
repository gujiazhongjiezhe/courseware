import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';


import System from '../pages/System';
import NoFound from '../pages/noFound';

import Customer from '../pages/Customer';
import CustomerList from '../pages/Customer/CustomList.vue';
import CustomerHandle from '../pages/Customer/CustomHandle.vue';


Vue.use(VueRouter);
const router = new VueRouter({
	mode: "hash",
	routes: [
		{
			path: '/',
			redirect: '/custom'
		},
		{
			path: '/custom',
			component: Customer,
			children: [
				{
					path: '/custom',
					redirect: '/custom/list'
				},
				{
					path: 'list',
					component: CustomerList
				},
				{
					path: 'handle',
					component: CustomerHandle
				}
			]
		},
		{
			path: '/system',
			component: System,
			meta: { isPower: true, power: new RegExp('(departmenthandle|userhandle|jobhandle)') },
			beforeEnter: (to, from, next) => {
				// 当切换到当前路由对应的组件的时候，此路由内的守卫就会执行，从而进行判断当前操作有没有权限
				let power = store.state.power;
				console.log(power);
				if (/(departmenthandle|userhandle|jobhandle)/.test(power)) {
					next();
				}
				else {
					Vue.prototype.$alert('您当前访问的路径没有权限', '提示')
				}
				// 用于 departmenthandle|userhandle|jobhandle
				// userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword
			}

		},
		{
			path: '*',
			component: NoFound
		}
	]
});
// router.beforeEach((to, from, next) => {
// 	let power = store.state.power;

// 	if (to.meta.isPower) {
// 		// 如果当前isPower是true，那就是需要进行权限的校验
// 		if (to.power.test(power)) {
// 			next();
// 		}
// 		else {
// 			Vue.prototype.$alert('您当前访问的路径没有权限', '提示')
// 		}
// 	}
// 	else {
// 		next()
// 	}
// })
export default router;