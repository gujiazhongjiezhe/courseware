## note
vue.use() // 
vue.mixin // 混入





vuex   vue-router

vue的双向数据的绑定原理
// 生命周期
// 组件传参
// vuez中的方法：methods  wather computed filters 
// 
//-----------------------------------------
1.vue中this上属性在视图中使用的时候可以省略this.
2.vue中的数据不一样都是响应式的，如果之前对象中没有某一个属性，后期增加，那就不是响应式的，还有在数组中，如果通过length去操作数组，也是没有响应式的
      并不是所有的数据更改，都会通知视图进行刷新
    + 在data中初始化一个对象，但是是空的，后期新增键值对的时候不会让视图重新渲染(咱们得想办法解决)
      1.当给对象增加完内容之后，他其他数据更新一下(this.$forceUpdate() 或者让data中的其他数据在重新设置一下)
      2.在初始化值的数据的时候，最好就提前好数据声明好,(如果你不知道值的话，可以先赋值空，但是这个属性要有，)只有从data中初始化过的属性才会有get和set
      3.不要给obj新增一个属性，而是把obj这个对象进行替换，以为obj初始化的时候是存在的，所以他被监听着呢 vm1.obj = {...vm1.obj,name:900}
      4.基于vm1.$set内置方法实现修改数据，并且实现响应式：vm1.$set(vm1.obj,key,value)   vm1.$set(vm1.obj,'name',900)

3.vue中的指令
    1、内置指定：v-if v-else v-else-if  v-show  v-for  v-model v-on v-bind v-once v-text v-html v-slot

      1.1、v-if和v-show的区别：
          v-if控制的是dom元素的存在与否(直接把元素在dom结构里删除)
          v-show也可以控制元素的显示隐藏，但是他是控制的元素的display样式

        如果当前元素要频繁的显示隐藏使用v-show
        如果当前元素只是页面渲染的时候要么显示，要么隐藏，(不会频繁的切换)那就用v-if

      1.2、要避免v-for 和 v-if 在一起使用，v-for的优先级要比v-if的高
      因此for循环先执行，当循环出dom之后在执行v-if，那这时候循环几次，if就会执行几次，性能不好，所有不建议写到一起，(如果在循环的时候想让数组中的某一项不显示，可以提前把数组处理好在去循环)

      1.3、v-model的原理：就是表单元素的value(有可能是checked)和input事件的组合(也叫他俩的语法糖)
      1.4、v-text和v-html的区别：v-text不可以识别字符串的标签，但是v-html是可以的
      1.5.v-on：绑定事件用的，语法糖是@
      1.6.v-bind: 供行间属性动态获取值用的，语法糖是:
  
4、es5、6中数组新增的方法：
  forEach map filter some every reduce includes indexOf find fill
  Array对象上的方法 from of isArray
5、事件修饰符：
           .stop:阻止事件的冒泡传播
        // .prevent:阻止事件的默认行为
        // .capture:控制事件在捕获阶段执行
        // .once:当事件只触发一次
        // .self:只有点击自己的时候函数才会执行
        // .passive:修饰oscroll事件的，不会等到当前事件执行完，就会立马执行下一次事件,提高性能
6、键盘修饰符

7、filter、computed、watch、methods
  filter支持管道符的语法，他是对数据进行二次处理的，如果使用多次过滤，可以一直往右写
  methods：存放的是vue中的事件
  computed:  计算属性，这里的属性都是有依赖性的，依赖去别的值的变化而变化，当刷新页面的时候，如果当前属性所依赖的值没有发生变化，那就会走上次的缓存，而不会重新计算
         计算属性不支持异步，
         计算属性一般依赖的值都是响应式的数据(data中的或者store中)
  watch:属性的监听，可以监听this实例上的属性，当属性发生变化时，监听函数就会执行，并且函数的第一个形参可以接受到更改的最新的值，(例子可以看vue-router中的动态路由)

  // computed中是不支持异步的，watch中是支持异步的

8、组件通讯
  // props 父子组件 父组件的事件通过props传递给儿子
    // 事件注册 自定义事件$emit
    // eventBus  
    // $parent  $children
    // ref
    // prodive inject
    提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

    // $attrs $listener
    vuex



 

