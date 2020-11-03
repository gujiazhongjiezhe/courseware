import React, { useReducer } from 'react';
let initState = {
  num: 0
}
function reducer(state, action) {
  // state形参就是仓库里的state
  switch (action.type) {
    case 'add':
      state = { ...state, num: action.value };
      break;
    case 'min':
      state = { ...state, num: action.value };
      break;

  }

  return state;
}



// this.$store.dispatch({
//   type:'add',
//   value:1
// })
function Child1(props) {

  return <div>子组件{props.state.num}</div>
}

function Child2(props) {

  return <div>子组件{props.state.num}</div>
}

function UseReducer() {
  let [state, dispatch] = useReducer(reducer, initState);
  setTimeout(() => {
    dispatch({
      type: 'add',
      value: 100
    })
  }, 5000)
  return <div>
    <Child1 state={state} ></Child1>
    <Child2 state={state}></Child2>
  </div>
}


export default UseReducer
