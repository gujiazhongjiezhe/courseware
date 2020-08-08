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
        data.forEach(function (item, index) {
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
    console.log(navList,cardList);

    // 给当前第二个a标签增加点击事件
    let flag = -1;
    // navList[1].onclick = function(){
    //     flag*=-1;
    //     console.log(1);
    //     sortList();
    // }

    // 循环给每一个a标签绑定点击事件
    for(var i = 0;i<navList.length;i++){
        navList[i].index = i;
        navList[i].onclick = function(){
            // this是单前点击的a
            sortList.call(this); // 此处的this是当前点击的a
            // 这句话是让sortList执行并且把sortList的this指向了当前点击的a

            // 当用户点击a标签的时候，咱们在js中的知道用户到底点击的是哪个a标签
            // 给每一个元素添加一个自定义属性，属性值是当前元素的索引，然后按照当前的索引去获取排序的依据
            console.log(this.index);
        }
    }

    function sortList(){
        //  this是谁window
        // 当sortList执行的时候已经通过call方法，把此处的this指向了当前用户点击的a
        // let _this = this;
        // 排序的逻辑
        cardList.sort((a,b)=>{
            // 箭头函数没有this，索引在里边使用this的时候往外层作用域获取，获取的正好是当前用户点击的a
            // console.log(a.);
            // 按照热度排序，但是怎么样才能拿到每一个li元素的热度
            // 把当前点击的a标签的自定义属性index的值作为索引在ary数组中拿到对应的值，作为排序的依据
            let ary = ['data-time','data-hot','data-price'];
   
            // a = a.getAttribute(ary[_this.index]);
            // b = b.getAttribute(ary[_this.index]);
            a = a.getAttribute(ary[this.index]); // '2017-02-03' -->'20170203' '20200302'
            b = b.getAttribute(ary[this.index]);
            if(this.index === 0){
                // 如果index的值是0的话，说明用户点击的是第一个a，要按照时间进行排序，
                // 但是时间是带-的，不能直接相减，咱们得把-去掉然后在进行相减
                a = a.replace(/-/g,'');
                b = b.replace(/-/g,'');
            }
            console.log(a,b);
            return (a-b)
            // return a.getAttribute('data-hot') - b.getAttribute('data-hot');
        });
        console.log(cardList);
        // 现在仅仅是给js中的cardList排好序了，但是页面中的元素并没有交换位置，所以咱们要把cardList重新插入到页面中

        for(var i = 0;i<cardList.length;i++){
            cardBox.appendChild(cardList[i]);
        }
    }


})();

