import React, { Component } from 'react';
import {connect} from 'react-redux';
import action from '../../store/actions/todo'
class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleList = () =>{
    let {type,list} = this.props;
    if(type === 'all'){
      return list;
    }
    if(type === 'finish'){
      return list.filter(item=>{
        return item.isSelected
      })
    }
    if(type === 'unFinish'){
      return list.filter(item=>{
        return !item.isSelected
      })
    }
   
  }
  render() {
    return (
      <div>
        <ul className="list-group">
          {/* <li className="list-group-item">
            <input type="checkbox" checked={false}/>
            <span>今天还没有吃饭</span>
            <button type="button" className="btn btn-danger pull-right btn-xs">X</button>
          </li> */}
          {this.props.list && this.handleList().map(item=>{
              return <li className="list-group-item" key={item.id}>
            <input type="checkbox" 
            checked={item.isSelected}
            onChange={()=>{this.change(item.id)}}
            />
            <span>{item.value}</span>
            <button type="button" className="btn btn-danger pull-right btn-xs" onClick={()=>{this.del(item.id)}}>X</button>
          </li>
          })}
        </ul>
      </div>
    );
  }
  del = (id)=>{
    // 事件 -->action-types-->actions-->reducer
  this.props.del(id)
  }
  change = (id)=>{
    this.props.changeTodoState(id)
  }
}
let mapStateToProps = (state)=>{
  return {
    ...state.todo
  }
}
export default connect(mapStateToProps,action)(Body);
// 当前的高阶函数最终返回的是什么东西 返回的是一个高阶组件