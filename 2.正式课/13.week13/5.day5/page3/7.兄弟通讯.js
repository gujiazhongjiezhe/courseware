import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import bus from './6.eventBus';


// 隔代传递 利用上下文
class Father extends Component{
  constructor(props){
    super(props)
    this.state = {num:100}
  }

 
  render(){
    return (<div>
      <Brother1></Brother1>
      <Brother2></Brother2>
    </div>)
  }
};

class Brother1 extends Component{
  constructor(props){
    super(props)
    this.state = {
      num:1
    }
  }
  changeNum = (value = 2)=>{
    this.setState({
      num:value
    })
  }
  componentDidMount(){
    bus.$on('changeNum',this.changeNum);
    console.log(bus);
  }
  render(){
    return (<div>{this.state.num}我是组件1 </div>)
  }
}

class Brother2 extends Component{
  constructor(props){
    super(props)
  }
  change = ()=>{
    bus.$emit('changeNum',800)
  }
  render(){

    return (<div>我是组件2 <button onClick={this.change}>点击我改变组件1的值</button></div>)
  }
}

// 兄弟组件之间的通信 eventBus 自己封装发布订阅
ReactDOM.render(<Father></Father>,document.getElementById('root'))