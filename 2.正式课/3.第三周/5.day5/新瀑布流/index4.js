// (function () {
//     /* 
//     数据请求

//      */
//     let data = null;
//     let winH = utils.win('clientHeight');
//     let xhr = new XMLHttpRequest;
//     xhr.open('get', './data.txt', false);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
//             data = JSON.parse(xhr.responseText);
//         }
//     };
//     xhr.send();

//     /* 
//     数据渲染
//     */
//     let uls = document.getElementsByTagName('ul'); // 获取页面中的所有ul
//     uls = utils.toArray(uls); // 类数组转数组
//     renderHtml();

//     function renderHtml() {
//         for (var i = 0; i < 50; i++) {
//             let index = Math.round(Math.random() * 9) // 产生一个0到9之间的随机数字作为索引；
//             let curImg = data[index]; // 随机产生一个图片的信息

//             let li = document.createElement('li');
//             let img = document.createElement('img');
//             let p = document.createElement('p');

//             p.innerHTML = curImg.title;
//             img.className = 'bg';
//             img.setAttribute('true-img', curImg.src); // 把图片的真实的路径设置到img的行内，方便一会使用
//             img.style.height = Math.round(Math.random() * (250 - 180) + 180) + 'px';

//             li.appendChild(img);
//             li.appendChild(p);

//             uls.sort((a, b) => a.scrollHeight - b.scrollHeight);
//             uls[0].appendChild(li);
//         }
//     }

//     let imgs = document.getElementsByClassName('bg');

//     function dealy() {
//         for (var i = 0; i < imgs.length; i++) {
//             dealyImg(imgs[i])
//         }
//     }

//     function dealyImg(img) {
//         if (img.flag) {
//             return;
//         };
//         /* 
//         当前图片的下边框 === 当前浏览器可视窗口的下边框
//         图片的总高度+图片的上偏移量 === 浏览器滚定条卷去的高度+浏览器可视窗口的高度
//          */
//         let imgH = img.offsetHeight; // 图片的总高度
//         let imgT = utils.offset(img).top; // 图片距离body的上偏移量

//         // let winH = utils.win('clientHeight'); // 浏览器可视窗口的高度
//         let winT = utils.win('scrollTop'); // 浏览器滚动条卷去的高度
//         // console.log(imgH,imgT,winH,winT)
//         if (winH + winT > imgH + imgT - 150) {
//             let address = img.getAttribute('true-img');
//             let newImg = new Image;
//             newImg.src = address;
//             newImg.onload = function () {
//                 img.src = address;
//                 newImg = null;
//                 img.flag = true;
//                 img.className = '';
//                 fadeIn(img);
//             }
//         }
//     }

//     function fadeIn(img) {
//         img.style.opacity = 0.05;
//         let cur = parseFloat(img.style.opacity);
//         var timer = setInterval(function () {
//             cur += 0.05;
//             img.style.opacity = cur;
//             if (cur >= 1) clearInterval(timer);
//         }, 50)
//     }

//     function delayRender() {
//         /* 
//     滚动条卷去的高度+当前浏览器窗口的高度 === body的真实高度 
//     */
//         let bodyH = utils.win('scrollHeight');
//         let winT = utils.win('scrollTop');
//         if (winT + winH >= bodyH - 100) {
//             renderHtml()
//         }
//     }
//     dealy(); // 当代码初次加载的时候让第一屏的图片进行加载
//     window.onscroll = function () {
//         dealy();
//         delayRender();
//     }
// })()
(function () {
    let data = null;
    let xhr = new XMLHttpRequest;
    xhr.open('get', './data.txt', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            data = JSON.parse(xhr.responseText)
        }
    };
    xhr.send()

    let uls = document.getElementsByTagName('ul')
uls = utils.toArray(uls);

function renderHtml() {
    for (var i = 0; i < 50; i++) {
        let index = Math.round(Math.random() * 9)
        let curImg = data[index]
        console.log(curImg)
        let li = document.createElement('li')
        let img=document.createElement('img')
        let p = document.createElement('p')

        p.innerHTML = curImg.title;
        img.className = 'bg'
        img.setAttribute('true-img', curImg.src);
        img.style.height = Math.round(Math.random() * (250 - 1800) + 180) + 'px'


        li.appendChild(img);
        li.appendChild(p);

        uls.sort(function (a, b) {
            return a.scrollHeight - b.scrollHeight;
        })
        uls[0].appendChild(li)
    }
}
renderHtml();

  let imgs =document.getElementsByClassName('bg');
  function dealy(){
      for (var i=0;i<imgs.length;i++){
          dealyImg(imgs[i])
      }
  }
    function dealyImg(img){
        if(img.flag){
            return
        }
        let imgH =img.offsetHeight;
        let imgT =utils.offset(img).top;

        let winH =utils.win('clientHeight')
        let winT =utils.win('scrollTop')
        if(winH+winT>imgH+imgT){
            let address =img.getAttribute('true-img');
            let newImg = new Image;
            newImg.src=address;
            newImg.onloat = function(){
                img.src= address;
                newImg = null;
                img.flag=true;
                img.className='';
                fadeIn(img)
            }
        }
    }
    function fadeIn(Img){
        img.style.opacity=0.05;
        let cur=parseFloat(img.style.opacity);
        var timer = setInterval(function(){
            cur+=0.05;
            img.style.opacity =cur;
            if(cur>=1){
                clearInterval(timer);
            }
        },50)
    }
    dealy()
    window.onscroll=function(){
        dealy();

        let bodyH=utils.win('scrollHeight')
        let winT =utils.win('scrollTop');
        let winH =utils.win('clientHeight')
        if(winT+winH>=bodyH-100){
            renderHtml()
        }
        console.log(imgs.length)
    }
})();