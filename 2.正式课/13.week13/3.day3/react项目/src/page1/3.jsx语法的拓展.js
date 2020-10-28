import React from 'react';
import ReactDOM from 'react-dom';

let num = 1
let obj = {ss:1};
let ss = ()=>{console.log(100); return 200};
let ary =[<span key="1">1</span>,<span key="2">2</span>];
let style = {backgroundColor:'red'};
let  parent = <div>
  <div>{num}</div>
  {/* <div>{obj}</div> */}
<div>{0>1 ?'ok' :'no'}</div>
<div>{100*200+100}</div>
<div>{ss()}</div>
<div>{null}</div>
<div>{undefined}</div>
{/* <div>{NaN}</div> */}
<div>{ary}</div>
<div style={style} className="w">我最后一个</div>
</div>



// 1.在jsx语法中可以通过{}去取值(类似于vue中的{{}})
// 2.不要往大括号里存放普通对象和函数
// 3.在大括号中可以三元运算和表达式，
// 4.在大括号中把函数执行就可以，会把函数的执行结果放到大括号中
// 5.在大括号中可以使用数组，而且还可以把数组里的react元素变成真正的元素放到页面
// 6.在react元素行间写style样式，最层要拿大括号包裹，而且大括号里边放的是一个对象，如果样式名是background-color，那就改成backgroungColor(改成驼峰的写法)
// 7.react元素的类名是className

ReactDOM.render(parent,document.getElementById('root'));