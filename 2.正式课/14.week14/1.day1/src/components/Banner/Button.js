import React, { Component } from 'react';
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="button">
        <a href=""
          className="button-prev"
          onClick={(e) => { this.change(e, 'left') }}>
        </a>

        <a href=""
          className="button-next"
          onClick={(e) => { this.change(e, 'right') }}>
        </a>
      </div>
    );
  }
  change = (e,type) => {
    e.preventDefault();
    this.props.buttonChange(type)
  }
}

export default Button;