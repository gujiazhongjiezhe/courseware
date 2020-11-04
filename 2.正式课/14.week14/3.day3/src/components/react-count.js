import React, { Component } from 'react';
import store from '../store/index.js';
import {ADD_NUM,MIN_NUM} from '../store/action-types';
import actions from '../store/actions/count';

console.log(store.getState());
class Count extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: store.getState().count.value
    };
  }
  render() {
    console.log('ok');
    return (
      <div>
        <button onClick={() => { this.add(2) }}>+</button>
        {/* <span>{store.getState().value}</span> */}
        <span>{this.state.value}</span>
        <button onClick={() => { this.min(2) }}>-</button>
      </div>

    );
  }
  add = (payload) => {
    // store.dispatch(actions.add(payload));
    // add函数执行会返回你想要的对象
    store.dispatch({type:ADD_MUN,payload:payload});
  }
  min = (payload) => {
    store.dispatch(actions.min(payload));
    // min函数会执行会返回你想要的对象
    // store.dispatch({type:MIN_NUM,payload:payload});
  }
  componentDidMount() {

    // store.subscribe(() => {
    //   // this-->
    //   this.forceUpdate()
    // })

    store.subscribe(() => {
      this.setState({
        value: store.getState().count.value
      })
    })


  }
}

export default Count;