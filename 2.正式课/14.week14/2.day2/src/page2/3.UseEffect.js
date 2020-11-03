import React,{Component,useState,useEffect} from 'react'

function UseEffect(props){
  let [state,setState] = useState(()=>{
    return {
      num:0,
      num1:100
    }
  })

// useEffect(()=>{
//   console.log('回调函数');
//     // 这就是利用hooks增加的类似于生命周期函数的函数
//     // 当组件第一次渲染或者以后改变状态，当前函数都会执行
//     // 相当于 componentDidMount/componentDidUpdate
// })

// useEffect(()=>{
//   console.log('回调函数');
//   // useEffect函数可以传递第二个参数是一个数组，数组里可以指定当前函数依赖的状态，依赖哪个状态，当状态发生变化的时候，函数才会执行(如果十足里配置多个依赖状态，那只要有一个状态发生变化，函数就会执行)
// },[state.num,state.num1])

useEffect(()=>{
  console.log('回调函数');
  // 如果数组是空的话，那就相当于didMount了
},[])
  
  let fn = ()=>{
    setState({
      ...state,
      num1:200
    });
  }
  return <div>
    <div>{state.num}{state.num1}</div>
    <button onClick={fn}>点击</button>
  </div>
}

export default UseEffect;