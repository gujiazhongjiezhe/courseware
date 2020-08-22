let outer = document.getElementById('outer');
let list = document.getElementById('list');
let wrapper = document.getElementById('wrapper');

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
send();

// 2.动态绑定数据
function bindHtml() {
  let divs = ``;
  let lis = ``;
  data.forEach(item => {
    divs += `<div><img src="${item.img}" alt=""></div>`;
    lis += `<li></li>`
  });
  // 当循环完成以后把第一张图片克隆一份放到最后
  divs += `<div><img src="${data[0].img}" alt=""></div>`;

  wrapper.innerHTML = divs;
  list.innerHTML = lis;
};
bindHtml();

// 3、实现自动轮播，每隔2000ms执行一次
let step = 0;
let autoMove = (n,flag) => {
  step++;
  typeof n === 'undefined'? null : step = n;
  if (step === data.length + 1) { // 5   data.length+1
    // 当step等于5时，证明已经没有图片了，然后把left瞬间变为0，让他显示第一张图片(最后一张和第一张一样)
    wrapper.style.left = '0px';
    step = 1; // 让他继续轮播第二张
  };
  changeTip();
    utils.animate(wrapper, { left: -800 * step }, 300);
}
// let timer = setInterval(autoMove, 2000);

// 4、鼠标划上停止轮播，鼠标离开，继续轮播

// outer.onmouseover = () => {
//   clearInterval(timer)
// };
// outer.onmouseout = function () {
//   timer = setInterval(autoMove, 2000);
// };

// 5、焦点跟随，显示哪一张图片，那就让对应的li加上active  class名
let oLis = document.getElementsByTagName('li');

function changeTip() {
  for (var i = 0; i < oLis.length; i++) {
    //oLIs[i]:代表每一个li
    if (step === i) {
      // 如果step和li的索引的值相同，那么给当前li加上active class名
      oLis[i].classList.add('active');
    }
    else {
      oLis[i].classList.remove('active');
    }
    // 如果step的值是4，那就是第五张图片，给第一个li加上class名active即可
    if (step === 4) {
      oLis[0].classList.add('active');
    }
  }
}
changeTip();

// 6.点击焦点，实现图片跟随

let focus = () => {
  for (let i = 0; i < oLis.length; i++) {
    oLis[i].onclick = function () {
      console.log(i)
      // 此刻点击的是第一个li，那i的值0
      autoMove(i); // i = 0 
    }
  }
}
focus();

// 点击左右的小耳朵，实现图片的切换
left.onclick = function(){
  autoMove()
};

right.onclick = function(){
  //假设现在step的值是2，那显示的是第三张图片
  step-=2;
  // step === -2 ? step = 2:null;
  if(step === -2){
    step = 2;
    console.log(step,111);
    autoMove(undefined,true);
  }
  else {
    autoMove();
  }
  
};

