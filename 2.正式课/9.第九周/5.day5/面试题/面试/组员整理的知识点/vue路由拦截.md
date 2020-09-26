### vue 路由拦截
- 我们可以通过路由拦截做什么?我认为最主要的便是对权限的控制,比如有的页面需要登录了才能进入,有些页面不同身份渲染不同.
- 大致流程：在进行路由跳转时，利用vue-router提供的钩子函数beforeEach()对路由进行判断，符合条件next()，不符合便跳转到登录页面。
#### 路由拦截
- 在router>index.js中配置beforeEach
```
//路由跳转之前
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !localStorage.token) {
    return next('/login')
  }
   next()
})
```
+ 每个钩子方法接收三个参数:
  + to: Route: 即将要进入的目标,路有对象
  + from: Route: 当前导航正要离开的路由
  + next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  + next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
  + next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
  + next(‘/’) 或者 next({ path: ‘/’ }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
- 确保要调用 next 方法，否则钩子就不会被 resolved。
- 这种方式只是简单的前端路由控制，并不能真正阻止用户访问需要登录权限的路由。还有一种情况便是：当前token失效了，但是token依然保存在本地。这时候你去访问需要登录权限的路由时，实际上应该让用户重新登录。 这时候就需要结合 http 拦截器 + 后端接口返回的http 状态码来判断。

链接：https://juejin.im/post/5b791b8251882543057d8797
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
#### 拦截器
- 新建一个http.js来配置axios拦截器，统一处理所有http请求和响应，就得用上 axios 的拦截器。通过配置http resquest interceptors为http头增加Authorization字段，其内容为Token，通过配置http response interceptors，当后端接口返回401 Unauthorized（未授权），让用户重新登录。

- assets>js>http.js
```
import axios from 'axios'

const http = axios.create()
// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为Token
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common['Authorization'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
http.interceptors.response.use(response => {
  let data = response.data
  if (data.code === 200) {
    return data.data
  }
  if (data.code === 401) {
    window.location.href = '/login'
  }
  return Promise.reject(data)
}, error => {
  return Promise.reject(error)
})

export default http
```
- 至此，就实现了拦截，只需要在登录那边设置Token并存进localStorage里便好。