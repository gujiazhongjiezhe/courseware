import React,{Component} from 'react';
// import store from '../store/index.js';
import action from '../store/actions/count';
import {connect} from 'react-redux';
/* 
使用react-redux：Provider  connect
1.在最外层用Provider组件包裹起来，把store传递给Provider的行间属性
2.在使用的组件内部返回一个用connect二次加工的组件
  1.组件的属性或者状态更新才会引起组件的更新
  <Count {...state.count}></Count>

*/
class Count extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   num:store.getState().count.num
    // };
  }
  // componentDidMount(){
  //   store.subscribe(()=>{
  //     this.setState({
  //       num:store.getState().count.num
  //     })
  //   })
  // }
  render() {
    return (
        <div>
          <button onClick={()=>{this.add(1)}}>+</button>
          <span>{this.props.num}</span>
          <button onClick={()=>{this.min(1)}}>-</button>
        </div>
    );
  }
  add(value){
    // 把点击事件写好==>去写action-types(常量)-->reducer(逻辑)-->action(派发的对象)-->正常使用(dispatch派发)
    // store.dispatch(action.add(value));

    this.props.add(value);

    
  }
  min(value){
    // store.dispatch(action.min(value));
    this.props.min(value)
  }
}

// connect的第一个执行小括号里的传递的回调函数会在connect内部执行，然后当回调函数执行的时候，会把当前store中最大的状态state以实参的形式传递给当前的回调函数

// mapStateToProps函数执行，会返回一个对象，对象里的键值对最终会被放到当前组件的行间属性上，所以用了connect后，在组件里获取公共状态的时候可以直接使用this.props.xxx来获取了
let mapStateToProps = (state)=>{
  return {
    // ...state 相当于把整个状态展开
    ...state.count // 相当于把count模块的状态展开
  }
};

let mapDispatchToProps = (dispatch)=>{ // 当前函数接受的dispatch就是store中的dispatch
  return { // 当前对象中的键值对会被放到组件的行间属性上
    add:(value)=>{dispatch(action.add(value))},
    min:(value)=>{dispatch(action.min(value))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Count);
// export default connect(mapStateToProps,action)(Count);
// 当前的connect是一个高阶函数
// connect的第一个执行小括号接收两个参数，第一个是一个函数，第二个可以是对象也可以是函数
// 第二个执行小括号耳接收当前要被处理的组件


// 咱们说了connect第一个执行小括号的第二个参数可以是函数，也可以是对象，如果是函数，那就会把当前函数的返回值放到组件的行间属性上，如果是一个对象，那么他就会默认调用bindActionsCreator方法，该方法会返回一个对象，对象里就是包装好的执行dispatch的函数，然后把返回的对象里的函数放到组件的行间属性上

let  bindActionsCreator = (action,dispatch)=>{
  // 当前这个函数会返回一个和61行一样的对象
  let obj = {};
  for(let key in action){
      obj[key] = (value)=>{dispatch(action[key](value))}
  }
  return obj;
}

// Provider 和 connect的源码

// { // 当前对象中的键值对会被放到组件的行间属性上
//   add:(value)=>{dispatch(action.add(value))},
//   min:(value)=>{dispatch(action.min(value))},
// }
