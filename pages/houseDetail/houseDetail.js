var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    house:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if (e.id) {
      this.getData(e.id);
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
  onShareAppMessage: function () {

  },
  // getData:function(){
  //   var that=this;
  //   wx.getStorage({
  //     key: 'house',
  //     success(res){
  //       that.setData({
  //         house:res.data
  //       })    
  //       var article = res.data.Description;
  //       WxParse.wxParse('article', 'html', article, that, 5);   
  //     },
  //   })  
  // }
  getData: function (e) {
    var that = this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateById',
      data: { Id: e },
      success(res) {
        console.log(res);
        if (res.data.code == 1001) {
          that.setData({
            house: res.data.data
          })
          wx.setStorage({
            key: 'house',
            data: res.data.data
          })
          var article = res.data.data.Description;
        WxParse.wxParse('article', 'html', article, that, 5);
          wx.hideLoading();
        }
      }
    })

  },  
})