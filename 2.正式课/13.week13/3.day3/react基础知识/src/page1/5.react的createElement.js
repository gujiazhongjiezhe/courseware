import React from 'react';
import ReactDOM from 'react-dom';

let b = <div>
  <span>111</span>
</div>; // 叫做react元素

let a = React.createElement('div',{a:'1',b:'2'},React.createElement('span',null,'111'))
console.log(a);

ReactDOM.render(a,document.getElementById('root'));