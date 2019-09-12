// pages/topHouse/topHouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topHouse: [
      // { title: "", price: "", time: "2019/06/15 12:00" },
      // { title: "", price: "", time: "2019/08/16 17:00" },
      // { title: "", price: "", time: "2019/07/29 09:39" },
      // { title: "", price: "", time: "2019/09/18 16:44:15" }
    ],
    ptotal:0,
    pidx: 2,
    no: false,
    isN:false,
    isShare:false,
    imgBj:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // const path = wx.getStorageSync('image_cache')
    // if (path.length == 5) {
    //   this.setData({
    //     imgBj: path
    //   })
    // } else {
    //   this.setHz(['https://hfugweb.centaline.com.cn/img/smallR/img/toph1.png', 'https://hfugweb.centaline.com.cn/img/smallR/img/list-bj.png', 'https://hfugweb.centaline.com.cn/img/smallR/img/thh1.png', 'https://hfugweb.centaline.com.cn/img/smallR/img/thh2.png', 'https://hfugweb.centaline.com.cn/img/smallR/img/thh3.png','https://hfugweb.centaline.com.cn/img/smallR/img/sp.png'])
    // }    
    wx.showLoading({
      title: ''
    });    
    var that = this;
    that.getData();
    if (e.share == 1) {
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
      title: '价格严选、全网低价、爆款户型，最笋盘源推荐排行榜',
      imageUrl: "../../img/share.jpg",
      path: '/pages/topHouse/topHouse?share=1'
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
  getData:function(num){
    var that=this;
    if (num == undefined) {
      num = 1;
    }    
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateRankingPageList',
      data: { State: 4, PageIndex: num, PageSize: 10 },
      success(res) {
        console.log(res);
        if (res.data.code == 1001) {
          that.setData({
            // topHouse: res.data.data.DataList,
            ptotal: res.data.data.TotalRecord,
            isN:true
          })
          if (num == 1) {
            that.setData({
              topHouse: res.data.data.DataList
            })
          }
          if (num > 1) {
            that.setData({
              topHouse: that.data.topHouse.push(res.data.data.DataList)
            })
          }
          wx.hideLoading();             
        }
      }
    })
  },
  setHz(u) {
    var that=this;
    var img_arr = []
    for (var i in u) {
      wx.downloadFile({
        url: u[i],
        success: res => {
          if (res.statusCode === 200) {
            console.log('图片下载成功' + res.tempFilePath)
            // 第二步: 使用小程序的文件系统，通过小程序的api获取到全局唯一的文件管理器
            const fs = wx.getFileSystemManager()
            fs.saveFile({
              tempFilePath: res.tempFilePath, // 传入一个临时文件路径
              success(res) {
                img_arr.push(res.savedFilePath);
                console.log('图片缓存成功', res.savedFilePath) // res.savedFilePath 为一个本地缓存文件路径  
                if (i == u.length - 1) {
                  wx.setStorageSync('image_cache', img_arr)
                  that.setData({
                    imgBj: img_arr
                  })
                }
              }
            })
          } else {
            console.log('响应失败', res.statusCode)
          }
        }
      })
    }
  },  
  goHouseInfo:function(e){
    wx.navigateTo({
      url: '../houseInfo/houseInfo?id='+e.currentTarget.dataset.id,
    })
  },
  goIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
  }  
})