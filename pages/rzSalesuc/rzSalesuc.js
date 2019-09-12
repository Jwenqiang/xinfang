// pages/rzSale/rzSale.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: "",
    company: "",
    store: "",
    job: "",
    fmPic: "",
    state:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          state: res.data.IsAgentrz,
          utoken: res.data.Token,
          uid: res.data.UserId,
          phone: res.data.Mobile,
          name: res.data.FullName,
          company: res.data.CompanyDes,
          store: res.data.StoreDes,
          job: res.data.StationDes,
          fmPic: res.data.WorkCard
        })
        if (e.f == 1) {
          that.setData({
            state: 1
          })
        }
      },
    })    
    wx.getStorage({
      key: 'jjr',
      success: function (res) {
        that.setData({
          name: res.data.FullName,
          phone: res.data.Mobile,
          company: res.data.CompanyDes,
          store: res.data.StoreDes,
          job: res.data.StationDes,
          fmPic: res.data.WorkCard
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

  handleImagePreview(e) {
    console.log(e);
    const images = this.data.fmPic
    wx.previewImage({
      current: images,
      urls: [images],
    })
  },  
  goBack(){
    wx.reLaunch({
      url:"../my/my"
    })
  },
  goSaleRz(){
    wx.navigateTo({
      url: '../rzSale/rzSale?rz=2',
    })
  }
})