let timer = null;
let send = () => {
    $.ajax({
        url: 'banner.json', // 请求的路径
        type: 'get', // 请求方式
        async: false, //  同步还是异步(现在是同步)
        success: function (data) {
            // 当数据请求成功以后会执行这个函数，会把请求来的数据以参数的形式传递给这个函数
            // 他会自动把请求来的数据转化为JSON的对象
            // console.log(data)
            bindHtml(data);
            timer = setInterval(autoMove,2000);
            changTip();
        }
    })
}


// 项目重构
let bindHtml = (data) => {
    let imgs = ``;
    let lis = ``;
    // ajax和each都在jQuery自己身上
    $.each(data, function (index, item) {
        // 第一个形参是索引，第二个形参是数组的每一项
        imgs += `<img src="${item.img}" alt="">`
        lis += `<li></li>`;
    });
    $('#wrapper').html(imgs);
    $('#list').html(lis);
}

// 3、自动切换
let step = 0; // 1
let autoMove = () => {
    step++;
    step === 5 ? step = 0:null;
 $('img').eq(step).fadeIn().siblings().fadeOut();
 changTip();
}


// 4、实现焦点跟随
let changTip = ()=>{
    // 找到step对应的li，给其加上class名select，清除所有兄弟的class名
    $('#list li').eq(step).addClass('select').siblings().removeClass('select');
};


send();
// 5、鼠标划上停止动画。
$('#outer').hover(function(){
    // 鼠标输入
    // console.log(1)
    clearInterval(timer)
},function(){
    // 鼠标划出
    // console.log(2)
    timer = setInterval(autoMove,2000);
});

// 6、鼠标划上li，显示对应的图片

$('#list li').hover(function(){
    // 假设现在li的索引是2
// console.log($(this).index()); // 获取当前li的索引
    step = $(this).index()-1 
    autoMove();
});

// 7、点击左右箭头，实现切换

$('#right').click(function(){
    autoMove()
});

$('#left').click(function(){
    //假设现在step的值是2，那显示的是第三张图片
    step-=2;
    step === -2 ? step = 3:null;
    autoMove();
});


