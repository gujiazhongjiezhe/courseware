import {ADD_NUM,MIN_NUM} from '../action-types';
let initState = {
  value: 0
}
// reducer一共有两个作用，一个是给store中的state赋默认值
// 第二个是后期更改store中的state中的状态
function reducer(state = initState, action) {
  //              默认值              {}
  //              {value:0}         {type:ADD_MUN,payload:2}
  switch (action.type) {
    case ADD_NUM:
      // 从之前的基础之上累加
      return { value: state.value + action.payload }
    case MIN_NUM:
      return { value: state.value - action.payload }
  }
  return state;
}

export default reducer;
// 这里存放的是某组件对应的初始化的状态和以后更改状态的逻辑