import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';
import {CHANGE_IS_LOGIN,CHANGE_POWER} from './store-types';
import {queryPower} from '../api/login.js';

Vue.use(Vuex);
export default new Vuex.Store({
	modules: {

	},
	//=>设置公共信息
	state: {
		isLogin:false, // 记录当前用户登录的状态
		power:''
	},
	mutations: {
		[CHANGE_IS_LOGIN](state,payload = true){
				state.isLogin = payload;
		},
		[CHANGE_POWER](state,payload = ''){
			state.power = payload
		}
	},
	actions:{
		// 这是派发power的状态的
		[CHANGE_POWER]({commit}){
			queryPower().then(res=>{
				commit(CHANGE_POWER,res.power)
			})
		}
	},
	plugins: [logger()]
});