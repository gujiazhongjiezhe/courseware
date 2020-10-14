/*
 * 如果项目是基于AXIOS来完成请求处理的，此处我们需要做的就是对AXIOS进行默认的全局配置；如果我们是基于FETCH来处理的，此处也是对FETCH的二次封装； 
 */
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:9999';
// axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data) {
	if (!data) return data;
	let result = ``;
	for (let attr in data) {
		// if (!data.hasOwnProperty(attr)) break;
		result += `&${attr}=${data[attr]}`;
	}
	return result.substring(1);
};
axios.interceptors.response.use(function onFulfilled(response) {
	return response.data;
}, function onRejected(reason) {
	return Promise.reject(reason);
});
axios.defaults.validateStatus = function (status) {
	return /^(2|3)\d{2}$/.test(status);
}

export default axios;