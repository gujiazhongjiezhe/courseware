let  x = 20;
let y = 10;
let A = require('./A');
// 第一次requireA模块，会把A模块中的代码从头到尾执行一遍，会把modules.exports中导出的结果拷贝一份赋值给变量A

A.sum(x,y);

A = require('./A');
 // 第二次requireA模块，内部会默认看一下之前有没有导入过，如果之前导入过，不会再把A模块执行，而是把之前拷贝的信息拿过来使用

