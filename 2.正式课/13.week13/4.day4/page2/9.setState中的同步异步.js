import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Bar extends Component{
  constructor(props){
      super(props);
    // 有的时候咱们要把从外界传递过来的属性赋值到state里，当做初始值
      this.state = { 
        num:1,
        age:2,
        ...this.props
      }
  }
  fn = (value)=>{
      this.setState({
        num:100
      });
      this.setState({
        num:this.state.num+200
      })
      // 在react事件函数里的setState改状态就是异步的，或者在生命周期函数里的setState改状态也是异步的

      // 在定时器里改状态就是同步的
      setTimeout(()=>{
        this.setState({num:100});
        console.log(this.state.num);
        this.setState({num:this.state.num+200});
        console.log(this.state.num);
      },5000)
      
  }

  render(){
    console.log('render');
    let {num,age} = this.state;
    return (<div>
      {num}
      {age}
      <div onClick={this.fn.bind(null,2)}>点击</div>
    </div>)
  }
}

ReactDOM.render(<Bar ss="100"></Bar>,document.getElementById('root'));


