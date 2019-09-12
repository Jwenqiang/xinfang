//app.js
App({
  isIphoneX:"",
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    var that=this;
    wx.getSystemInfo({

      success: function (res) {

        if (res.model.indexOf('iPhone X')>-1) {

          that.isIphoneX = true
        }
        console.log(res.model);
        
      }

    })    
  },
  globalData: {
    userInfo: null
  }
  
})