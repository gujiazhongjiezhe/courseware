### vue的路由传参
#### 方法一
```
this.$router.push({
    path:`/home/${id}`,
})

路由配置
{
    path:"/home/:id",
    name:"Home",
    component:Home
}
在Home组件中获取参数值
this.$route.params.id

```
#### 方法二
```
通过name来匹配路由，通过param来传递参数
this.$router.push({
    name:'Home',
    params:{
        id:id
    }
})
用params传递参数，不使用：/id
{
    path:'/home',
    name:Home,
    component:Home
}
Home组件中获取参数
this.$route.params.id

```
#### 方法三
- path+query;query传递的参数会通过？id = xxx展示
```
this.$router.push({
    path:'/home',
    query:{
        id:id
    }
})
路由配置
{
    path:'/home',
    name:Home,
    component:Home
}
获取参数的方法
this.$route.query.id

```
### 路由传参
- 这里的路由传参以编程式router.push(...)为例，声明式<router-link :to="...">与之类似。此处模拟情景为从componentsA.vue页面跳转到componentsB.vue页面传参。首先，路由配置信息如下：
- router.js
```
import Vue from 'vue'
import Router from 'vue-router'

import componentsA from './components/componentsA' //在components下创建componentsA.vue
import componentsB from './components/componentsB' //在components下创建componentsB.vue
Vue.use(Router)

export default new Router({
	routes:[
		{
			path:'/componentsA',
			name:'componentsA',
			component:componentsA
		},
		{
			path:'/componentsB',
			name:'componentsB',
			component:componentsB
		}
	]
})
```
#### 1. 路由配置传参
- 首先要确定自己要传的参数名，将路有配置修改一下，传 name, age, sex 三个参数

```
		{
			path:'/componentsB/:name/:age/:sex',
			name:'componentsB',
			component:componentsB
		}
```
- 然后在 componentsA.vue 页面通过this$router.push 配置预支对应的参数
- componentsA.vue
```
<template>
	<div>
		<div>我是组件A</div>
		<button @click='routerToB1'>方式一跳转到组件B</button>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				person:{name:'Gene',age:'18',sex:'male'}
			}
		},
		methods: {
			routerToB1() {
				this.$router.push({
					path:`componentsB/${this.person.name}/${this.person.age}/${this.person.sex}`
				})
			}
		},
	}
</script>
<style>
</style>
```
- 然后在 componentsB.vue 页面用this.$route.params接收参数：
- componentsB.vue
```
<template>
	<div>
		<div>我是组件B</div>
	</div>
</template>
<script>
	export default{
		created(){
			this.getRouterData()
		},
		methods: {
			getRouterData(){
				const param = this.$route.params
				console.log(param)//{name:'Gene',age:'18',sex:'male'}
			}
		},
	}
</script>
<style>
</style>
```
- 点击按钮"方式一跳转到组件B"，componentsB页面打印出{name:'Gene',age:'18',sex:'male'},成功获取到A页面传过来的参数，并且地址栏显示为localhost:8889/#/componentsB/Gene/18/male（端口号根据自己设置的来），表明这种传参方式url会携带参数。

#### 2. params传参
- 首先将刚才路由修改部分还原,在componentsA.vue 页面添加按钮'方式二跳转到组件B'
- componentsA.vue
```
<template>
	<div>
		<div>我是组件A</div>
		<button @click='routerToB1'>方式一跳转到组件B</button>
		<button @click='routerToB2'>方式二跳转到组件B</button>
	</div>
</template>
```
- 在 methods 中添加方法 routerToB2, 使用路由属性 name 来确定匹配的路由, 使用属性 params 来传递参数;
- componentsA.vue
```
routerToB2(){
	this.$router.push({
		name:'componentsB',
			params:{
					exa:'我是传到组件B的参数'
					}
	    })
},
```
- componentsB.vue保持不变，params传参方式获取参数也是通过this.$route.params，点击A页面新添加的按钮"方式二跳转到组件B"，在B页面打印出{exa: "我是传到组件B的参数"}，传参成功，地址栏为localhost:8889/#/componentsB，表明这种方式url不会携带参数。


#### 3. query 传参
- 这种方式和 params 传参方式类似,在 componentsA.vue 页面继续添加按钮'方式三跳转到组件B'
- componentsA.vue
```
<template>
	<div>
		<div>我是组件A</div>
		<button @click='routerToB1'>方式一跳转到组件B</button>
		<button @click='routerToB2'>方式二跳转到组件B</button>
		<button @click='routerToB3'>方式三跳转到组件B</button>
	</div>
</template>
```

- 在 methods 中添加方法 routerToB3, 使用路由属性name 或者 path 来确定屁屁额的路由,使用属性 query 来传参
- componentsA.vue
```
			routerToB3(){
				this.$router.push({
					name:'componentsB',// path:'/componentsB'
					query:{
						que:'我是通过query传到组件B的参数'
					}
				})
			}
```
- 在 componentsB.vue 通过 this.$route.query 来获取参数
- componentsB.vue
```
			getRouterData(){
				const query = this.$route.query
				console.log(query)//{que: "我是通过query传到组件B的参数"}
			}
```
- 这种方式url会携带参数.
#### 4. 小结
- 路由配置传参注意书写格式 /:id, 获取参数都是通过$route 而不是 $router
- params 传参和 query 传参区别类似于 post 和 get 方法, params 传参地址栏不会显示参数,而 params 传参会将参数显示在地址栏中.
- params 传参刷新页面参数会丢失,另外两种不会
- params 传参对应的路由属性是 name , 而 query 传参对应的路由属性既可以是 name ,也可以是 path


#### 使用缓存
- 缓存方式即通过sessionStorage、localStorage、Cookie方式传参，这种方式和是不是用Vue无关，因此，不谈。