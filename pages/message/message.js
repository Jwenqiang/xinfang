const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    utoken:"",
    sptt:"",
    qgtx:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    


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
  onShareAppMessage: function (res) {
    return {
      title: '专业为您甄选最笋房源，想买房，买好房，就上找笋盘！',
      imageUrl: "../../img/share.jpg",
      path: '/pages/index/index'
    }
  }, 
  getData:function(){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/Users/GetShootEstateMsgNotice',
      header:{token:that.data.utoken},
      success(res){
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            qgtx: res.data.data.ShootEstateSpecial,
            sptt: res.data.data.Information
          })
        }else{
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
      fail(error){
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
    })
  },
  goXt:function(e){
    wx.navigateTo({
      url: '../msgXt/msgXt?type=' + e.currentTarget.dataset.type,
    })
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
  message(e) {
    wx.reLaunch({
      url: "../message/message"
    })
  },
  my(e) {
    wx.reLaunch({
      url: '../my/my',
    })
  }
})