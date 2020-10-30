import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Bar extends Component{
  constructor(props){
      super(props) // 能够保证你的this上立马就会有从外界传递过来的属性
      this.state = { // vue中的data就相当于react中的state
        num:1,
        age:2
      }
  }
  fn = (value)=>{
    // this.state.num = 100; // 这种智能改状态，但是视图不会刷新

    // this.setState({
    //   num:100
    // },()=>{
    //   // 这是一个回调函数，他会等到render执行完成之后在执行
    //   console.log('回到函数');
    // }); // setState会做两件事，一个事让state中的状态发生变化，一个事调用render函数执行

    // console.log(this);
    // this.setState({
    //   num:this.state.num+value
    // });

    // this.setState({
    //   num:this.state.num+value
    //   age:2
    // });
    // 如果多次调用setState，并不会立马执行改状态的逻辑，而是等到函数执行完，把所有的steState改状态合并成一次，render也执行一次(改状态是异步的)

    // 如果你就想改状态执行两次，可以给setState的第一个参数传递回调函数
    // this.setState((prevState)=>{
        // prevState是上一次的state
    //   return {
    //     num:prevState.num+value
    //   }
    // });
    // this.setState((prevState)=>{
      // prevState是上一次改完之后的state
    //   return {
    //     num:prevState.num+value
    //   }
    // });
    // 如果当前的操作依赖上一次的状态的值了，这时候可以给setState的第一个形参传递函数



    // 下边这种利用setState的第二个回调函数的形式也能解决，就是不太好
    // this.setState({
    //   num:this.state.num+value
    // },()=>{
    //   this.setState({
    //     num:this.state.num+value
    //   })
    // })
    // 这种方法会让render执行两次，用在这里是不太合适的
    
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

ReactDOM.render(<Bar></Bar>,document.getElementById('root'));


