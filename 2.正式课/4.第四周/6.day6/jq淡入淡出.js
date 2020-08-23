let swiper = (function () {
    let $outer = $('#outer');
    let $wrapper = $('#wrapper');
    let $list = $('#list');

    let timer = null;
    let step = 0;
    let data = null;



    let send = () => {
        $.ajax({
            url: './banner.json', // 请求路径
            type: 'get', // 请求方式
            async: false, // 是否异步
            success: (info) => {
                // 当你的请求成功以后，当前函数就会执行,并且会把请求回来的数据以实参的形式传递给当前函数
                // console.log(data);
                // bindHtml(info);
                data = info;
            }
        })
    }

    let bindHtml = (data) => {
        // 是渲染数据的代码
        let imgs = ``;
        let lis = ``;
        $.each(data, (index, item) => {
            imgs += `  <img src="${item.img}" alt="">`
            lis += `<li></li>`
        });
        $wrapper.html(imgs);
        $list.html(lis)

    }

    let autoMove = () => {
        step++;
        // if (step === data.length) { // 5
        //     step = 0
        // }
        step === data.length ? step = 0 : null;
        $('img').eq(step).fadeIn().siblings().fadeOut();
        // 通过step得到当前应该显示的图片，然后让他淡入，在让其他图片淡出
        // fadeIn淡入  fadeOut淡出
    }

    return {
        init: () => {
            send();
            bindHtml(data);
            timer = setInterval(autoMove, 2000)
        }
    }
})()
swiper.init()