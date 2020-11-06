import React, { Component } from 'react';
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <ul className="nav nav-pills">
          <li role="presentation" className="active"><a href="#">全部任务</a></li>
          <li role="presentation"><a href="#">已经完成</a></li>
          <li role="presentation"><a href="#">未完成</a></li>
        </ul>
      </div>
    );
  }
}

export default Footer;