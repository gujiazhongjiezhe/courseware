/* 
1、读取css文件夹中的目录
2、依次读取css文件中的内容，最后把每一个读取到的内容进行合并
3、把合并之后的css放到一个新的文件中，把这个新文件发放到dist文件夹中
*/

const { readdir, readFile, writeFile } = require('./promiseFs');
let less = require('less');
readdir('./css').then(result => {
  // [ 'index.css', 'reset.css']
  console.log(result);
  result = result.filter(item => /\.css$/i.test(item));

  // 通过css文件目录获取每一个css文件里的内容
  result = result.map(item => {
    return readFile(`./css/${item}`);
  });
  console.log(result);
  // [ Promise { <pending> }, Promise { <pending> } ]
  return Promise.all(result);
}).then(result => {
  result = result.join(''); // 把多个css内容合并成一个
  return result;
}).then(result => {
  // 把合并的内容进行压缩
  return new Promise((resolve, reject) => {
    less.render(result, {
      compress: true
    }, (err, result) => {
      console.log(result);
      if(err !==null){
        reject(err);
        return;
      }
      resolve(result.css);
    });
  });
}).then(result => {
  // 生成一个新的文件，把合并得内容放到新的文件里，并且把新文件放到dist文件夹中
  writeFile('./dist/index.min.css', result);
})