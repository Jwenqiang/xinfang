// pages/houseYy/houseYy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: 4,
    date: '',
    hid: 1,
    yid:1002,
    house: "",
    uMsg:"",
    yname: "",
    ytime: "",
    ytel: "",
    utoken: "",
    who:""    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          ytel: res.data.Mobile,
          utoken: res.data.Token,
          role: res.data.RoleType,
          who:e.t
        })
        console.log(res.data.RoleType);
        that.getData(e.id);
        that.getU(e.yid,e.t);
      }
    })    
    // console.log(e.id);
    // if (e.id) {
      // this.getData(e.id);
    //   this.setData({
    //     hid: e.id
    //   })
    // }
    
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
  getData: function (e) {
    var that = this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateBasicById',
      data: { Id: e },
      success(res) {
        console.log(res);
        that.setData({
          house: res.data.data,
        })
      }
    })
  }, 
  getU: function (e,t) {
    var that = this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateReserveById',
      data: { Id: e,Type:t },
      header:{token:that.data.utoken},
      success(res) {
        console.log(res);
        that.setData({
          uMsg: res.data.data,
        })
      }
    })
  },    
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  callPhone:function(e){
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone,
    })
  },
  goYdk:function(e){
    wx.navigateTo({
      url: '../mYdk/mYdk?yid=' + e.currentTarget.dataset.yid + "&state=" + e.currentTarget.dataset.state,
    })
  },
  goYsx: function (e) {
    wx.navigateTo({
      url: '../mYsx/mYsx?yid=' + e.currentTarget.dataset.yid + "&state=" + e.currentTarget.dataset.state,
    })
  },  
})