
import React,{Component} from 'react';

let res = React.createContext(); // createContext是一个对象，里边有两个凤封装好的组件 Provider  Consumer
class Son extends Component {
  constructor(props){
    super(props)
  }
  static contextType = res; // 这种方式就是把上下文的信息放到当前组件的this.context中
  
  render(){
    // 使用Consumer组件可以接受上下文的信息，把Consumer写到最外层，然后在Consumer组件的内写一个函数，函数的形参就是上下文的信息，此函数return的元素就是当前组件的结构
    // return <res.Consumer>
    //     {
    //       (context)=>{
    //         return <span>{context.num}</span>
    //       }
    //     }
    // </res.Consumer>
    return <div>{this.context.num}</div>
    
  }
}

export default class Context extends Component {
  constructor(props){
    super(props)
    this.state = {
      num:0
    }
  }
  render(){
    // 使用Provider组件可以给上下文指定内容，当前组件严肃最为层拿Provider组件包裹起来，组件行间的value属性可以传递一个对象，对象里的内容就是上下文的内容
    return <res.Provider value={{ 
     ...this.state
    }}>
      <Son></Son>
    </res.Provider>

  }
}

