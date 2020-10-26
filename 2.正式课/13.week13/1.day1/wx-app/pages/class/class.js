// pages/class/class.js
import {http} from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList:[
      {
        title:'零基础就业课',
        list:[]
      },
      {
        title:'前端工程化',
        list:[]
      },
      {
        title:'前端框架课',
        list:[]
      }
    ]
  },
  getClassList() {
    http.get('/classList').then((res) => {
     console.log(res,12);
     let {level1,level2,level3}  = res.data.data
      this.setData({
        classList: [
          {
            title:'零基础就业课',
            list:level1
          },
          {
            title:'前端工程化',
            list:level2
          },
          {
            title:'前端框架课',
            list:level3
          }
        ]
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassList()
  }
})