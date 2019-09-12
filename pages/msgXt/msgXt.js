// pages/msgXt/msgXt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    utoken:"",
    msgList:"",
    isQg:"",
    isN:false,
    mC:[],
    isSale:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          utoken:res.data.Token
        })
        if(e.type=='qg'){
          that.setData({
            isQg:true
          })          
          that.getQg();
        }else{
          that.setData({
            isQg: false
          })           
          that.getSp();
        }
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
  onShareAppMessage: function (res) {
    return {
      title: '专业为您甄选最笋房源，想买房，买好房，就上找笋盘！',
      imageUrl: "../../img/share.jpg",
      path: '/pages/index/index'
    }
  }, 
  getQg:function(){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/Users/GetShootEstateMsgNoticeByType',
      header:{token:that.data.utoken},
      success(res){
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            msgList: res.data.data.DataList,
            isN:true
          })
        }else{
          wx.navigateTo({
            url: '../login/login?ym=msgXt&type=qg',
          })
        }
      }
    })
  },
  getSp: function () {
    var that = this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/Users/GetShootEstateMsgNoticeInformation',
      header: { token: that.data.utoken },
      success(res) {
        console.log(res);
        if (res.data.code == 1001) {
          that.setData({
            msgList: res.data.data.DataList,
            isN: true
          })
             
        } else {
          wx.navigateTo({
            url: '../login/login?ym=msgXt&type=sp',
          })
        }        
      }
    })
  },  
  goInfo(e){
    wx.navigateTo({
      url: '../msgInfo/msgInfo?type=' + e.currentTarget.dataset.type + "&id=" + e.currentTarget.dataset.id,
    })
  },
  goHouse(e){
    wx.navigateTo({
      url: '../houseInfo/houseInfo?id='+e.currentTarget.dataset.id,
    })
  }
})