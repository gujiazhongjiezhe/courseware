import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import './index.less';

import titleLogo from '../../../../assets/images/navi_title_v2.png';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div className="main-header">
        <div className="logo-box">
          <img src={titleLogo}/>
        </div>
        <div className="search-box" onClick={this.jump}>
          <img src="https://img.youpin.mi-img.com/static/weex_images/v1/m/navi_search_v5.png"/>
          <span>年货嗨抢，最高直降1000</span>
        </div>
        <div className="msg-box">
          <div className="msg"></div>
        </div>
      </div>
    );
  }
  jump = ()=>{
    console.log(this.props.history);
    this.props.history.push({pathname:'/search'});
    // 通过history跳转的是编程式导航，link那种属于声明式导航
  }
}

export default withRouter(Header);
// withRouter的作用就是把route的history、match、location挂载到当前组件的属性上