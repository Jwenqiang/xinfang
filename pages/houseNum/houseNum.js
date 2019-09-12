// pages/houseNum/houseNum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:"",
    contents:"http://zjj.sz.gov.cn/ris/default.aspx"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if(e.code!=null&&e.code!=''){
      this.setData({
        num: e.code
      })
    }else{
      this.setData({
        num: '暂无'
      })     
    }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '专业为您甄选最笋房源，想买房，买好房，就上找笋盘！',
      imageUrl: "../../img/share.jpg",
      path: '/pages/index/index'
    }
  }, 
  copyText: function (e) {
    console.log(e.currentTarget.dataset.text);
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '已复制到剪切板',
              icon: 'none'
            })
          }
        })
      }
    })
  },  
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: "18319437931",
    })
  },  
})