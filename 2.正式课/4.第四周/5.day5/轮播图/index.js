let outer = document.getElementById('outer'); // 最外层的大盒子
let wrapper = document.getElementById('wrapper'); // 存放图片的ul
let pre = document.getElementById('pre'); // 存放焦点的ul

// 1、请求数据，然后进行数据绑定
let data = null;

function send() {
  let xhr = new XMLHttpRequest
  xhr.open('get', './banner.json', false)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
      data = JSON.parse(xhr.responseText);
    }
  };
  xhr.send();
}
send();

// 2.进行数据绑定
bindHtml();
function bindHtml() {
  let items = ``; // 一会用来拼接图片的li
  let focus = ``; // 一会用来拼接焦点
  data.forEach(item => {
    // 循环data里的每一项，生成对应的图片
    let { img } = item;
    items += `<li><img src="${img}" alt=""></li>`
    focus += ` <li></li>`;
  });
  // 在循环完成之后，在items最后继续拼接一张图片(是第一张为了无缝滚动)
  items += `<li><img src="${data[0].img}" alt=""></li>`
  // console.log(items,focus);
  wrapper.innerHTML = items;
  pre.innerHTML = focus;
};

// 3、实现自动轮播，每隔2000ms执行一次
let step = 0;
let autoMove = (n) => { // 2
  // step++; // 1 2 3 4 5
  typeof n === "undefined" ? step++ : step = n;
  // typeof n === 'undefined' ? null : step = n;

  // 如果step的值是5的话就代表第6张图片
  if (step === data.length + 1) { // 5
    //当step的值为5的时候，证明后边已经没有图片了，把left瞬间变为0，这时候显示的是第一张图片(只不过第一张和最后一张是一样的，用户是感知不到的)
    wrapper.style.left = '0px';
    step = 1; // 把step改为1，是为了让他显示第二张图片
  }
  changeTip();
  utils.animate(wrapper, { left: step * -800 }, 300);
}
let timer = setInterval(autoMove, 2000);

// 4、鼠标划上停止轮播，鼠标离开，继续轮播
outer.onmouseenter = function () {
  clearInterval(timer);
}
outer.onmouseleave = function () {
  timer = setInterval(autoMove, 2000);
};

// 5.焦点跟随，当前显示的是哪一张图片就让那张图片对应的li加上active类名
// 拿当前step的值和li的索引一一进行比对，和谁一样，就让谁高亮
let list = pre.getElementsByTagName('li');
let changeTip = () => {
  // 循环所有的焦点，拿每一个焦点索引和当前的step进行比较，如果相等，那就把当前索引对应的焦点加上active类名，把其余的焦点的类名active清除
  // 此处的代码和选项卡类似
  for (var i = 0; i < list.length; i++) {
    if (i === step) {
      list[i].classList.add('active');
    }
    else {
      list[i].classList.remove('active');
    }

  }
  // 如果step等于4，说明页面显示的是第五章图片，第五章和第一张是一样的，就让第一个焦点高亮
  // if(step === 4){
  //   list[0].classList.add('active');
  // }
}
changeTip(); // 当页面初始化的时候，为了让第一个图片的焦点高亮


// 6.点击焦点，实现图片跟随
let focus = () => {
  for (let i = 0; i < list.length; i++) {
    function fn() {
      autoMove(i);
    };
    let lazyFunc = utils.debounce(fn, 200);
    list[i].onclick = lazyFunc;
    // console.log(1234);
    // 当点击焦点时能够把当前的焦点的索引i给到step就可以改变页面图片的显示状态
  }
}
focus();

// 7.点击左右小耳朵，实现图片的切换








