// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let goodsList= app.globalData.goodsList;
    // this.setData({
    //   goodsList
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(11112222);
    let goodsList = app.globalData.goodsList;
    let total = app.globalData.goodsList.reduce((prev, next) => {
      return prev + next.count * next.price
    }, 0)
    this.setData({
      goodsList,
      total
    });

  },
  onLoad() {
    console.log('load');
  },
  change(e) {

    // 在任何组件中，都可以通过事件对象拿到当前组件的行间信息
    console.log(e);
    let value = e.detail.value / 1; // 把值转数字
    // 在当前input触发的事件对象里的detail中的value属性就是当前input框里的最新的值

    // 如果在当前组件的行间定义了一个属性，我们想在事件触发的函数里的拿到这个属性，可以在e.target.dataset中获取到这个值
    let { id } = e.target.dataset.item; // 拿到当前商品的id

    console.log(id, '当前点击商品的id');

    // 通过当前操作商品的id找到goodsList中的对应的id的商品，然后把它的count数量进行修改
    app.globalData.goodsList.forEach(item => {
      console.log(item.id);
      if (item.id == id) {

        item.count = value;
      }
    });
    let total = app.globalData.goodsList.reduce((prev, next) => {
      return prev + next.count * next.price
    }, 0)
    this.setData({
      total
    });
    console.log(app.globalData.goodsList);
  }
  /**
   * 生命周期函数--监听页面隐藏
   */

})