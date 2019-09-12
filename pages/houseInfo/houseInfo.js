
// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
var mark = [{
  id: "1",
  latitude: "22.51229",
  longitude: "113.94064",
  iconPath: "../../img/mark.jpg",
  title: "海信南方大厦",
  // 标签      
  label: { content: "海信南方大厦", bgColor: "#fa5e3c", padding: "5px", borderRadius: "3", anchorX: "20", anchorY: "-40", color: "#fff" },
  // 气泡
  // callout: {
  //   content: "海信南方大厦",
  //   color: "#fff",
  //   fontSize: 14,
  //   padding: 5,
  //   borderRadius: 3,
  //   bgColor: "#fa5e3c",
  //   display: "ALWAYS",
  //   boxShadow: "2px 2px 10px #aaa"
  // },
  width: 40,
  height: 40
}];
//获取应用实例
const app = getApp()

Page({
  data: {
    showModalStatus: false,
    animationData: {},

    showPage:false,
    isX:false,
    role:1,
    utoken:"",
    jjr:false,
    hid:"",
    house:"",
    banImg: "",
    current: 0, 
    circular: false,
    recWorks:"",
    xjDay: "0",
    xjHour: "0",
    xjMinute: "0",
    selectName: "",
    markers: mark,
    isPay:false,
    shareTitle: "",
    shareImg: "",    
    isShare:false,
    timer:""  ,
    isShow:false,
    isSun:false ,
    informPrice:"" ,
    isClick:false ,
    joinNum:"",
    sNum:"" ,
    ewm:"" ,
    isHide:false,
    myAnimation:{}
  },
  onLoad: function (e) {
    this.setData({
      isX: app.isIphoneX
    })    
    wx.showLoading({
      title: '',
    })     
    // 获取页面传递过来的Id
    console.log(e.id);
    if (e.id){
      this.setData({
        hid: e.id
      })      
    }
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          utoken:res.data.Token,
          role:res.data.RoleType
        })       
      },
      complete(c){
        that.getData(e.id);         
      }
    })
    // if (e.share == 1) {
    //   that.setData({
    //     isShare: true
    //   })
    // }   
    // wx.showLoading({
    //   title: '加载中',
    // })  
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '3XABZ-EAL33-UKR3S-YHJBW-QFHYK-VGFP3' // 必填
    });         
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }, 
  onHide(){
  },
  onUnload(){
    clearInterval(this.data.timer);
  },
  swiperChange: function (e) {
    if (e.detail.source == 'touch') {
      this.setData({
        current: e.detail.current
      })
    }
  }, 
  // * 页面相关事件处理函数--监听用户下拉动作
  // * /
  onPullDownRefresh: function () {

  },


  getData:function(e){
    var that=this;  
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateById',
      header: {
        token: that.data.utoken
      },
      data:{Id:e},
      success(res){
        console.log(res);
        if(res.data.code==1001){
          var title = res.data.data.VillageName + " " + res.data.data.CountF + "室" + res.data.data.CountT + "厅" + " " + res.data.data.ProductionAcreage + "㎡ 原价" + res.data.data.OriginalSalePrice + "万 抢购价" + res.data.data.BuySalePrice +"万"
          if (res.data.data.BrokerCompanyId>0){
            that.setData({
              jjr:true
            })
          }
          that.setData({
            showPage:true,
            house:res.data.data,
            ewm: res.data.data.BrokerStoreSale.WxQRcode,
            joinNum: res.data.data.ShootValueCount,
            shareImg: res.data.data.MainImg,
            banImg: res.data.data.ShootEstatePicWheelList,
            shareTitle:title,
            informPrice: res.data.data.BuySalePrice-5
          })
          wx.setStorage({
            key: 'house',
            data: res.data.data
          })
          that.setData({
            timer: setInterval(function () {
              that.getEndTime(res.data.data.ReserveTime); 
            }, 10)
          })
          // that.getEndTime(res.data.data.ReserveTime); 
          wx.hideLoading();
        }
      }
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:function () {
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
  goPic:function(e){
    wx.navigateTo({
      url: '../housePic/housePic?t='+e.currentTarget.dataset.type,
    })
  },
  goMap: function () {
    wx.navigateTo({
      url: '../maps/maps',
    })
  },  
  goNum: function (e) {
    wx.navigateTo({
      url: '../houseNum/houseNum?code='+e.currentTarget.dataset.code,
    })
  },  
  goDetail: function () {
    wx.navigateTo({
      url: '../houseDetail/houseDetail?id='+this.data.hid,
    })
  }, 
  goDt: function (e) {
    var that=this;
    console.log(e.id);
    if(e.currentTarget.dataset.t=="y"){
      wx.navigateTo({
        url: '../houseDt/houseDt?id=' + that.data.hid+"&t=y",
      })      
    }else{
      wx.navigateTo({
        url: '../houseDt/houseDt?id=' + that.data.hid,
      })      
    }

  },      
  // 倒计时
  getEndTime: function (time) {
    var _this = this;
    // 性价比倒计时
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
          var haomiao = Math.floor(sys_second % 1000);
          _this.setData({
            xjDay: day,
            xjHour: hour < 10 ? "0" + hour : hour,
            xjMinute: minute < 10 ? "0" + minute : minute
          })
        } else {
          clearInterval(_this.data.timer);
        }
      // }, 10);

  }, 
  //点击标注点进行导航 
  gotohere: function (res) {
    console.log(res);
    wx.openLocation({ // 打开微信内置地图，实现导航功能（在内置地图里面打开地图软件）
      latitude: 22.512290,
      longitude: 113.940640,
      name: "海信南方大厦",
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },   
  openConfirm: function (e) {
    console.log(e);
      if (e.currentTarget.dataset.tel != '' && e.currentTarget.dataset.tel!=null){
        wx.showModal({
          title: String(e.currentTarget.dataset.tel),
          content: '点确认拨打上面的电话号码，并根据提示输入分机号',
          confirmText: "确认",
          cancelText: "取消",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.tel,
              })
            } else {
              console.log('用户点击辅助操作')
            }
          }
        });
      }else{
        wx.showModal({
          title: String(e.currentTarget.dataset.m),
          content: '点确认拨打上面的手机号码',
          confirmText: "确认",
          cancelText: "取消",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.m,
              })
            } else {
              console.log('用户点击辅助操作')
            }
          }
        });        
      }


  },
  goYy: function (e) {
    wx.navigateTo({
      url: '../houseYy/houseYy?id=' + e.currentTarget.dataset.id,
    })
  }, 
  goIndex: function () {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  mBig(e){
    wx.previewImage({
      current: this.data.ewm,
      urls: [this.data.ewm]
    })
  } ,
  show(e){
    this.data.isShow = !this.data.isShow;
    this.data.isHide=!this.data.isHide;
    // this.setData({
    //   isShow: this.data.isShow,
    //   isHide: this.data.isHide
    // })
    var that = this;
    // 显示遮罩层 
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: "linear",
      delay: 0
    })
    // this.animation = animation
    // animation.translateY(300).step()
    animation.opacity(0.5).step()
    this.setData({
      animationData: animation.export(),
      isShow: that.data.isShow,
      isHide: that.data.isHide
    })
    // setTimeout(function () {
    // animation.translateY(0).step()
    animation.opacity(1).step()      
    this.setData({
      animationData: animation.export()
    })
    // }.bind(this), 200)     
  },
  sun(e){
    this.data.isSun = !this.data.isSun;
    this.data.isHide = !this.data.isHide;
    // this.setData({
    //   isSun: this.data.isSun,
    //   isHide: this.data.isHide
    // })
    var that = this;
    // 显示遮罩层 
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    // animation.opacity(0.5).step()
    this.setData({
      animationData: animation.export(),
      isSun: that.data.isSun,
      isHide: that.data.isHide
    })
    // setTimeout(function () {
      animation.translateY(0).step()
    // animation.opacity(1).step()      
      this.setData({
        animationData: animation.export()
      })
    // }.bind(this), 200)  
  },
  informY(e){
    var that=this;
    var val=Math.floor(e.detail.value);
    console.log(val);
    that.setData({
      informPrice:val
    })
  },
  setTip: function (e) {
    console.log(e);
    var that = this;
    if (that.data.informPrice==''){
      wx.showToast({
        title: '请输入价格',
        icon:"none"
      })
    }else{
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        wx.showModal({
          title: '设置降价通知',
          content: '确定设置降价通知吗？',
          confirmText: "确认",
          cancelText: "取消",
          success: function (yn) {
            console.log(res);
            if (yn.confirm) {
              console.log(yn);
              wx.request({
                url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/AddShootEstateDownNotice',
                method: "post",
                header: {
                  token: res.data.Token
                },
                data: {
                  BuySalePrice: that.data.informPrice,
                  ShootEstateId: that.data.hid
                },
                success(r) {
                  console.log(r);
                  if (r.data.code == 1001) {
                    wx.showToast({
                      title: "设置成功"
                    })

                  } else if (r.data.Message =='已拒绝为此请求授权。'){
                    wx.showModal({
                      title: "登录信息已失效",
                      content: '非常抱歉！您的登录状态已失效，请重新登录',
                      showCancel: false,
                      success: function (r) {
                        if (r.confirm) {
                          wx.clearStorage();
                          wx.navigateTo({
                            url: '../login/login',
                          })
                        }
                      }
                    });                    
                  }else {
                    wx.showToast({
                      title: "服务器错误，请稍后再试",
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
          content: '非常抱歉，必须登录后才能设置通知哦~',
          confirmText: "好的",
          showCancel: false,
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login',
              })
            }
          }
        })
      }
    })
    }
  }, 
  setSun(e){
    console.log(e);
    wx.showLoading({
      title: '',
    })
    var that=this;
    var val=e.currentTarget.dataset.n;
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/UpdateShootEstateShootValue?Id=' + that.data.hid+"&Type="+val,
      method:"post",
      header: {
        token: that.data.utoken
      },
      success:function(r){
        console.log(r)
        if(r.data.code==1001){
          that.setData({
            sNum:val,
            isClick: true,
            joinNum: that.data.joinNum + 1
          })
        }
        wx.hideLoading()
      }    
    })
  },
})
