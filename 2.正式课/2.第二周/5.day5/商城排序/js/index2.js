(function () {
  // 1.请求数据 渲染数据

  /* 
  1、创建一个变量，用来接收请求来的数据
  2、利用ajax进行数据请求，把请求来的数据给到data
      1、创建一个ajax实例
      2、打开一个连接请求，基于get请求方式完成同步请求
      3、监听服务器返回的信息状态，如果http状态是2开头的两位数，说明数据请求成功
      4、发送ajax请求
  */
  let data = null;
  let cardBox = document.getElementById('cardBox');
  let xhr = new XMLHttpRequest;
  xhr.open('get', './json/product.json', false);
  xhr.onreadystatechange = function () {
    // 如果状态200，而且请求的步骤是4
    if (xhr.status === 200 && xhr.readyState === 4) {
      data = JSON.parse(xhr.responseText); // 这就是从后台请求来的数据
      // console.log(data);
    }
  }
  xhr.send();


  /* 
  把请求的到的数据渲染到页面
  */
  renderHTML();
  function renderHTML() {
    let htmlStr = ``;
    data.forEach(item => {
      //  console.log(item);
      let {
        img,
        title,
        time,
        hot,
        price
      } = item;
      htmlStr += `
            <li data-hot="${hot}" data-price="${price}" data-time="${time}">
                <img src=${img} alt="">
                <span>${title}</span>
                <span>上架时间：${time}</span>
                <span>热度：${hot}</span>
                <span>价格：${price}</span>
            </li>
            `
    });


    cardBox.innerHTML = htmlStr;
  };

  // 进行改dom元素排序(按照热度)
  let header = document.getElementById('header');
  let navList = header.getElementsByTagName('a');
  console.log(navList);
  // 获取页面三个a标签
  let cardList = document.getElementsByTagName('li');
  // 获取页面所有的li元素
  cardList = utils.toArray(cardList); // 把类数组转为数组
  console.log(navList, cardList);

  // 循环给每一个a标签绑定点击事件
  for (var i = 0; i < navList.length; i++) {
    navList[i].flag = -1; // 给每一个a标签增加一个自定义属性，属性名是flag，属性值是默认是-1
    // 增加他为了记录每一个a标签排序的顺序
    navList[i].index = i; // 给每一个a元素加一个自定义属性，属性名是index，属性值是当前a的索引i
    // 增加他的目的就是为了在js中区分用户到底点击的是哪个a标签
    navList[i].onclick = function () {
      // this-->是当前用户点击的元素a

      this.flag *= -1; // 用户点击的是谁就把谁的flag乘等于-1;

      // console.log(this.index);
      // sortList(this.index, this.flag);
      // 第一个实参是当前a的索引，第二个实参是当前a的flag的值
      sortList.call(this);
      // 让sortList执行，并且把sortList中的this指向了当前点击的a标签


      //---------------------------------------------------
      // 关于小箭头的颜色的代码
      // 1.当用户点击a标签的时候清空所有箭头的bg类名
      // 2.在给相应的箭头加上bg类名
      clearArrow.call(this);
      addArrow.call(this);
    }
  }

  function sortList() {
    // this-->window    当前点击的a标签

    // navList = [a,a,a] // navList数组的索引和ary的索引是保持一致的
    let ary = ['data-time', 'data-hot', 'data-price'];
    // 数组值的顺序按照页面a标签的顺序去写，数组值的内容按照上边产生li元素的时候行间属性名去写
    // a和b代表当前所有进行比较的li
    cardList.sort((a, b) => {
      // 回调函数里的this是window
      // 箭头函数没有this，如果你在箭头函数里使用this，那就往上一级作用域查找
      a = a.getAttribute(ary[this.index]);
      b = b.getAttribute(ary[this.index]);

      if (this.index === 0) { // !index
        // 如果index是0的话，就证明用户点击的是第一个a标签按照时间进行排序，但是时间数据有-不能够直接相减，咱们得把-去掉然后在排序
        // '2015-02-02'----->'20150202'
        a = a.replace(/-/g, '');
        b = b.replace(/-/g, '');
      }
      return (a - b) * this.flag;
    });


    let frg = document.createDocumentFragment();
    // 创建文档碎片，他就是一个容器，用来存放临时的元素
    for (var i = 0; i < cardList.length; i++) {
      frg.appendChild(cardList[i]);
      // 当每一次循环的时候，额昂frg容器里增加元素
    };

    cardBox.appendChild(frg);
    // 把容器frg里的元素一次性插入到cardBox里
    console.log(frg);

  }

  function clearArrow(){
    // this-->当前点击的a标签
      // 循环所有的a标签，然后把a标签里的所有的i(箭头)标签的bg类名清空

      for(var i = 0;i<navList.length;i++){
        // 循环第一次
        // navList[i].children // 获取每一个a标签里的元素子节点(两个i标签)

        if(navList[i] !== this){
          // 如果此条件成立的话，说明当前的navList[i]标签不是用户点击的a元素
          // 就是把用户当前点击的a标签过滤出去
          // 在这里清空的只是当前用户没有点击的a元素里的箭头的bg类名
          navList[i].children[0].classList.remove('bg'); // 移除第一个i的bg类名
          navList[i].children[1].classList.remove('bg');// 移除第二个i的bg类名
          navList[i].flag = -1;
        }
      }
  }

  function addArrow(){

    console.log(this); // 当前用户点击的a标签
    // 拿到当前点击的a标签里的i标签
    let up = this.children[0]; // 获取第一个i
    let down = this.children[1]; // 获取第二个i

    // 判断你当前点击的a到底是升序还是降序，如果是升序，就让up加上bg类名，如果是降序，就让down加上bg类名
    if(this.flag>0){

      // 如果当前a标签的flag大于0，说明是升序
      up.classList.add('bg');
      down.classList.remove('bg');
    }
    else {
      down.classList.add('bg');
      up.classList.remove('bg');
    } 
  }
})();

