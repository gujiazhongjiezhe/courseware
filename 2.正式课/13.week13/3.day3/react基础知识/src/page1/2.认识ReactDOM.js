import React from 'react';
// console.log(100); // 这是不可以的
import ReactDOM from 'react-dom';

// import只能在最上边引入，把逻辑代码写到所有import的下边


// 1.只能有一个ReactDOM.render方法，如果有多个那下边的会替换上边的(每一次render之前，都会把根元素root里的东西清空)
// 1.5:如果你想写多个render函数，那就在html页面准备多个不同的根元素
// 2.render的第一个参数只能有一个根react元素,所有的子react元素都要包裹到一个大的react元素中
let a = <div>
  <span id="b">1</span>
</div>;

// ReactDOM.render(a,document.getElementById('root'));
// ReactDOM.render(<div>2</div>,document.getElementById('root2'));
// 1.ReactDOM是一个对象，对象有render方法，他的作用就是
// 1.把react元素渲染成真正的dom元素
// 2.然后获取页面中真实的dom元素，然后把刚才生成的dom元素插入进去
ReactDOM.render(a, document.getElementById('root'), function () {
  let b = document.getElementById('b')
  console.log(b); // 这里是拿不到真实dom元素的
  alert()
});
// render函数的渲染是同步的，如果想在页面渲染完成之后，去操作页面的真实dom，那就在render函数下边直接操作就可以
// let b = document.getElementById('b')
// console.log(b); // 可以拿到元素b


