const fs = require('fs');
const path = require('path');
let obj = {};
function suffixHandle(pathname) {
  // 如果读取的文件是富媒体，那不能设置utf8编码格式
  // './index.jpg'
  let suffixReg = /\.([0-9a-zA-Z]+)$/;
  let suffix = suffixReg.exec(pathname) && suffixReg.exec(pathname)[1];
  // console.log(suffix); // 'jpg'

  return /^(JPG|PNG|JPEG|MP3|MP4|GIF)$/i.test(suffix) ? null : 'utf8';

}

['readFile', 'readdir', 'mkdir', 'rmdir', 'unlink'].forEach(item => {
  obj[item] = function (pathname) {
    let encoding = suffixHandle(pathname);

    pathname = path.resolve(pathname); // 把相对路径改为绝对路径(这样以后你写路径的时候都得相对于test项目去写了)

    return new Promise((resolve, reject) => {
      let callBack = (err, result) => {
        if (err !== null) {
          reject(err)
          return;
        }
        resolve(result);
      };
      if (item !== 'readFile') {
        // 如果当前不是readFile，那只需要传递两个参数即可，第二个参数是回调函数
        encoding = callBack;
        callBack = null;
      };

      fs[item](pathname, encoding, callBack);
    })
  };
});

// fs.readdir(pathname,callBack)

['writeFile', 'appendFile'].forEach(item => {
  obj[item] = function (pathname, content) {
    let encoding = suffixHandle(pathname);
    // 用户设置内容的时候，得是字符串或者buffer文件流
    content !== null && typeof content === 'object' ? content = JSON.stringify(content) : null;
    typeof content !== 'string' ? content = content + '':null;

    pathname = path.resolve(pathname); // 把相对路径改为绝对路径(这样以后你写路径的时候都得相对于test项目去写了)

    return new Promise((resolve, reject) => {
      let callBack = (err, result) => {
        if (err !== null) {
          reject(err)
          return;
        }
        resolve(result);
      };


      fs[item](pathname, content, encoding, callBack);
    })
  };
});

obj['copyFile'] = function (pathname1, pathname2) {

  pathname1 = path.resolve(pathname1);
  pathname2 = path.resolve(pathname2);

  return new Promise((resolve, reject) => {
    let callBack = err => {
      if (err !== null) {
        reject(err);
        return;
      }
      resolve();
    };
    fs['copyFile'](pathname1, pathname2,callBack);
  })
};
// fs.write(pathname, 123456, 'utf8', () => { })

// console.log(obj);






// function readFile(pathname) {
//   // 如果读取的文件是富媒体，那不能设置utf8编码格式
//   // './index.jpg'
//   let suffixReg = /\.([0-9a-zA-Z]+)$/;
//   let suffix = suffixReg.exec(pathname) && suffixReg.exec(pathname)[1];
//   console.log(suffix); // 'jpg'
//   let encoding = 'utf8';
//   /^(JPG|PNG|JPEG|MP3|MP4|GIF)$/i.test(suffix) ? encoding = null:null

//   return new Promise((resolve, reject) => {
//     fs.readFile(pathname, encoding, (err, result) => {
//       if (err !== null) {
//         // console.log(err);
//         reject(err)
//         return;
//       }
//       // console.log(result);
//       resolve(result)
//     });
//   })
// };




// readFile('./A.js').then(result => {
//   console.log(result, 18);
//   return result
// }).then(result => {
//   // console.log('当上边成功我干什么事');
// });

module.exports = obj;