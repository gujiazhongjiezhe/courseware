import React,{Component} from 'react';
import ReactDOM from 'react-dom'
class Foo extends Component {
  constructor(props) {
    super(props);
    // 把从外界传递过来的属性给到自己的状态，这样以后该自己的状态就可以了
    this.state = {
      total:0,
      num:0
    };
  }
  componentDidMount(){
    this.refs.a.focus()
    this.setState({
        num:200
    },()=>{
     
    })
  }
  change = (e)=>{
    // let value1 = Number(this.refs.a.value);
    // let value2 = Number(this.x.value);
    // this.setState({
    //   total:value1 + value2
    // })

   
  }
  render() {
    console.log('render');
    let {num,total} = this.state;
    return (
      <div>
        <input ref="a"  value={num} onChange={this.change}></input>
        <input ref={(x)=>{this.x = x}}  onChange={this.change}></input>
        {total}
      </div>
    );
  }
}

ReactDOM.render(<Foo num={100} />,document.getElementById('root'))

