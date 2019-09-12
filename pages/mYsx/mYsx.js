// pages/mYsx/mYsx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yid: "",
    ystate: "",
    ymsg: "",
    utoken: "",
    role: ""
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
          utoken: res.data.Token,
          role: res.data.RoleType
        })
      }
    })
    console.log(that.data.utoken);
    if (options.yid) {
      that.setData({
        yid: options.yid,
        ystate: options.state
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
  changeV: function (e) {
    this.setData({
      ymsg: e.detail.value
    })
  },
  setMsg: function (e) {
    var that = this;
    console.log(that.data.utoken);
    if (that.data.ymsg != "") {
      wx.request({
        url: 'https://spapi.centaline.com.cn/ShootEstate/UpdateShootEstateReserveState',
        data: {
          Id: that.data.yid,
          State: 4,
          InvalidReason: that.data.ymsg
        },
        method: "post",
        header: { token: that.data.utoken },
        success(res) {
          console.log(res);
          if (res.data.code == 1001) {
            wx.showToast({
              title: "操作成功",
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 2
              })
            }, 500)

          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: "必填项不能空着",
        icon: "none"
      })
    }

  }  
})