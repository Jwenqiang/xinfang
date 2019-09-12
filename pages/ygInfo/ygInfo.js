var WxParse = require('../../wxParse/wxParse.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isX:"",
    endTime:"",
    tian:0,
    shi:0,
    fen:0,
    yid:"",
    yg:"",
    tipMsg: "抢购提醒",
    ygHouse:[],
    utoken:"",
    isN:false,
    shareTitle:"",
    shareImg:"",
    isShare:false,
    timer:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      isX: app.isIphoneX
    })       
    wx.showLoading({
      title: '',
    })         
    this.setData({
      yid:e.yid
    })
    var that=this;
    // if (e.share == 1) {
    //   that.setData({
    //     isShare: true
    //   })
    // }    
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          utoken:res.data.Token
        })
      },
      complete(){
        that.getData();
      }
    })
  },
  onUnload() {
    clearInterval(this.data.timer);
  },  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: this.data.shareTitle,
      imageUrl: this.data.shareImg
    }
  },   
  getData:function(){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/GetShootEstateSpecialById',
      data:{Id:that.data.yid},
      header:{
        token:that.data.utoken
      },
      success(res){
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            endTime: res.data.data.StartTime,
            yg: res.data.data,
            ygHouse: res.data.data.ShootEstateSpecialEstateList,
            shareTitle: res.data.data.Name,
            shareImg: res.data.data.MainImg,
            isN:true
          })
          var article = res.data.data.Content;
          WxParse.wxParse('article', 'html', article, that, 5); 
          that.setData({
            timer: setInterval(function () {
              that.getEndTime(that.data.endTime);
            }, 10)
          })
          
          wx.hideLoading();  
        }

      }
    })
  },
  setTip: function (e) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        wx.showModal({
          title: '设置抢购提醒',
          content: '确定设置提醒吗？',
          confirmText: "确认",
          cancelText: "取消",
          success: function (yn) {
            console.log(res);
            if (yn.confirm) {
              console.log(yn);
              wx.request({
                url: 'https://spapi.centaline.com.cn/ShootEstate/AddShootEstateSpecialRemind',
                method: "post",
                header: {
                  token: res.data.Token
                },
                data: {
                  ShootEstateSpecialId: e.currentTarget.dataset.id,
                  Mobile: res.data.Mobile
                },
                success(r) {
                  console.log(r);
                  if (r.data.code == 1001) {
                    wx.showToast({
                      title: "设置成功"
                    })
                    that.setData({
                      tipMsg: "已设置",
                      isSet: true
                    })
                  } else {
                    wx.showToast({
                      title: r.data.message,
                      icon: "none"
                    })
                  }
                }
              })
            } else {
              console.log('用户点击辅助操作')
            }
          }
        })
      },
      fail(error) {
        wx.showModal({
          title: '请先登录',
          content: '非常抱歉，必须登录后才能设置提醒哦~',
          confirmText: "登录",
          cancelText: "取消",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              console.log('../login/login?ym=ygInfo&yid=' + that.data.yid);
              wx.navigateTo({
                url: '../login/login?ym=ygInfo&yid='+that.data.yid,
              })
            } else {
              console.log('用户点击辅助操作')
            }
          }
        })
      }
    })

  },   
  goInfo:function(e){
    var that=this;
    wx.navigateTo({
      url: '../houseInfo/houseInfo?id='+e.currentTarget.dataset.id,
    })
  },
  // 倒计时
  getEndTime: function (time) {
    var _this = this;
      var end_time = new Date(time.replace(/-/g, '/')).getTime();//月份是实际月份-1  
      var current_time = new Date().getTime();
      var sys_second = (end_time - new Date().getTime());
      // var timer = setInterval(function () {
        if (sys_second > 0) {
          sys_second -= 10;
          var day = Math.floor((sys_second / 1000 / 3600) / 24);
          var hour = Math.floor((sys_second / 1000 / 3600) % 24);
          var minute = Math.floor((sys_second / 1000 / 60) % 60);
          var second = Math.floor(sys_second / 1000 % 60);
          // var haomiao = Math.floor(sys_second % 1000);
          _this.setData({
            tian: day,
            shi: hour < 10 ? "0" + hour : hour,
            fen: minute < 10 ? "0" + minute : minute
          })
        } else {
          clearInterval(_this.data.timer);
        }
      // }, 10);
  },
  goIndex: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  }   
})