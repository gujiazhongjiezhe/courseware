import React,{Component} from 'react';
import ReactDOM from 'react-dom';
let a = 100;
// react生命周期：在当前组件创建的时候，在不同的阶段就会执行不同的钩子函数，这些在特定阶段执行的钩子函数就是声明周期函数，咱们可以在不同的组件创建的不同阶段加入咱们自己的逻辑
class Foo extends Component {
  static defaultProps = {
    age:100
  }
  constructor(props) {
    super(props);
    this.state = {
      age:100,
      num:100
    };
    this.a = 100; // 给实例增加一个静态的属性
    console.log('father-->constructor');
    // 一般在constructor中进行状态的初始化，也可以获取到从外界传递过来的属性赋值给状态
    // console.log(this.props.age);
  }
  componentWillMount(){
    // setTimeout(()=>{
    //   this.setState({
    //     age:300
    //   });
    // },5000);
    
    console.log('father-->componentWillMount');
    // 在组件挂载之前会执行这个函数(这时候render还没有执行)，咱们可以在这里更改state里的状态，而不让render函数触发多次
  }

  change = ()=>{
    this.setState({
      // age:800
      num:400
    })
  }
  changeAge = ()=>{
    ReactDOM.unmountComponentAtNode(document.getElementById('root')); // 卸载root元素中的组件
    
    // this.setState({
    //   age:800
    //   // num:400
    // })
  }
  render() {
    console.log('father-->render');
    return (<div>
      {this.state.age}
      <Child msg={this.state.num}></Child>
      <span onClick={this.change}>点击改变num</span>
      <span onClick={this.changeAge}>点击改变age</span>
    </div>);
  }
  componentDidMount(){
    // 在这里发送请求
    console.log('father-->componentDidMount');

  }
  
  shouldComponentUpdate(newProps,newState){
    // 函数的第一个形参是最新的属性
    // 函数的第二个形参是最新的状态
    // 此函数是在componentWillUpdate之前运行的，初始化不执行，当改变state的时候才会执行，在这里可以控制组件的更新与否
    console.log('father-->shouldComponentUpdate');
    // console.log(this.state.age, newState.age);
    // if(this.state.age === newState.age){
    //   return false;
    // }
    return true;
  }
  componentWillUpdate(){
    // 当组件重新渲染之前执行
    console.log('father-->componentWillUpdate')
  }
  componentDidUpdate(){
    // 组件渲染完成执行
    console.log('father-->componentDidUpdate');
  }
  componentWillUnmount(){
    console.log('componentWillUnmount');
    // 在组件销毁的时候执行
  }

}

class Child extends Component {
  constructor(props){
    super(props)
    this.state = {
      s:300
    }
    console.log('son-->constructor');
  }
  componentWillMount(){
    console.log('son-->componentWillMount');
  }
  render(){
    console.log('son-->render');
    return <div >我是儿子{this.props.num}</div>
  }
  componentDidMount(){
    console.log('son-->componentDidMount');
  }
  componentWillReceiveProps(newProps){
    console.log('son->componentWillReceiveProps');
    // 可以发送数据请求，让请求完成之后调用setState就可以
    this.setState({s:300});
    // 在这里可以拿到最新的属性，然后你可以判断到底要不要去改你的状态，如果想改就赶紧改，这时候只会触发一个render更新

  }
  shouldComponentUpdate(newProps,newState){

    // this.setState({s:300}) 在这里不要调用setState，会形成死递归
    console.log(newProps);
    console.log(this.props.msg);

    // if(this.props.msg === newProps.msg){
    //   return false
    // }
    return true
  }
  componentWillUpdate(){
    console.log('son-->componentWillUpdate');
  }
  componentDidUpdate(){
    console.log('son-->componentDidUpdate');
  }
}
 
 //当页面初次渲染的时候 constructor-->componentWillMount-->render-->componentDidMount
 // 更新状态的时候
//  shouldComponentUpdate-->componentWillUpdate-->render-->componentDidUpdate

// 父亲和儿子生命周期的执行顺序
// constructor-->componentWillMount-->render   son-->constructor-->son-->componentWillMount-->son-->render-->son-->componentDidMount  -->componentDidMount

ReactDOM.render(<Foo />,document.getElementById('root'))

