let send = () => {
    $.ajax({
        url: './banner.json', // 请求路径
        type: 'get', // 请求方式
        async: false, // 是否异步
        success: (data) => {
            // 当你的请求成功以后，当前函数就会执行,并且会把请求回来的数据以实参的形式传递给当前函数
            console.log(data);
            bindHtml(data);
        }
    })
}

let bindHtml = (data) => {
    // 是渲染数据的代码
}
send();