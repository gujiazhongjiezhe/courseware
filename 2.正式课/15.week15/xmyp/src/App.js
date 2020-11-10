import React,{Component} from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import Home from './pages/home';
import Classfl from './pages/classfl';
import Cart from './pages/cart';
import Taste from './pages/taste';
import Personal from './pages/personal';
import Search from './pages/search';
import Tab from './components/tab';

import './assets/css/reset.min.css';
import './assets/css/common.less'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/home' component={Home}/>
          <Route path='/classify' component={Classfl}/>
          <Route path='/taste' component={Taste}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/personal' component={Personal}/>
          <Route path='/search' component={Search}/>
          {/* 当上面的路由都没有匹配成功，那就重定向到首页 */}
          {/* <Route path="*" component={Home}></Route> */}
          <Redirect to="/"></Redirect>
        </Switch>

         {/* 下边存放的是link导航按钮 */}
         <div>
         <Tab></Tab>
         </div>
      </HashRouter>
    );
  }
}

export default App;