import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './page/todo/Todo';
import {Provider} from 'react-redux';
import store from './store/index.js'
ReactDOM.render(
  <Provider store={store}>
    <Todo></Todo>
  </Provider>, document.getElementById('root'))
