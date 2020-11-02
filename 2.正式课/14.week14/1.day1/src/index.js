import React from 'react';
import ReactDOM from 'react-dom';
import Banner from './components/Banner/Banner';
import Context from './page/Context';
import UseState from './page/2.useState'
import './assets/reset.min.css';

let ary = [
  {
    id:1,
    pic:'http://127.0.0.1:9999/images/banner01.jpg'
  },
  {
    id:2,
    pic:'http://127.0.0.1:9999/images/banner02.png'
  },
  {
    id:3,
    pic:'http://127.0.0.1:9999/images/banner03.png'
  },
  {
    id:4,
    pic:'http://127.0.0.1:9999/images/banner04.png'
  }
];

// ReactDOM.render(<div>
//   <Banner data={ary} pagination={true} button={true}></Banner>
// </div>,document.getElementById('root'))



/* *
data 轮播图的数据
interval：轮播间隔的时间
activeIndex：初始化完成之后，默认显示的图片的索引
speed：图片轮播的速度

pagination：控制会否显示焦点
button：控制是否显示button

*/





ReactDOM.render(<div>
  {/* <Context></Context> */}
  <UseState></UseState>
</div>,document.getElementById('root'))