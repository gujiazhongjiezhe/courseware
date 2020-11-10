import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import store from './store';
import App from './App';


ReactDOM.render(<Provider store={store}>
    <App></App>
</Provider>,document.getElementById("root"));

/* 
api：存放的是所有的数据的接口的地方(请求的二次封装)
assets：存放的是静态资源文件
components：存放的是公共的组件
pages：存放的是页面级组件
store：存储公共状态的地方
index.js:webpack打包的入口文件
App.js:根组件(项目的逻辑不要直接在index.js里面写，放到App里边区别，这样还清晰一些)

*/
