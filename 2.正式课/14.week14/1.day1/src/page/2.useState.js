import React, { useState } from 'react';

function UseState() {
  // let [num,setNum] = useState(0);
  // let [age,setAge] = useState('erYa');

  let [state,setState] = useState({
    num:0,
    age:'erYa'
  });
  return (<div>
    <div>UseState</div>
    {/* <p>{num}{age}</p> */}
    <p>{state.num}{state.age}</p>
    <button onClick={()=>{
      // setNum(num+1);
      // setAge('hhhhhhh')
      setState({
        ...state,
        num:state.num+1
      })

    }}>点击</button>
  </div>)
}

export default UseState