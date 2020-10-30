import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Foo extends Component {

  constructor(props) {
    super(props);
  }
  // 不管你用哪种函数创建方法，在函数执行的时候咱们都让函数里的this指向当前实例
  fn(num) { // 次函数放到了Foo类的原型上
    console.log('fn');
    console.log(this); // un
    console.log(num);
  }
  fun = () => { // 放到当前实例上
    console.log('fun');
    console.log(this); // 当前实例
  }

  render() {
    // this-->当前实例
    //   on+事件类型  事件类型的首字母大写   事件对应的函数要放到组件原型或者实例上
    // 不管你用哪种函数创建方法，在函数执行的时候咱们都让函数里的this指向当前实例
    return (<div>
      <div onClick={this.fn}>点击我</div>
      <div onClick={this.fn.bind(this,100)}>点击我</div>
      <div onClick={(e)=>{this.fn(e,100)}}>点击我</div>
      {/* 如果函数执行时候行给函数传递参数，那就必须用后两种绑定方式,
      如果当前事件绑定的是就箭头函数，此时你比并不想改变this，知识想给他传参，那用bind的时候第一个参数写null站位就好了this.fn.bind(null,100) */}
    </div>)
  }

}




ReactDOM.render(<Foo></Foo>, document.getElementById('root'));