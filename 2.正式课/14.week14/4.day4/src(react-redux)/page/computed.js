import React,{Component} from 'react';
// import store from '../store/index.js';
import {connect} from 'react-redux'

class Computed extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   num:store.getState().count.num
    // };
  }
  // componentDidMount(){
  //   store.subscribe(()=>{
  //     this.setState({
  //       num:store.getState().count.num
  //     })
  //   })
  // }
  render() {
    // let {num} = this.state;
    return (
        <div>
          <span>{this.props.num%2 === 0 ?'偶数':'奇数'}</span>
        </div>
    );
  }
}
let mapStateToProps = (state)=>{
  return {
    ...state.count
  }
}
export default connect(mapStateToProps)(Computed);


// 那connect包裹之后导出的已经不是原来的组件了
