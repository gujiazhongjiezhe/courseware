(function(){
  // 1.请求数据 渲染数据

  /* 
  1、创建一个变量，用来接收请求来的数据
  2、利用ajax进行数据请求，把请求来的数据给到data
      1、创建一个ajax实例
      2、打开一个连接请求，基于get请求方式完成同步请求
      3、监听服务器返回的信息状态，如果状态是2开头的两位数，说明数据请求成功
      4、发送ajax请求
  */
 let data = null;
 let xhr = new XMLHttpRequest;
 xhr.open('get','./json/product.json',false);
 xhr.onreadystatechange = function(){
   // 如果状态200，而且请求的步骤是4
   if(xhr.status === 200 && xhr.readyState === 4){
        data = xhr.responseText; // 这就是从后台请求来的数据
        console.log(data);
   }
 }
 xhr.send();


})();

