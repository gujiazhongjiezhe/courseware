import React,{useRef,useEffect,createRef} from 'react';

function UseRef (){
  let inputRef = useRef();// af0  af0  af0
  let divRef = createRef();// af0  af1  af2
  
 
  // createRef这个钩子函数当我更新组件的时候，他会重新执行，并且创建一个新的对象
  // useRef这个钩子函数当组件更新的时候，也会重新执行，但是如果之前已经返回对象，那当再次执行的时候不会创建新的对象，还是返回之前的对象

  // inputRef默认是一个对象 {current:undefined},使用的时候时候把inputRef放到元素的行间属性ref上，然后在inputRef对象里的current属性上就可以拿到当前的元素
  useEffect(()=>{
    console.log(inputRef);
    console.log(divRef);
    inputRef.current.focus()
   
  },[])
  return <div>
    <input  ref={inputRef}/>
    <div  ref={divRef}></div>
  </div>

}


export default UseRef