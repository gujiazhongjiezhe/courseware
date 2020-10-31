import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropsTypes from 'prop-types';

// 隔代传递 利用上下文
class GrandFather extends Component{
  constructor(props){
    super(props)
    this.state = {num:100}
  }
  static childContextTypes = { // 定义传递给孩子的属性的类型
    num:PropsTypes.number,
    change:PropsTypes.func
  }
  getChildContext () { // 定义给孩子的属性的值
    return {
      num:this.state.num,
      change:this.change
    }
  }
  change(value = 200){
    console.log(this);
    this.setState({
      num:value
    })
  }
  render(){
    return (<div>
      <div>我是爷爷</div>
      <Father></Father>
    </div>)
  }
};

class Father extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (<div>
      <div>我是父亲</div>
      <Son></Son>
    </div>)
  }
}

class Son extends Component{
  constructor(props){
    super(props)
  }
  static contextTypes ={ // 定义获取的属性的类型
    num:PropsTypes.number,
    change:PropsTypes.func
  }
  render(){
    // console.log(this.context.num = 800);
    return (<div>
      <div>
        <div>我是儿子{this.context.num}</div>
        <div onClick={this.context.change.bind(this,999)}>点击改变爷爷的值</div>
      </div>
    </div>)
  }
}

// 兄弟组件之间的通信 eventBus 自己封装发布订阅
ReactDOM.render(<GrandFather></GrandFather>,document.getElementById('root'))