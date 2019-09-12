// pages/myselfRz/myselfRz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    utoken: "",
    role: "",
    isRz: "",
    isJjr:"",
    name:"",
    sex:"",
    num:"",
    company:"",
    store:"",
    job:""
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
          utoken: res.data.Token,
          role: res.data.RoleType,
          isRz: res.data.Isrz,
          isJjr: res.data.IsAgentrz,
          name: res.data.FullName,
          num: res.data.IdCard,
          company: res.data.CompanyDes,
          store: res.data.StoreDes,
          job: res.data.StationDes         
        })
        if (that.data.num != null && that.data.num !=''){
          var idCard = that.data.num.substring(0, 1) + "******************"+that.data.num.substring(17, 18)
          that.setData({
            num: idCard
          })
        }
        if (that.data.name != null && that.data.name != '') {
          var iname = that.data.name.substring(0, 1) + "*"+that.data.name.substring(2)
          that.setData({
            name: iname
          })
        }          
        if (res.data.IdCard != null && res.data.IdCard!=''){
          if ((res.data.IdCard).substring(16, 17) % 2 == 0) {
            that.setData({
              sex: "女",
            })
          } else {
            that.setData({
              sex: "男",
            })
          }
        }
      }
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
  goRz(e){
    var that=this;
    var t=e.currentTarget.dataset.t
    if(t=="sm"){
      if (that.data.isRz > 0 && that.data.isRz < 3){
        wx.navigateTo({
          url: '../rzSuc/rzSuc',
        })
      }else{
        wx.navigateTo({
          url: '../rzName/rzName',
        })
      }
    }else{
      if (that.data.isJjr > 0&&that.data.isJjr < 3){
        wx.navigateTo({
          url: '../rzSalesuc/rzSalesuc',
        })         
      }else{
        wx.navigateTo({
          url: '../rzSale/rzSale',
        })
      }      
    }

  }
})