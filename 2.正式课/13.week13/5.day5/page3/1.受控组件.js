import React,{Component} from 'react';
import ReactDOM from 'react-dom'
class Foo extends Component {
  constructor(props) {
    super(props);
    // 把从外界传递过来的属性给到自己的状态，这样以后该自己的状态就可以了
    this.state = {
      num:this.props.num,
      num2:0
    };
  }
  change = (type,e)=>{
    // console.log(e.target.value);
    let value = e.target.value;
    this.setState({
      [type]:value
    })
  }
  render() {
    let {num,num2} = this.state;
    return (
      <div>
        <input value={num} onChange={(e)=>{this.change('num',e)}}></input>
        <input value={num2} onChange={(e)=>{this.change('num2',e)}}></input>
        {/* 在表单元素里，如果想给其赋默认值，那就在他行间写一个value属性，但是写上之后input框就受控了(受num的控制)，不能输入了，这时候还得给input行间写上一个onChange方法，改变input框的值，change就会触发，在函数里设置setState就好了 */}
      </div>
    );
  }
}

ReactDOM.render(<Foo num={100} />,document.getElementById('root'))

