let swiper = (function () {
  let $outer = $('#outer');
  let $wrapper = $('#wrapper');
  let $pre = $('#pre');
  // let $list = $pre.find('li');
  let $left = $('#left');
  let $right = $('#right');

  let timer = null;
  let step = 0;
  let data = null;



  let send = () => {
    $.ajax({
      url: './banner.json',
      type: 'get',
      async: false,
      success: info => {
        console.log(data);
        data = info;
        // bindHtml(info);
      }
    })
  }

  let bindHtml = (data) => {
    let items = ``;
    let list = ``;
    $.each(data, (index, item) => {
      items += `<li><img src="${item.img}" alt=""></li>`;
      list += `<li></li>`
    });
    items += `<li><img src="${data[0].img}" alt=""></li>`;
    $wrapper.html(items);
    $pre.html(list);
    $pre.css('width', (data.length + 1) * 25);
  }

  let autoMove = (n) => {
    typeof n === 'undefined' ? step++ : step = n;
    if(step === data.length+1){
      $wrapper.css('left', 0);
      step = 1;
    }
    changeTip();
    $wrapper.stop(true).animate({left:step*-800},300)
  }

  let startAndStop = (value)=>{
    $outer.hover(()=>{
      clearInterval(timer);
    },()=>{
      timer = setInterval(autoMove,value);
    })
  }

  let changeTip = ()=>{
    // eq是通过索引获取当前的对应的jq元素
    // 假设当前step是2，说明页面显示的是第三章图片，这时候让第三个焦点去高亮，第三个焦点的索引是2
    let index = step;
    if(step === data.length){
      // 如果当前的step等于data.length，那就说明页面的图片已经显示的是复制的哪一张图片了，然后让第一个焦点高亮就可以
      index = 0;
    }
    $('#pre li').eq(index).addClass('active').siblings().removeClass('active');
    // 通过step获取当前需要高亮的焦点加上active类名，然后在获取高亮焦点的兄弟姐妹元素，清除他们的active类名
  }

  let focus = ()=>{
    $('#pre li').click(function(){
        // 把当前点的li的索引赋值给step即可，然后让autoMove
        let index = $(this).index(); // 获取当前点击焦点的索引
        autoMove(index)
    })
  }

  let leftAndRight = ()=>{
    $left.click(function(){
      step-=1;
      if(step<0){
        $wrapper.css('left',data.length*-800);
        step = data.length-1;
      }
      autoMove(step);
    })
    $right.click(function(){
      autoMove()
    })
  }




  return {
    init: (value = 2000) => {
      send();
      bindHtml(data);
      timer = setInterval(autoMove,value);
      startAndStop(value);
      changeTip();
      focus();
      leftAndRight();
    }
  }
})();
swiper.init(1000);