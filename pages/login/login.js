// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:"",
    a:"",
    b:"",
    c:"",
    ym:"",
    yid:"",
    wxcode:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e.ym);
    if(e.ym){
      this.setData({
        ym: e.ym,

      })
    }
    if (e.yid) {
      this.setData({
        yid: e.yid,

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
  onShow: function (e) {
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
  getCode:function(){
    var that=this;
    wx.login({
      success(res){
        console.log(res);
        that.setData({
          wxcode:res.code
        })
      }
    })
  },
  // 用户授权 获取位置 录音
  // getUser:function(e){
  //   wx.getSetting({
  //     success(res) {
  //       if (!res.authSetting['scope.userLocation','scope.record']) {
  //         wx.authorize({
  //           scope: 'scope.userLocation',
  //           success() {
  //             // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
  //             wx.startRecord()
  //           }
  //         })
  //         wx.authorize({
  //           scope: 'scope.record',
  //           success() {
  //             // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
  //             wx.startRecord()
  //           }
  //         })                    
  //       }
  //     }
  //   })
  // },
goLogin:function(e){
  console.log(e.currentTarget.dataset.href);
  console.log(e.currentTarget.id);
  if (this.data.ym != '') {
    console.log(this.data.ym);
    wx.navigateTo({
      url: '../phoneLogin/phoneLogin?ym=' + this.data.ym,
    })
  } else {
    wx.navigateTo({
      url: '../phoneLogin/phoneLogin',
    }) 
  }    
},

  //通过绑定手机号登录
  getPhoneNumber: function (e) {
    var ivObj = e.detail.iv
    var telObj = e.detail.encryptedData
    var that = this; 
    // //------执行Login
    // wx.login({
    //   success: res => {
    //     console.log(res);
    //     console.log('code转换', res.code); //用code传给服务器调换session_key
        // wx.request({
        //   url: 'https://spapi.centaline.com.cn/SPXinFangApi/Users/UserLogin', //接口地址
        //   data: {
        //     code: this.data.wxcode,
        //     encryptedData: telObj,
        //     iv: ivObj,
        //     Type:3
        //   },
        //   header: {
        //     'content-type': 'application/json' // 默认值
        //   },
        //   method:"post",
        //   success: function (res) {
        //     console.log(res);
        //     if(res.data.code==1001){
        //       wx.showLoading({
        //         title: '登录中',
        //         mask: true
        //       }) 
        //       wx.setStorage({   //存储数据并准备发送给下一页使用
        //         key: "userInfo",
        //         data: res.data.data,
        //       })
        //     }
        //     if (res.data.code != 1001){
        //       wx.navigateTo({
        //         url: '../index/index',
        //       })              
        //     }
        //   }
        // })

        //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
          wx.reLaunch({
            url: '../index/index',
          })
          console.log(e);
        } else { //授权通过执行跳转
          wx.showLoading({
            title: '登录中',
            mask: true
          })
          wx.request({
            url: 'https://spapi.centaline.com.cn/SPXinFangApi/Users/UserLogin', //接口地址
            data: {
              code: this.data.wxcode,
              encryptedData: telObj,
              iv: ivObj,
              Type: 5
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "post",
            success: function (res) {
              console.log(res);
              if (res.data.code == 1001) {
                wx.setStorage({   //存储数据并准备发送给下一页使用
                  key: "userInfo",
                  data: res.data.data,
                })
                setTimeout(function(){
                  if (that.data.ym != "") {
                    console.log(that.data.ym);
                    if (that.data.yid!=""){
                      wx.navigateTo({
                        url: "../" + that.data.ym + "/" + that.data.ym + "?yid=" + that.data.yid
                      })
                    }else{
                      wx.navigateTo({
                        url: "../" + that.data.ym + "/" + that.data.ym
                      })
                    }

                  } else {
                    wx.reLaunch({
                      url: "../my/my"
                    })
                  } 
                },100)                
              }
              else{
                wx.showToast({
                  title: "登录失败，请稍后再试",
                  icon:"none"
                })
              }
              wx.hideLoading();
            }
          })
        }
    //   }
    // });

    //---------登录有效期检查
    // wx.checkSession({
    //   success: function () {
    //     console.log(1);
    //     //session_key 未过期，并且在本生命周期一直有效     



    //   },
    //   fail: function () {
    //     // session_key 已经失效，需要重新执行登录流程
    //     console.log(2);
    //     wx.login() //重新登录
    //   }
    // });
  },

})