// pages/rzSuc/rzSuc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uname:"",
    usex:"",
    unum:"",
    isRz:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          isRz: res.data.Isrz,
          uname: res.data.FullName,
          unum: res.data.IdCard
        })
        if (that.data.unum != null && that.data.unum != '') {
          var idCard = that.data.unum.substring(0, 1) + "******************" + that.data.unum.substring(17, 18)
          that.setData({
            unum: idCard
          })
        }
        if (that.data.uname != null && that.data.uname != '') {
          var iname = that.data.uname.substring(0, 1) + "*" + that.data.uname.substring(2)
          that.setData({
            uname: iname
          })
        }          
        var sex = "";
        if (res.data.IdCard != null && res.data.IdCard != '') {
          if (res.data.IdCard.substring(16, 17) % 2 == 0) {
            sex = "女"
          } else {
            sex = "男"
          }
          that.setData({
            usex: sex
          })
        }
      }
    })     
    wx.getStorage({
      key: 'rzMsg',
      success: function (res) {
        var sex = "";
        if (res.data.IdCard.substring(16, 17) % 2 == 0) {
          sex = "女"
        } else {
          sex = "男"
        }
        that.setData({
          uname: res.data.FullName,
          usex: sex,
          unum: res.data.IdCard
        })
      },
    })

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
  goBack() {
    wx.reLaunch({
      url: "../my/my"
    })
  },  
})