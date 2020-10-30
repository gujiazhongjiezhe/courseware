import React from 'react';
import ReactDOM from 'react-dom';


class Foo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // 想让页面发生变化，必须让当前的render函数重新执行
    console.log(200);
    // this是当前实例，并且当前函数也是一个私有作用域,可以写私有的变量
    let ss = 800;

    return (<div>
      {this.props.time.toLocaleTimeString()}
      {ss}
    </div>)
  }

}
let time = new Date();
// 我想每个三秒钟更新一次time，并且让组件里的time也更新
setInterval(() => {
  time = new Date();
  ReactDOM.render(<Foo age="100" time={time}></Foo>, document.getElementById('root'));
}, 3000);
ReactDOM.render(<Foo age="100" time={time}></Foo>, document.getElementById('root'));