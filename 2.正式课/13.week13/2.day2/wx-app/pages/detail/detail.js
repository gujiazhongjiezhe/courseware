// pages/detail/detail.js
const app = getApp(); // 获取app.js中的对象信息
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    img:'',
    count:0,
    id:0,
    price:0
  },
  buy(){

    wx.switchTab({ url: '/pages/user/user' });
  },
  add(){
    let {title,img,count,id,price} = this.data;
    // 如果当前商品的id和goodsList中的id有相等的，说明之前就加入过购物车，此时不需要把当前商品的信息在放到goodsList中，只需要给count++就行了
    let flag = app.globalData.goodsList.some(item=>{
      if(item.id == id){
        item.count+=1;
        return true;
      }
    })
    if(!flag){
      app.globalData.goodsList.push({
        title,img,count:1,id,price
      });
    }
    this.setData({
      count:this.data.count+1
    });
    console.log(app.globalData.goodsList,20);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options,15);
    let  {title,img,id,price} = options;
   
    // 当前商品每次加载的时候，去看看globalData中的goodsList中有没有之前加入购物车的记录，如果有，那就记录的count设置给当前页面的count
    let item = app.globalData.goodsList.filter(item=>{
      return item.id == id;
    });

    this.setData({
      title,
      img,
      id,
      price,
      count:item[0] ? item[0].count : 0
    });
  }
})