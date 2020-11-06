// 当前这个index.js主要的事情就是把每一个小的reducer合并到一起，形成一个大的reducer，然后导出去

import count from './count';
import todo from './todo';

function combineReducers(reducers){
  return (state={},action)=>{ // 这个函数就是你执行dispatch的时候内部执行的reducer   un      {}

    let obj = {};
    for(let key in reducers){
      // console.log(reducers[key]);
      obj[key] = reducers[key](state[key],action)
      // obj.count = count(un,{}) // {value:0}
      // obj.todo = todo(un,{}) // {list:[1,2,3]}
    }
    return obj;
    // return {count:{value:0},todo:{list:[1,2,3]}}
    // return {count:{value:2},todo:{list:[1,2,3]}}
  }
}
let reducers = combineReducers({
  count:count,
  todo
}); // 当combineReducers函数执行时传递一个实参对象，对象里存放的是将要合并的小reducer


export default reducers;
// combineReducers函数的执行结果是一个合并之后的大reducer