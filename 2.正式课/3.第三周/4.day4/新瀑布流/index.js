(function () {
    /* 
    ajax请求数据
    */
    
    let data = null;
    let xhr = new XMLHttpRequest;
    xhr.open('get', './data.txt', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            data = JSON.parse(xhr.responseText)
        }
    }
    xhr.send();
    console.log(data)
    /* 
        数据渲染
    */
    let uls = document.getElementsByTagName('ul');
    uls = utils.toArray(uls);
    renderHtml()
    function renderHtml() {
        for (var i = 0; i < 50; i++) {
            let index = Math.round(Math.random() * 9); // 随机产生一个图片信息的索引
            let curImg = data[index]; // 随机产生一个图片的信息

            let li = document.createElement('li');
            let img = document.createElement('img');
            let p = document.createElement('p');
            p.innerHTML = curImg.title;
            img.setAttribute('true-img', curImg.src);
            img.className = 'bg';
            img.style.height = Math.round(Math.random() * (250 - 180) + 180) + 'px';

            li.appendChild(img);
            li.appendChild(p);
            uls.sort((a,b)=>{
                return a.scrollHeight - b.scrollHeight
            })
            uls[0].appendChild(li);
        }

    }

    let imgs = document.getElementsByClassName('bg');

    function dealy(){
        for (var i = 0; i < imgs.length; i++) {
           dealyImg(imgs[i]) // 判断每一张图片是否需要加载
        }
    }

    function dealyImg(curImg){
        if(curImg.flag){
            return
        }
        let curImgH = curImg.offsetHeight;
        let curImgT = utils.offset(curImg).top;
        let winH = utils.win('clientHeight');
        let winT = utils.win('scrollTop');
        // console.log(curImgH,curImgT,winH,winT)
        if(winH+winT>curImgH+curImgT){
            let address = curImg.getAttribute('true-img');
            let newImg = new Image;
            newImg.src = address;
            newImg.onload = function(){
                curImg.src = address;
                curImg.flag = true;
                newImg = null;
                fadeIn(curImg)
            }
        }
    }
    function fadeIn(curImg){
        utils.css(curImg,'opacity',0.01);
        let cur = utils.css(curImg,'opacity');
        var timer  =setInterval(()=>{
            cur+=0.05;
            if(cur>=1){
                clearInterval(timer);
            }
            utils.css(curImg,'opacity',cur);
        },100)
    }
    dealy()
    window.onscroll = function(){
        dealy()
        /* 
        当浏览器的滚动条卷去的高度+浏览器可视窗口的高度 === body的真实高度
        */
       let bodyH = utils.win('scrollHeight');
       let winT = utils.win('scrollTop');
       let winH = utils.win('clientHeight');
       if(winT+winH>bodyH-30){
            renderHtml()
       }
    }





})()