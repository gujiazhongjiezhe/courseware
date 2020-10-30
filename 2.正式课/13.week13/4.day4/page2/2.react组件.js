import React from 'react';
import ReactDOM from 'react-dom';

// react中定义组件有两种方式：1.声明函数方式 2.声明类的方式

// 创建函数组件
// 1.函数组件的名字开头字母要大写
// 2.组件每使用一次，函数组件就会执行一次
// 3.当函数组件运行的时候，会把从外边传递过来的参数以形参props的形式接受
// 4.当组件行间传递属性的时候，如果想传递变量或者指定的js数据类型的值，那要加上大括号(类似于vue中的v-bind:)
function Com (props){ // {age:100}
  let age = 100;
  console.log(props);
  // props.age = 400;
  // react组件里的数据流是单向的，vue和react是一样的

  // props形参是对象的形式，接收的是从外边传递过来的属性
  return <div>{props.age}</div>
}

let obj = {
  sex:0,
  address:'北京',
  friends:'laowang'
}
let a = <div>
  <Com age = {100} name="erYa" data={obj}></Com>

  {/* 在组件的行间写一个大括号，然后在大括号里展开一个对象，这样就把对象里的每一个键值对当做行间属性传递进去 */}
  <Com age= {200} {...obj}></Com>
  
</div>


ReactDOM.render(a,document.getElementById('root'));