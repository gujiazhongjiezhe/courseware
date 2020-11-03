import React,{Component} from 'react';

// let newObj = {num:0,data:[{name:1},{}]}
// let  oldObj = {num:0,data:[{},{}]}
function shoalCompare(newObj,oldObj){
  console.log(Object.keys(newObj).length,Object.keys(oldObj).length,6);
  if(Object.keys(newObj).length !== Object.keys(oldObj).length){
    return false
  }
for(let key in newObj){
  console.log(newObj[key], oldObj[key],11);
  // 比较当前的对象里的键值对的值相等不相等
  if(newObj[key] !== oldObj[key]){
      return false
  }
  
}
  return true

}
class Son extends React.PureComponent {
  render(){
    return (<div>
    我是儿子组件{this.props.num}
    </div>)
  }
}

class Count extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      num:0,
      data:[]
    };

  }
  render() {
    console.log('Count-render');
    return (
      <div>
        <div>我是父亲</div>
        <button onClick={this.fn(1)}>单击</button>
        <Son num={this.state.num}></Son>
      </div>
    );
  }
  fn = ()=>{
    console.log(1);
    // this.state.data.push(0);
    // this.setState({num:1}); // 此时我没有更改state里的任何状态，所以页面应该不更新，但是setState的机制是只要调用就会执行render函数
    // this.setState({})
    // this.state.data.push(0);
    // this.setState({
    //   data:[...this.state.data,0] // 这样写是可以的
    // })

    // this.setState({num:100})
    this.state.data.push(0);
    this.setState({})

   
  }
  // shouldComponentUpdate(nextProps,nextState){
  //     // 只要把状态改了，render就得执行
  //     return !shoalCompare(nextState,this.state) || !shoalCompare(nextProps,this.props)
  // }
}

export default Count;


/* 
pureComponent他可以自动帮咱们进行一次属性或者状态的浅比较，但是如果当前组件的状态很复杂，还是不要用它为好，如果你的组件状态使用情况一般，状态不是有很多，那就 可以使用它

this.forceUpdate 强制更新视图，但是他跟setState更新视图是有区别的，setState更新视图的生周期函数执行的顺序是
shouldComponentUpdate--> componentWillUpdate -->render->componentDidUpdate

如果是强制更新视图，this.forceUpdate那生命周期函数的执行顺序是
componentWillUpdate -->render->componentDidUpdate

this.setState({})

*/