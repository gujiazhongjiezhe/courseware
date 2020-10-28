import React from 'react';
import ReactDOM from 'react-dom';

// React是当前react框架的一个核心库
// ReactDOM.render他的作用就是将react元素变成真实的dom元素，然后挂载到页面的dom里
let a = <div>111</div>;
console.log(a) // 当前的a其实是一个虚拟的dom对象
// 这叫jsx语法，也叫react元素
// (在react可以书写jsx后缀名的文件，这种文件中支持react元素的书写，如果你在jsx文件中写了一个标签，其实最终渲染的是一个对象【react元素】)
// 当前的react语法是在浏览器中不支持，当webpack编译解析的时候可以通过babel插件将其转化为浏览器可以识别的js代码

ReactDOM.render(a,document.getElementById('root'))