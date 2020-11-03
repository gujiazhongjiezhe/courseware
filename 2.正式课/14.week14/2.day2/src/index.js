import React from 'react';
import ReactDOM from 'react-dom';
import Count from './page2/1.组件优化';
import UseState from './page2/2.UseState';

import UseEffect from './page2/3.UseEffect';
import UseRef from './page2/4.UseRef'
import UseReducer from './page2/UseReducer'


ReactDOM.render(<div>
  {/* <Count/> */}
  {/* <UseState></UseState> */}
  {/* <UseEffect></UseEffect> */}
  {/* <UseRef></UseRef> */}
  <UseReducer></UseReducer>
</div>,document.getElementById('root'))