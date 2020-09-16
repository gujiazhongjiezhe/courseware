let express = require('express');
let route = express.Router();
let {} = require('../promiseFs');
let {success} = require('../utils');

route.get('/list',(req,res)=>{
  let data = req.$DEPARTMENTDATA.map(item=>{
    return {
      id:item.id,
      name:item.name,
      desc:item.desc
    }
  });

  if(data && data.length === 0){
      success(res,{
        code:1,
        codeText:'暂无数据'
      });
      return;
  }
  success(res,{
    data
  });

});
module.exports = route;