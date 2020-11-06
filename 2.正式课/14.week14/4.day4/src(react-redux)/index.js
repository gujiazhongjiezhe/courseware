import React from 'react';
import ReactDOM from 'react-dom';
import Count from './page/count';
import Computed from './page/computed';
import store from './store/index.js';
import {Provider} from 'react-redux';

// 通过Provider根组件，将store注入到每一个子组件身上方便我们去使用
ReactDOM.render(
<Provider store={store}>
  <Count></Count>
  <Computed></Computed>
</Provider>,document.getElementById('root'))

// 出门背书包   格子衫  头发少  闷骚  优衣库 总是带着耳机(除了介绍对象)