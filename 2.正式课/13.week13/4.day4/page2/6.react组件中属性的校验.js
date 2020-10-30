import React,{Component} from 'react'; // 从React中解构出Component方法
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // 校验属性类型的

class Foo extends Component {

  constructor(props) {
    super(props);
  }
  static propTypes = { // 此处的名字是内部定义好的
    // 如果传递的属性类型对不上，只会在控制台抛出警告，但是不会影响页面渲染，vue和react是一样的
    age:PropTypes.number.isRequired,
    // age:PropTypes.string
    // age:PropTypes.bool
    // age:PropTypes.func
    // age:PropTypes.object
    // age:PropTypes.any
  }
  static defaultProps = { //此处的名字也是定义好的
    // 这里是改当前传递过阿奎的属性定义默认值的，如果外界没有传递某个属性，那就走这里的默认值，如果外界传递了，那就会把默认值覆盖
      age:800
  }

  render() {
    // 属性不能在子组件里进行修改
    //  this.props.age = 200; 不可以

    return (<div>
    
      {this.props.age}
 
    </div>)
  }

}


ReactDOM.render(<Foo age="700" time={100}></Foo>, document.getElementById('root'));