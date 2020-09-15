// console.log(__dirname); // 当前模块项目的绝对路径 C:\Users\1\Desktop\222
// console.log(__filename); // 当前模块的绝对路径 C:\Users\1\Desktop\222\1.path.js
let path = require('path');

// console.log(path.resolve()); // C:\Users\1\Desktop\222  这是当前打开终端的绝对路径(跟当前模块在哪没有关系)


console.log(path.resolve('../11.bat')); // C:\Users\1\Desktop\11.bat
// resolve里传递的参数是相对于当前resolve找到的绝对路径来说的(这里的../是找的当前resolve基础路径的上一级)


// 我想得到utils里的index.css的绝对路径
console.log(path.resolve('./utils/index.css')); //  
// C:\Users\1\Desktop\222\index.css
// 以后咱们打开终端的时候，都是打开的当前项目的终端，那这样path.resolve的输出的绝对路径就是当前项目的绝对路径，这样以后咱们在拼接某一个模块的路径的时候，就以当前项目为基准去写路径就好了

// 这样的好处就是以后所有的路径都是根据当前项目去找