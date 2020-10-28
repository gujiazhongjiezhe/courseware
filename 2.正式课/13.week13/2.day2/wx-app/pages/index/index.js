// pages/index/index.js
import { http } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    isShow: false,
    publicList:[]
  },
  show() {
    console.log(1);
    this.setData({
      isShow: true
    })
  },
  hide() {
    this.setData({
      isShow: false
    })
  },
  getBanner() {
    http.get('/banner').then((res) => {
      console.log(res, 13);
      this.setData({
        bannerList: res.data.data
      })
    })
  },
  getPublicList() {
    http.get('/publicList').then((res) => {
     console.log(res,34);
      this.setData({
        publicList: res.data.data
      })
    })
  },
  onLoad() {
    this.getBanner()
    this.getPublicList()
  }
})