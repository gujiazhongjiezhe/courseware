(function(){
    let data = null;
    let xhr = new XMLHttpRequest;
    xhr.open('get','./data.txt',false);
    xhr.onreadystatechange = function(){
        if(xhr.status === 200&& xhr.readyState === 4){
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
    let cardBox = document.getElementsByTagName('ul');
    cardBox = utils.toArray(cardBox);
    function renderHtml(){
        for (var i = 0; i < 50; i++) {
           let index = Math.round(Math.random()*9);
           let curImg = data[index];

           let li = document.createElement('li');
           let img = document.createElement('img');
           let p = document.createElement('p');
           p.innerHTML = curImg.title;
           img.setAttribute('true-img',curImg.src);
           img.className = 'bg';
           img.style.height = Math.round(Math.random()*(250-180)+180) +'px';
           
           li.appendChild(img);
           li.appendChild(p);
           cardBox.sort((a,b)=>{
            return a.scrollHeight - b.scrollHeight;
           });
           cardBox[0].appendChild(li);
        }
    }
    renderHtml();

    let imgs = document.getElementsByClassName('bg');
    function dealy(){
        for (var i = 0; i < imgs.length; i++) {
            dealyImg(imgs[i]);
        }
    }
    function dealyImg(img){
        if(img.flag){
            return;
        }
        let imgH = img.offsetHeight;
        let imgT = utils.offset(img).top;
        let winH = utils.win('clientHeight');
        let winT = utils.win('scrollTop');
        if(winH+winT>imgH+imgT){
            let address = img.getAttribute('true-img');
            let newImg = new Image;
            newImg.src = address;
            newImg.onload = function(){
                img.src = address;
                img.flag = true;
                newImg = null;
                img.className = '';
                fadeIn(img)
            }
        }
    }
    function fadeIn(img){
        img.style.opacity = 0.1;
        let cur = parseFloat(img.style.opacity);
        let timer = setInterval(function(){
            cur+=0.05;
            if(cur>=1){
                clearInterval(timer)
            }
            img.style.opacity = cur;

        },50)
    }


    window.onscroll = function(){
        dealy()
        let winT = utils.win('scrollTop');
        let winH = utils.win('clientHeight');
        let bodyH = utils.win('scrollHeight');
        if(winT+winH>bodyH-30){
            renderHtml()
        }
    }
})()