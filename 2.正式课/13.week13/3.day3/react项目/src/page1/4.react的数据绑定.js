import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
let  res = [{name:'erYa',age:18},{name:'lisi',age:24}];
// [<div><span>erYa</span><span>18</span></div>,<div><span>lisi</span><span>24</span></div>]

console.log(res);
let a = <div>
  {res.map(item=>{
  return <div key={item.age}>
    <span>{item.name}</span>
    <span>{item.age}</span>
  </div>
})}
</div>

ReactDOM.render(a,document.getElementById('root'));