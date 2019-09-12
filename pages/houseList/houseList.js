var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hisHouse: [],
    isFix: false,
    ptotal: 0,
    pidx: 2,
    no: false,
    // sval:"",
    // stag:"",
    list:[],
    isN:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    this.getData(1)
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
    wx.stopPullDownRefresh(); //刷新完成后停止下拉刷新动效
    //显示动画
    wx.showNavigationBarLoading(); 
    this.getData(1);
    setTimeout(function () {
      //隐藏动画
      wx.hideNavigationBarLoading()
    }, 300)    
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
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: 'pages/index/index',
      imageUrl:"../../img/house.jpg"
    }
  },
  getData:function(num){
    var that = this;
    if (num == undefined) {
      num = 1;
    }
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/GetShootEstatePageList',
      method: "post",
      data: { State: 4, PageIndex: num, PageSize: 10, Recommend:3 },
      success(res) {
        console.log(res);
        if (res.data.code == 1001) {
          that.setData({
            hisHouse: res.data.data.DataList,
            ptotal: res.data.data.TotalRecord,
            isN: true
          })
          if (num == 1) {
            that.setData({
              list: res.data.data.DataList
            })
          }
          if (num > 1){
            that.setData({
              list: that.data.list.concat(res.data.data.DataList)
            })
          }          
        }
        wx.hideLoading();
      }
    })
  },
  goHouseInfo:function(e){
    wx.navigateTo({
      url: '../houseInfo/houseInfo?id='+e.currentTarget.dataset.id,
    })
  },
  onPageScroll: function (e) {
    var that = this;
    console.log(e.scrollTop);
    if (e.scrollTop > 50) {
      that.setData({
        isFix: true
      })
    } else {
      that.setData({
        isFix: false
      })
    }
  }, 
  goM:function(){
    wx.navigateTo({
      url: '../mainHouse/mainHouse',
    })
  }     
})