import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Button from './Button';
import Pagination from './Pagination';
import '../../assets/banner.css';

import pic1 from '../../assets/images/banner01.jpg';
class Banner extends Component {
  static defaultProps = { // 给当前组件的属性赋默认值
    data: [],
    interval: 2000,
    speed: 500,
    activeIndex: 0,
    pagination: true,
    button: true
  }
  static propTypes = { // 校验当前组件属性的类型和是否毕传
    data: PropTypes.array,
    interval: PropTypes.number,
    speed: PropTypes.number,
    activeIndex: PropTypes.number,
    pagination: PropTypes.bool,
    button: PropTypes.bool
  }
  constructor(props) {
    super(props);
    let { data, activeIndex, speed } = this.props;
    // data是外界传递过来的属性，不能直接改
    // data.push(data[0]); // 这里data是一个引用值，你是往引用值的堆内存里增加东西，然后其实属性data是被你改变了的
    let s = [...data, { id: data.length + 1, pic: data[0].pic }];
    // 这里是浅克隆一遍data，给data最后增加第一张图片
    console.log(data, s);
    this.state = {
      data: s,
      activeIndex,
      speed
    };
  }
  render() {
    console.log('ok');
    let { data, activeIndex, speed } = this.state;
    let style = {
      left: -activeIndex * 1000, // 控制wrapper的left值
      transition: `left ${speed}ms linear` // 控制wrapper的过度动画的时间
    }
    return (
      <div className="container"
        onMouseEnter={() => { clearInterval(this.timer) }}
        onMouseLeave={() => { this.timer = setInterval(this.autoMove, this.props.interval) }}>
        <div className="wrapper" style={style} ref={x => this.wrapper = x}>
          {data.map(item => {
            return <div className="slide" key={item.id}>
              <img src={item.pic} />
            </div>
          })}
        </div>
        {this.props.pagination ? <Pagination
          changeIndex={this.changeIndex}
          data={this.props.data}
          activeIndex={activeIndex}>

        </Pagination> : null}
        {this.props.button ? <Button buttonChange={this.buttonChange}></Button> : null}
      </div>
    );
  }
  buttonChange = type => {
    let { activeIndex, data, speed } = this.state;
    if (type === 'left') {
      activeIndex--;
      if (activeIndex < 0) {
        this.setState({
          activeIndex: data.length - 1,
          speed: 0
        }, () => {
          activeIndex = data.length - 2;
          let a = this.wrapper.offsetHeight;
          this.setState({
            activeIndex,
            speed
          });
        })
        return;
      }
      this.setState({
        activeIndex,
        speed
      })
      return;
    }
    if (type === 'right') {
      setTimeout(() => {
        this.autoMove();
      }, 0)

      // activeIndex++;
      // if (activeIndex >= data.length) {

      //   this.setState({
      //     activeIndex: 0,
      //     speed: 0
      //   }, () => {
      //     activeIndex = 1;
      //     let a = this.wrapper.offsetHeight;
      //     this.setState({
      //       activeIndex,
      //       speed
      //     });
      //   });



      //   return;
      // }
      // this.setState({
      //   activeIndex,
      //   speed
      // });
    }
  }
  // 这是改变焦点跟随的和点击焦点实现图片的返跟随
  changeIndex = (index) => {
    this.setState({
      activeIndex: index
    })
  }
  autoMove = () => {
    // 0 1 2 3 4
    let { activeIndex, data, speed } = this.state;
    activeIndex++;
    if (activeIndex >= data.length) {
      this.setState({
        activeIndex: 0,
        speed: 0
      });
      activeIndex = 1;
      let a = this.wrapper.offsetHeight; // 给浏览器用的，因为上下两次更改的都是同一个样式，浏览器有优化机制，如果两次样式之间没有读的操作的话，只会触发一次dom的回流和重绘
    }
    this.setState({
      activeIndex,
      speed
    });


  }
  componentDidMount() {
    this.timer = setInterval(this.autoMove, this.props.interval);
  }
}

export default Banner;