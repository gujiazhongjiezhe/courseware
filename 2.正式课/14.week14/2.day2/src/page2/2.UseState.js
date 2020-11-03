import React,{Component,useState} from 'react'

function UseState(props){
  let [state,setState] = useState(()=>{ // 这是一块写
    return {
      num:0,
      age:'erYA'
    }
  })

  let [s,setS] = useState(0); // 这是单独写
  
  let fn = ()=>{
    setState({
      ...state,
      num:1
    })
    // 当setState使用的时候，当前设置的对象会覆盖之前的状态队形，所以咱们在使用的时候，可以先把之前的状态拿过来进行解构，然后在重新赋值
  }
  return <div>
    <div>{state.num}{state.age}</div>
    <button onClick={fn}>点击</button>
  </div>
}

export default UseState;