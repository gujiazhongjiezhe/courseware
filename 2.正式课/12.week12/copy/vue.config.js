module.exports = {
    //=>基于PAGES配置多页面效果
    pages: {
        login: {
            entry: 'src/login.js',
            template: 'public/login.html'
        },
        index: {
            entry: 'src/main.js',
            template: 'public/index.html'
        }
    }
};