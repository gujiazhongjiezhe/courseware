module.exports = {
	lintOnSave: false, // 关闭eslint检查
	productionSourceMap: false,
	devServer: {
		// 跨域请求：PROXY代理
		proxy: {
			'/': {
				target: 'https://news-at.zhihu.com',
				changeOrigin: true
			}
		}
	}
};