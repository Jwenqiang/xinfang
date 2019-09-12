// pages/houseDt/houseDt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceDt:"",
    isY:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that=this;
    console.log(e);
      that.getData();
      if(e.t=="y"){
        that.setData({
          isY:true
        })
      }
      console.log(that.data.isY);
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
  getData:function(){
    var that=this;
    wx.getStorage({
      key: 'house',
      success: function(res) {
        that.setData({
          priceDt:res.data
        })
        console.log(res);
      },
    })
  }
})