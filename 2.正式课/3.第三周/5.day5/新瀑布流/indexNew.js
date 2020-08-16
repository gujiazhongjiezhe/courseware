(function () {
  /* 
  进行ajax数据请求，
  */
 let imgs = document.getElementsByClassName('bg');
 let uls = utils.toArray(document.getElementsByTagName('ul'));
//  console.log(imgs);
  let data = null;
  let xhr = new XMLHttpRequest;
  xhr.open('get', 'data.txt', false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
      // 2开头的三位数
      data = JSON.parse(xhr.responseText);
    }
  }
  xhr.send();
  console.log(data);

  /* 
  把数据渲染到页面
  */
  
  renderHtml();
  function renderHtml() {

    for (var i = 0; i < 20; i++) {
      // 通过random随机获取一个索引，通过索引去data里取值

      let index = Math.round(Math.random() * (9 - 0) + 0); // 产生0-9之间的随机整数
      let curImg = data[index]; // 通过索引获取图片的信息

      // 动态创建img元素和p元素和li元素
      let img = document.createElement('img');
      let p = document.createElement('p');
      let li = document.createElement('li');


      p.innerText = curImg.title; // 给p增加内容
      img.setAttribute('true-img', curImg.src);
      img.className = 'bg';
      img.style.height = Math.round(Math.random() * (250 - 180) + 180) + 'px';
      // img.style.height = curImg.height;
      // 图片的高度是从180-250
      li.appendChild(img);
      li.appendChild(p);
      // 排序的目的是为了把li均匀的放到每一个ul里，每放一次就排序一次，那最短的ul永远在前边
      uls.sort((a,b)=>{
        // 按照内容的真实高度去排序
        return a.scrollHeight - b.scrollHeight;
      });
      uls[0].appendChild(li); // 把当前的li放到最短的ul里边
    }


    // console.log(imgs);

    function delay(){
      // console.log(imgs,59);
      for(var i = 0;i<imgs.length;i++){
        // imgs[i]// 代表每一个图片
        delayImg(imgs[i]);
      }
    }


    function delayImg(img){
      // console.log(1);
      if(img.flag){
        return; 
      }
        let imgH = img.offsetHeight,
            imgT = utils.offset(img).top,
            screenH = utils.win('clientHeight'),
            screenT = utils.win('scrollTop');
        if(screenH+screenT>=imgH+imgT){
          let address = img.getAttribute('true-img');
          img.src = address;
          img.flag = true;
          // img.className = ''; // 当图片加载完成之后，把当前img的类名bg去掉，房子以后再去加载这个图片(因为imgs是通过类名获取的，把类名去掉，imgs会自动更新，这样imgs里面只剩下没有加载的图片了)
          img.onerror = function(){
            // 当图片路径加载失败时，给当前图片赋值一个默认图片
            img.src = './img/default.jpg';
          }
        }
        
    }
    delay();
    window.onscroll = function(){
      // 临界条件： body的真实高度 === 浏览器滚动条卷曲的高度 + 当前屏幕可视区域的高度
      let bodyH = utils.win('scrollHeight'); // 当前body的内容的真实高度
      let screenH = utils.win('clientHeight'); // 屏幕可视区域的高度
      let screenT = utils.win('scrollTop'); // 浏览器滚动条卷曲的高度
      // console.log(screenH,screenT,bodyH);
      if(screenH+screenT+100 >= bodyH){ // 为了让滚动条在触底之前就成立，咱们给他加了100
        renderHtml(); // 重新渲染数据
      }
      delay();
    }






  }


})()