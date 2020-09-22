let less = require('less');
let fs = require('fs');
less.render(fs.readFileSync('./index.less','utf8'),(err,res)=>{
  console.log(res.css);
});