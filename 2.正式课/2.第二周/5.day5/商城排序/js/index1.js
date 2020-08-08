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
    let navList = document.getElementsByTagName('a');
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


            console.log(this.index);
            sortList(this.index, this.flag);
            // 第一个实参是当前a的索引，第二个实参是当前a的flag的值
        }
    }

    function sortList(index, flag) {
        // 此处形参接受的是当前用户点击的a标签的索引

        // navList = [a,a,a] // navList数组的索引和ary的索引是保持一致的
        let ary = ['data-time', 'data-hot', 'data-price'];
        // 数组值的顺序按照页面a标签的顺序去写，数组值的内容按照上边产生li元素的时候行间属性名去写
        // a和b代表当前所有进行比较的li
        cardList.sort(function (a, b) {
            a = a.getAttribute(ary[index]);
            b = b.getAttribute(ary[index]);

            if (index === 0) { // !index
                // 如果index是0的话，就证明用户点击的是第一个a标签按照时间进行排序，但是时间数据有-不能够直接相减，咱们得把-去掉然后在排序
                // '2015-02-02'----->'20150202'
                a = a.replace(/-/g, '');
                b = b.replace(/-/g, '');
            }
            return (a - b) * flag;
        });

        // 把排好序的数组插入到cardBox中
        for (var i = 0; i < cardList.length; i++) {
            cardBox.appendChild(cardList[i])
        }
    }





})();

