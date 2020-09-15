const { fstat } = require("fs");

// fs path url
const url = require('url');
// 这个模块是专门用来解析url的
// url.parse(str,true) 是专门用来解析url中的每一部分的，第一个参数传要处理的url，第二个参数传true，他会自把问号穿的参数解析成键值对的形式方便咱们使用

// 解析的url不需要是完整的。一部分也可以
let str = 'http://www.baudi.com:8080/index.html?name=1&age=2#index'
console.log(url.parse(str,true));

let query = url.parse(str,true).query;
console.log(query);