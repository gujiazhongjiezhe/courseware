import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './header';
import Body from './body';
import Footer from './footer';
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container" style={{ width: '500px' }}>
        <div className="row">
          <div className="panel panel-success" >
            <div className="panel-heading">
              <Header></Header>
              
            </div>
            <div className="panel-body">
              <Body></Body>
            </div>
            <div className="panel-footer">
              <Footer></Footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;