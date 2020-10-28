//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    goodsList:[]
  }
})



// 1、在当前项目里npm init -y
// 2、npm i @vant/weapp -S --production
// 3、然后把app.json中的style:v2去掉
// 4、在微信开发者工具中点击右上角详情-->本地项目-->勾选上使用npm模块
// 5、点击工具-->构建npm-->确定
// 6、在项目中使用vant组件:在使用组件的页面的json中的usingComponents中写上"van-button": "@vant/weapp/button/index"
  //  然后就可以在当前页面使用了