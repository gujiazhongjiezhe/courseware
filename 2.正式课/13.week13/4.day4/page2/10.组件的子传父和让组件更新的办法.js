import React,{Component} from 'react';
import ReactDOM from 'react-dom';


// 想让组件更新，这块vue和他是一样的，当前组件的state状态或者props属性改变，才会更新组件

// 子传父：儿子不能直接改从外层传递过来的属性，但是可以让父亲把它的函数给我传递过来，在儿子里执行父亲的函数，从而父亲的函数就能够以状态的方式把值改了，然后重新流向儿子里边

// 某一个值相对于自己来说就是状态，如果把这个值传递到儿子里，那相对于儿子来说就是属性
class Father extends Component{
  constructor(props){
      super(props);
      this.state = { 
        num:1,
        age:2
      }
  }
  fn = (value)=>{  
    this.setState({
      num:value
    })
  }

  render(){
    console.log('render');
    let {num,age} = this.state;
    return (<div>
      {num}
      {age}
      <div onClick={this.fn.bind(null,2)}>点击</div>
      <Son num={this.state.num} fn={this.fn} />
    </div>)
  }
}

class Son extends Component {
  constructor(props){
    super(props)
  }
  ss = ()=>{
    this.props.fn(800)
  }
  render(){
    return (<div>我是儿{this.props.num}子组件<span onClick={this.ss}>我是想改父亲的num</span></div>)
  }
}

ReactDOM.render(<Father ></Father>,document.getElementById('root'));


