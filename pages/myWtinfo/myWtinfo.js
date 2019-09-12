// pages/myWtinfo/myWtinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex: "",
    hxInfo: "",
    hxArr: [
      ['1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室', '9室'],
      ['0厅', '1厅', '2厅', '3厅', '4厅', '5厅', '6厅', '7厅', '8厅', '9厅'],
      ['0卫', '1卫', '2卫', '3卫', '4卫', '5卫', '6卫', '7卫', '8卫', '9卫',]
    ],
    utoken:"",
    xqName:"",
    xqAddr:"",
    dy:"",
    mph:"",
    mj:"",
    qwPrice:"",
    uName:"",
    uPhone:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          utoken:res.data.Token,
          uPhone:res.data.Mobile
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
  setMsg(e){
    var that=this;
    var t = e.currentTarget.dataset.type;
    var val=e.detail.value;
    if(t=="xqName"){
      that.setData({
        xqName:val
      })
    } else if (t == "xqAddr"){
      that.setData({
        xqAddr: val  
      })
    } else if (t == "dy") {
      that.setData({
        dy: val
      })
    } else if (t == "mph") {
      that.setData({
        mph: val
      })
    } else if (t == "mj") {
      that.setData({
        mj: val
      })
    } else if (t == "qwPrice") {
      that.setData({
        qwPrice: val
      })
    } else if (t == "uName") {
      that.setData({
        uName: val
      })
    } else if (t == "uPhone") {
      that.setData({
        uPhone: val
      })
    }
  },
  hxMsg: function (e) {
    console.log(e);
    var info = this.data.hxArr[0][e.detail.value[0]] + this.data.hxArr[1][e.detail.value[1]] + this.data.hxArr[2][e.detail.value[2]];
    console.log(info);
    this.setData({
      multiIndex: e.detail.value,
      hxInfo: info
    })
  }, 
  pushInfo(e){
    var that=this;
    if (that.data.xqName == '') {
      wx.showToast({
        title: '请填写小区名称',
        icon: 'none'
      })
    } else if (that.data.xqAddr == '') {
      wx.showToast({
        title: '请填写楼栋号',
        icon: 'none'
      })
    } else if (that.data.dy == '') {
      wx.showToast({
        title: '请填写单元号',
        icon: 'none'
      })
    } else if (that.data.mph== '') {
      wx.showToast({
        title: '请填写门牌号',
        icon: 'none'
      })
    } else if (that.data.mj == '') {
      wx.showToast({
        title: '请填写大致面积',
        icon: 'none'
      })
    } else if (that.data.hxInfo == '') {
      wx.showToast({
        title: '请填写房型',
        icon: 'none'
      })
    } else if (that.data.qwPrice == '') {
      wx.showToast({
        title: '请填写期望售价',
        icon: 'none'
      })
    }else if(that.data.uName==''){
      wx.showToast({
        title: '请填写对您的称呼',
        icon: 'none'
      })
    } else if (that.data.uPhone == ''){
      wx.showToast({
        title: '请填写您的联系方式',
        icon: 'none'
      })      
    }else{
      wx.showLoading({
        title: '',
      })
      wx.request({
        url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/AddEntrustment',
        method:"post",
        header: { token: that.data.utoken },
        data:{
          NickName:that.data.uName,
          Mobile: that.data.uPhone,
          DictionariesHouseName: that.data.xqName,
          Building: that.data.xqAddr,
          Unit: that.data.dy,
          HouseNumber: that.data.mph,
          ProductionAcreage: that.data.mj,
          BuySalePrice: that.data.qwPrice,
          Apartment: that.data.hxInfo          
        },
        success:res=>{
          console.log(res);
          if(res.data.code==1001){
            wx.setStorage({
              key: 'wtHouse',
              data: {
                NickName: that.data.uName,
                Mobile: that.data.uPhone,
                DictionariesHouseName: that.data.xqName,
                Building: that.data.xqAddr,
                Unit: that.data.dy,
                HouseNumber: that.data.mph,
                ProductionAcreage: that.data.mj,
                BuySalePrice: that.data.qwPrice,
                Apartment: that.data.hxInfo                 
              },
            })
            wx.navigateTo({
              url: '../wtSuc/wtSuc',
            })                       
          } else if (res.data.message=='已拒绝为此请求授权。'){
            wx.showModal({
              title: '错误',
              content: '登录信息已失效，请重新登录！',
              showCancel: false,
              success: function (res) {
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            })            
          }else{
            wx.showModal({
              title: '错误',
              content: res.data.message,
              showCancel: false,
              success: function (res) {
              }
            })             
          }
          wx.hideLoading()
        }
      })
    }
  } 
})