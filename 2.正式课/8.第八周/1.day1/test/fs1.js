// const fs = require('fs');

// 1、READ-DIR
// 读取指定的目录(相对绝对都可以)中的文件目录,他是一个同步的读取过程
// let res = fs.readdirSync('./node_modules'); // => ['A.js','B.js',....]
// console.log(res);

// 异步的读取文件目录，读取成功以后就会触发回调函数
// fs.readdir('./node_modules',(err,result)=>{
//   // 当目录读取成功以后该函数就会执行
//   console.log(err);
// err是读取失败的信息，如果读取成功，他的值是null
// result 读取成功之后的结果
//   if(err === null){
//     console.log(result);
//   }

// });
// console.log(100);


// 2、READ-FILE
// fs.readFileSync('文件的路径名称','编码格式'); // 如果不设置编码格式，默认得到的是Buffer的文件流格式的数据，设置成utf8，得到的是字符串(JSON格式，HTML，CSS)，但是对于富媒体资源(图片，音频，视频)，我们读取和传输的过程都是以Buffer的文件流格式操作的，所以不要设置utf8

// let res = fs.readFileSync('./index.html','utf8');
// console.log(res);

// fs.readFile('文件的路径名称','编码格式',回调函数)
// fs.readFile('./index.jpg',(err,result)=>{
//   if(err === null){
//     console.log(result)
//   }
// });
//------------------------------------------------------------
// 3、WRITE-FILE
// =>向文件中写入某个内容(如果文件不存在，他会默认创建一个文件在写入，如果有这个文件，那他就会他文件里的之前的内容进行覆盖)
// fs.writeFileSync('./D.js','123456','utf8');
// fs.writeFileSync('./D.js','哈哈','utf8'); // 把之前的进行覆盖，然后新增
// fs.appendFileSync('./D.js','嘻嘻','utf8'); //  在原来的基础之上进行追加
// fs.writeFile('文件路径名称','string或者buffer格式的内容','编码格式',回调函数)
// fs.writeFile('./D.js','1234567890','utf8',(err)=>{
//   // console.log(err); // 如果写入成功，他就是null
//   // 这个回调函数没有第二个形参，
//   // if(err !== null){
//   //   console.log('内部出错了');
//   // }
// })

// try {
//   fs.appendFileSync('G:/', '嘻嘻', 'utf8');
// } catch (e) {
//   // console.log(e);
// }

// console.log(100);

// -------------------------------------------------
// 4、
// 把某一个文件里的内容复制一份，放到一个新的文件里边
  // fs.copyFileSync('./A.js','./W.js');
  // fs.copyFile('./A.js','./W.js',(err)=>{
  //     if(err === null){
  //       console.log('copy成功');
  //     }
  // });
// console.log(fs);

//-----------------------------------------------------------
// 创建一个新目录
// fs.mkdir('./js',(err)=>{

// });

// 删除一个目录(如果目录中有内容，那就不能删除)
// fs.rmdir('./js',(err)=>{

// });

// 删除文件
// fs.unlink('./D.js',()=>{

// })


//------------------------

// fs.readFile('xxx',()=>{
//     // 在文件读取以后做什么事，

// })
// fs.readFile('xxx','utf8').then(result=>{
//     return result;
// }).then(data=>{

// });




//-------------------------------------------------------------
// console.log(__dirname); // 当前项目的绝对路径
// let path = require('path');
// console.log(path.resolve('./A.js')); // 输出的是当前打开终端的绝对路径
// 以后path.resolve里边写某一个文件的资源名称的时候以当前项目作为作为查找的相对路径

// console.log(path.resolve('./utils/aaa.js'));
// console.log(path.resolve('./utils/aaa.js'));


// console.log(path.resolve('./utils/aaa.js'));
// C:\Users\1\Desktop\test + \utils\aaa.js


//------------------------------------------------------------------
let {readFile,readdir,writeFile,copyFile} = require('./promiseFs');
// console.log(fs);

// readFile('./A.js').then((result)=>{
//   console.log(result);
// });

// readdir('./').then(result=>{
//   console.log(result);
// })

// writeFile('./A.js','嘻嘻嘻嘻嘻嘻嘻').then(()=>{
//   console.log('写入成功');
// })

copyFile('./A.js','./S.js').then(()=>{
  console.log('copy成功');
})





