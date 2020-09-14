// let A = require('./A.js');
// let fs= require('fs');
// let jq = require('jquery');

//  // 引入的时候.js可以省略
//  // 他会把当前引入的模块从头到尾执行一遍

// console.log(100);
// // console.log(fs);
// console.log(jq);
// A.fn();

// function ss(){
//   console.log(789);
// }

// module.exports = {
//   ss:ss
// }

const A = require('./A');
const {sum} = require('./A');
// let {sum} = A;
function avg(...arg){
  arg = arg.sort((a,b)=>a-b).slice(1,arg.length-1);
  return sum(...arg)/arg.length

}

module.exports = {
  avg
}

