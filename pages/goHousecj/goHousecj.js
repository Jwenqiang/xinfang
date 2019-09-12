// pages/goHousecj/goHousecj.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    utoken:"",
    hid:"",
    currentTime:"",
    jyInfo:"",
    priceInfo:"",
    cjName:"",
    cjPhone:"",
    house:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var id=e.id;
    this.setData({
      hid:e.id
    })
    var d = new Date()
    var day = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    this.setData({
      currentTime: year + "-" + month + "-" + day
    })
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          utoken:res.data.Token
        })
      },
      complete(e){
        that.getData(id);
      }
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
  getData(e) {
    var that = this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/GetShootEstateById',
      header: { token: that.data.utoken },
      data: {
        Id: e
      },
      success: res => {
        console.log(res);
        if (res.data.code == 1001) {
          console.log(res);
          that.setData({
            house: res.data.data
          })
        } else {
          wx.showModal({
            title: '错误提示',
            content: '登录信息已失效，请重新登录~',
            showCancel: false,
            success: function (res) {
              wx.navigateTo({
                url: '../login/login',
              })
            }
          })
        }
      }
    })
  },  
  jyMsg(e) {
    console.log(e);
    this.setData({
      jyInfo: e.detail.value
    })
  },  
  setPrice(e){
    var num=e.detail.value;
    this.setData({
      priceInfo:num
    })
    console.log(this.data.priceInfo);
  },
  setMsg(e){
    var type=e.currentTarget.dataset.t;
    if(type=="name"){
      this.setData({
        cjName:e.detail.value
      })
    }else{
      this.setData({
        cjPhone: e.detail.value
      })      
    }
  },
  save(e){
    wx.showLoading({
      title: '',
    })
    var dataList=this.data.jyInfo+","+this.data.priceInfo+","+this.data.cjName+","+this.data.cjPhone;
    console.log(dataList);
    var that=this;
    if (that.data.jyInfo==''){
      wx.showToast({
        title: '请选择签约日期',
        icon: 'none'
      })         
    } else if (that.data.priceInfo==''){
      wx.showToast({
        title: '请输入成交金额',
        icon: 'none'
      })         
    }else{
      wx.request({
        url: 'https://spapi.centaline.com.cn/ShootEstate/UpdateShootEstateState',
        header: { token: that.data.utoken },
        method: "post",
        data: {
          State: 6,
          Type: 6,
          Id: that.data.hid,
          DealDate: that.data.jyInfo,
          DealAmount: that.data.priceInfo,
          DealFullName: that.data.cjName,
          DealTelePhone: that.data.cjPhone
        },
        success: res => {
          console.log(res);
          if (res.data.code == 1001) {
            wx.showToast({
              title: '修改成功',
            })
          } else {
            wx.showModal({
              title: '错误提示',
              content: '登录信息已失效，请重新登录~',
              showCancel: false,
              success: function (res) {
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            })
          }
        }
      })      
    }
  }
})