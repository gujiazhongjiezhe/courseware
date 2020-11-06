import createStore from '../reducer';
// import count from './reducers/count'
// import todo from './reducers/todo'
import reducer from './reducers/index';

let store = createStore(reducer);
// dispatch({})
// reducer是一个函数数据类型的值

export default store; // {getState,dispatch}
// 当前这个文件主要的作用就是创建一个store仓库，然后导出去，以后再哪个组件里使用就在哪个组件导入即可


