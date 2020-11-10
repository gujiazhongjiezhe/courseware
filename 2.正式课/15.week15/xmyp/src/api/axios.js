import axios from 'axios';
import qs from 'qs';
// {a:1,b:2} <=> a=1&b=2

// 配置基础路径
axios.defaults.baseURL="http://127.0.0.1:9999";
axios.defaults.timeout=10000; // 请求超时的时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 把前端请求的参数对象转成字符串的url,并且用&连接起来；
axios.defaults.transformRequest = data=>{return qs.stringify(data)}
// axios.interceptors.response:响应拦截器
// axios.interceptors.request:响应拦截器

axios.defaults.validateStatus=status=>{
    // 如果返回true，继续向下执行，返回结果，如果这返回false，不再向下执行
    return /^(2|3)\d{2}$/.test(status);
}
axios.interceptors.response.use(response=>{
    return response.data
})

export default axios
