// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hisHouse: [
      // { title: "", price: "", time: "2019/06/15 12:00" },
      // { title: "", price: "", time: "2019/08/16 17:00" },
      // { title: "", price: "", time: "2019/07/29 09:39" },
      // { title: "", price: "", time: "2019/09/18 16:44:15" }
    ],
    ptotal: 0,
    pidx: 2,
    no: false,
    isN:false,
    isShare:false    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.showLoading({
      title: ''
    });    
    var that=this;
    that.getData();
    if(e.share==1){
      that.setData({
        isShare: true
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
    var that = this;
    if (Math.ceil(that.data.ptotal / 10) >= that.data.pidx) {
      wx.showLoading({
        title: '加载中'
      });
      that.getData(that.data.pidx);
      that.setData({
        pidx: that.data.pidx + 1
      })
      setTimeout(function () {
        wx.hideLoading();
      }, 1000)
    } else {
      that.setData({
        no: true
      })
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '平台真实成交数据，助您购买好房！',
      imageUrl: "../../img/share.jpg",
      path: '/pages/history/history?share=1'
    }
  }, 
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    var that = this;
    wx.stopPullDownRefresh();
    //显示动画
    wx.showNavigationBarLoading()
    that.getData();
    setTimeout(function () {
      //隐藏动画
      wx.hideNavigationBarLoading()
    }, 500)
  },   
  getData: function (num) {
    var that = this;
    if (num == undefined) {
      num = 1;
    }
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstatePageList',
      method: "post",
      data: { State: 6, ApplyState: 2, PageIndex: num, PageSize: 10, DealState: true, ShootEstateDirectionType: 2 },
      success(res) {
        console.log(res);
        if (res.data.code == 1001) {
          that.setData({
            // hisHouse: res.data.data.DataList,
            ptotal: res.data.data.TotalRecord,
            isN: true
          })
          if (num == 1) {
            that.setData({
              hisHouse: res.data.data.DataList
            })
          }
          if (num > 1) {
            that.setData({
              hisHouse: that.data.hisHouse.push(res.data.data.DataList)
            })
          }
          wx.hideLoading();          
        }
      }
    })
  },  
  goHouseInfo: function (e) {
    wx.navigateTo({
      url: '../houseInfo/houseInfo?id=' + e.currentTarget.dataset.id,
    })
  },
  goIndex:function(){
    wx.switchTab({
      url: '../index/index',
    })
  }  
})