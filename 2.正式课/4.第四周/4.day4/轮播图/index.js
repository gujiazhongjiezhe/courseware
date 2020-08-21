let wrapper = document.getElementById('wrapper');
let list = document.getElementById('list');
let outer = document.getElementById('outer');

// 1、数据请求，进行数据绑定
let data = null;

function send() {
    let xhr = new XMLHttpRequest;
    xhr.open('get', './banner.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
}
send()

// 2、动态绑定数据

function bindHtml() {
    let divs = ``;
    let lis = ``;
    data.map((item) => {
        // 利用数组的ma方法去遍历数组，把数组的每一项拼接起来放到对应的元素中
        console.log(item) // 数组的每一项
        divs += `<div><img src="${item.img}" alt=""></div>`;
        lis += `<li></li>`

    })
    // 当循环完成以后，在divs最后拼接一张(第一张)图片
    divs += `<div><img src="${data[0].img}" alt=""></div>`;
    wrapper.innerHTML = divs;
    list.innerHTML = lis;
    // react
}
bindHtml();

// 3、实现自动轮播，每隔2000ms执行一次
let step = 0; // 2  (代表图片的索引)
let autoMove = (n) => {
    step++; // 1  2  3  4  5
    //  step = n;
    typeof n === 'undefined' ? null : step = n;
    // step = n || step;  // 0转布尔是false
    if (step === data.length + 1) { // 5   data.length+1
        // 当step等于5时，证明已经没有图片了，然后把left瞬间变为0，让他显示第一张图片(最后一张和第一张一样)
        wrapper.style.left = '0px';
        step = 1; // 让他继续轮播第二张
    };
    changeTip();
    utils.animate(wrapper, {left: -800 * step}, 300);
};
let timer = setInterval(autoMove, 2000);

// 4、鼠标划上停止轮播，鼠标离开，继续轮播
outer.onmouseover = ()=> {
    clearInterval(timer)
};
outer.onmouseout = function () {
    timer = setInterval(autoMove, 2000);
};

// 5、焦点跟随，显示哪一张图片，那就让对应的li加上active  class名
let oLis = document.getElementsByTagName('li'); // 页面上的小圆圈
function changeTip() {
    for (var i = 0; i < oLis.length; i++) {
        //oLIs[i]:代表每一个li
        if (step === i) { // 2 === 2 
            // 如果step和li的索引的值相同，那么给当前li加上active class名
            oLis[i].classList.add('active');
        } else {
            oLis[i].classList.remove('active');
        }
        // 如果step的值是4，那就是第五张图片，给第一个li加上class名active即可
        if (step === 4) {
            oLis[0].classList.add('active');
        }
    }
};

changeTip();

// 6、点击焦点，图片跟随

let focus = ()=> {
    for (let i = 0; i < oLis.length; i++) {
        oLis[i].onclick = function () {
            console.log(i)
            // 此刻点击的是第一个li，那i的值0
            autoMove(i) // i = 0 
        }
    }
};
focus();

// 7、点击左右的小耳朵，实现图片的切换


