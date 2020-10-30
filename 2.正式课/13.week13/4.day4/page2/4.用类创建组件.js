import React from 'react';
import ReactDOM from 'react-dom';

// 函数创建的组件时无状态的，没有生命周期， 没有this
// 用类创建组件 :有this，有生命周期，有状态
class Foo extends React.Component {
  // 在Foo类里constructor和render其实都是react生命周期里的一部分
  constructor(props) {
    console.log(props);
    super(props);
    console.log(this.props); // this就是当前正在创建的组件实例
    // 在constructor钩子函数执行的时候，还没有把从外界传递过类的属性放到props中
    // 如果不写形参props在这里你是取不到传递过来的属性的

    // 当执行constructor的时候，实例上的props默认是undefined，在后期才会给实例的props赋值，但是如果在constructor的super中传递实参props，那就会立即给实例的props赋值
  }
  render() {
    // render函数里的this是当前组件实例
    // 当使用此组件的时候，render函数就会执行，render函数return的值就是当前组件的结构

    // return (<div>我是类声明组件</div><div>我是类声明组件</div>) 最后return的react只能有一个根元素
    console.log(this);
    return (<div>
      {this.props.age}
    </div>)
  }

}

ReactDOM.render(<Foo age="100"></Foo>, document.getElementById('root'));