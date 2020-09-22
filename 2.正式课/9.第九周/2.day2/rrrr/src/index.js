import {sum} from'./A';
// import必须放到最上面
const {ss}  = require('./B');

console.log(sum()); // 100
console.log(ss()); // 800
console.log(100);


// dist包以后要上传到服务器上的代码

// src下的文件是你开发编写代码的地方