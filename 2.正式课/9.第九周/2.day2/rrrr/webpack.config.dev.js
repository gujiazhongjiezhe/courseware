
const path = require('path');


module.exports = {

  mode:'development', 
  // 设置一个编译文件的入口
  entry:'./src/index.js',

  // 设置一个出口
  output:{
    // 编译后文件的名字
    filename:'bundle.js',
    // 这是编译文件所存放的路径，这里必须用绝对路径
    path: path.resolve(__dirname,'dist')
  }
}