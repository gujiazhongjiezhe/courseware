import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../../store/actions/todo';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let {type} = this.props;
    return (
      <div>
        <ul className="nav nav-pills" onClick={this.changeType}>
          <li role="presentation" className={type === 'all'?'active':''}>
            <a href="#" data-type="all">全部任务</a>
          </li>
          <li role="presentation" className={type === 'finish'?'active':''}>
            <a href="#" data-type="finish">已经完成</a>
          </li>
          <li role="presentation" className={type === 'unFinish'?'active':''}>
            <a href="#" data-type="unFinish">未完成</a>
          </li>
        </ul>
      </div>
    );
  }
  changeType = (e) => {
    let type = e.target.dataset.type
    // console.dir(e.target);
    this.props.changeType(type)
  }
}
let mapStateToProps = (state)=>{
  return {
    ...state.todo
  }
}
export default connect(mapStateToProps,action)(Footer);