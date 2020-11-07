import React,{Component} from 'react';
import action from '../../store/actions/todo';
import {connect} from 'react-redux';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div>
        <h3 className="panel-title">您还有{this.count()}件事未完成</h3>
        <input type="text" className="form-control" onKeyUp={this.add}/>
      </div>
    );
  }
  count = ()=>{
    let length = this.props.list.filter(item=>{
      return !item.isSelected
    }).length;

    return length;
  }
  add = (e)=>{
    // 事件-->action-types-->actions-->reducer-->正常使用
    if(e.keyCode === 13){
      console.log('用户点击的是回车');
      console.log(e.target.value);
      this.props.add(e.target.value)
    }
  }
}
let mapStateToProps = (state)=>{
  return {
    ...state.todo
  }
}
export default connect(mapStateToProps,action)(Header);