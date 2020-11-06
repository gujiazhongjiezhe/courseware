import React, { Component } from 'react';
import {connect} from 'react-redux';
class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          {this.props.list && this.props.list.map(item=>{
              return <li className="list-group-item" key={item.id}>
            <input type="checkbox" checked={item.isSelected}/>
            <span>{item.value}</span>
            <button type="button" className="btn btn-danger pull-right btn-xs">X</button>
          </li>
          })}
        </ul>
      </div>
    );
  }
}
let mapStateToProps = (state)=>{
  return {
    ...state.todo
  }
}
export default connect(mapStateToProps)(Body);