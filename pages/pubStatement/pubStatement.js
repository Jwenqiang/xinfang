const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isX: false,
    navData: [
      {
        name: "首页",  //文本
        current: 0,    //是否是当前页，0不是  1是
        style: 0,     //样式
        ico: 'icon-home',  //不同图标
        fn: 'index'   //对应处理函数
      },
      {
        name: "房源",
        current: 1,
        style: 0,
        ico: 'icon-loufang',
        fn: 'mainHouse'
      },      
      {
        name: "发布盘源",
        current: 1,
        style: 1,
        ico: '',
        fn: 'pubStatement'
      }, {
        name: "找笋盘",
        current: 0,
        style: 0,
        ico: 'icon-find',
        fn: 'house'
      }, {
        name: "我的",
        current: 0,
        style: 0,
        ico: 'icon-wo',
        fn: 'my'
      },
    ],
    utoken:"",
    isOn:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isX: app.isIphoneX
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
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          utoken: res.data.Token
        })
        that.getData();
      },
    })
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
  getData: function () {
    var that = this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/Users/GetUser',
      header: {
        'token': that.data.utoken
      },
      success(res) {
        console.log(res);
        if (res.data.code == 1001) {

        } else {
          wx.showModal({
            title: "登录信息已失效",
            content: '非常抱歉！您的登录状态已失效，请重新登录',
            showCancel: false,
            success: function (r) {
              if (r.confirm) {
                wx.clearStorage();
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          });
        }

      },
      fail(error) {
        wx.showModal({
          title: "登录信息已失效",
          content: '非常抱歉！您的登录状态已失效，请重新登录',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.clearStorage();
              wx.navigateTo({
                url: '../login/login',
              })
            }
          }
        });
      }
    })

  },  
  radioChange(e){
    console.log(e);
    var val=e.currentTarget.dataset.t
    if (val==true){
      this.setData({
        isOn: false
      })
    }else{
      this.setData({
        isOn: true
      })      
    }

  },
  goPublish(e){
    if(this.data.isOn==true){
      wx.navigateTo({
        url: '../publish/publish',
      })
    }
  },

  index(e) {
    wx.reLaunch({
      url: "../index/index"
    })
  },
  house(e) {
    wx.reLaunch({
      url: "../house/house"
    })
  },
  pubStatement(e) {
    wx.reLaunch({
      url: "../pubStatement/pubStatement"
    })
  },
  mainHouse() {
    wx.reLaunch({
      url: "../mainHouse/mainHouse"
    })
  },
  my(e) {
    wx.reLaunch({
      url: '../my/my',
    })
  } 
})