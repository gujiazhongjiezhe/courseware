// 1、请求数据，并进行数据绑定
let timer;
let send = ()=>{
    $.ajax({
        url:'banner.json',
        type:'get',
        async:false,
        success:function(data){
            console.log(data)
            bindHTML(data);
            timer = setInterval(autoMove,2000);
            changeTip()
        }
    })
}


let bindHTML = (data)=>{
    let imgs = ``;
    let lis = ``;
    $.each(data,function(index,item){
        imgs+=`<img src="${item.img}">`;
        lis+=`<li></li>`;
    });
    $('#wrapper').html(imgs);
    $('#list').html(lis)
}


// 3、自动切换
// fadeIn  fadeOut

let step = 0;
let autoMove = ()=>{
    step++;
    step === 5 ? step = 0 : null;
    $('img').eq(step).fadeIn().siblings().fadeOut();
    changeTip()
}


// 4、实现焦点跟随

let changeTip = ()=>{
    $('#list li').eq(step).addClass('select').siblings().removeClass('select')
};
send();

// 5、鼠标划上
$('#outer').hover(function(){
    // 第一个是划上
    clearInterval(timer);
},function(){
    // 第二个是划出
    timer = setInterval(autoMove,2000)
});

// 6、划上li，显示对应的图片
$('#list li').hover(function(){
    step = $(this).index()-1;
    autoMove();
});

// 7、实现左右点击
$('#right').click(function(){
    autoMove()
});
$('#left').click(function(){
    step-=2;
    step === -2 ? step = 3 : null;
    autoMove();
})
