
const path = require('path');


module.exports = {

  mode:'production',  // development production 开发模式和生产模式

  entry:'./src/index.js',


  output:{

    filename:'bundle.[hash].min.js',
    path: path.resolve(__dirname,'dist')
  }
}