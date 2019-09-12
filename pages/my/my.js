const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isX: false,
    navData: [
      {
        name: "首页",  //文本
        current: 0,    //是否是当前页，0不是  1是
        style: 0,     //样式
        ico: 'icon-home',  //不同图标
        fn: 'index'   //对应处理函数
      },
      {
        name: "房源",
        current: 0,
        style: 0,
        ico: 'icon-loufang',
        fn: 'mainHouse'
      },      
      {
        name: "",
        current: 0,
        style: 2,
        ico: '',
        fn: 'pubStatement'
      }, {
        name: "找笋盘",
        current: 0,
        style: 0,
        ico: 'icon-find',
        fn: 'house'
      }, {
        name: "我的",
        current: 1,
        style: 0,
        ico: 'icon-wo',
        fn: 'my'
      },
    ],
    isShow: false,
    contents: '好房U购',
    name:"",
    userImg:"",
    mobile:"",
    utoken: "",
    uid:"",
    role:"",
    uMsg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.setData({
      isX: app.isIphoneX
    })        
    // var that = this;
    // wx.getStorage({
    //   key: 'userInfo',
    //   success: function (res) {
    //     that.setData({
    //       utoken: res.data.Token,
    //       uid: res.data.UserId,
    //       role: res.data.RoleType
    //     })
    //     console.log(that.data.uid);
    //     that.getData();
    //   },
    //   fail(e) {
    //     that.setData({
    //       utoken: "",
    //       uid: "",
    //       role: 0,
    //       name: "",
    //       userImg: "",
    //       mobile: ""
    //     })
    //   }      
    // })
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
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {   
        that.setData({
          utoken: res.data.Token,
          uid: res.data.UserId,
          role: res.data.RoleType,
          isShow:true
        })
        if (res.data.RoleType == 4 || res.data.RoleType == 5) {
          that.data.navData[2].style = 1;
          that.setData({
            navData: that.data.navData
          })
        }         
        console.log(that.data.uid);
        that.getData();
      },
      fail(e) {
        that.data.navData[2].style = 2; 
        that.setData({
          isShow:false,
          utoken: "",
          uid: "",
          role: 0,
          name: "",
          userImg: "",
          mobile: "",
          navData:that.data.navData
        })
      }
    })
  },
  // 监听tab切换
  onTabItemTap(item) {

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
  getData:function(){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/Users/GetUser',
      data: { UserId:that.data.uid},
      header: {
        'token': that.data.utoken
      },
      success(res) {
        console.log(res);
        if (res.data.code == 1001) {
          that.setData({
            name: res.data.data.NickName,
            userImg: res.data.data.HeadImg,
            mobile: res.data.data.Mobile
          })
          wx.setStorage({
            key: 'userInfo',
            data: res.data.data,
          })
          that.getMsg();

        } else {
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
        }

      },
      fail(error) {
        wx.showModal({
          title: "登录信息已失效",
          content: '非常抱歉！您的登录状态已失效，请重新登录',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.clearStorage();
              wx.navigateTo({
                url: '../login/login',
              })
            }
          }
        });
      }
    })      

  },
  // getMsg:function(){
  //   var that=this;
  //   wx.getStorage({
  //     key: 'userInfo',
  //     success: function (res) {
  //       that.setData({
  //         utoken: res.data.Token,
  //         uid: res.data.UserId,
  //         role: res.data.RoleType
  //       })
  //     }
  //   })    

  // },
  getMsg(){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/Users/GetShootEstateTotalMsgNotice',
      header: { token: that.data.utoken },
      success(r) {
        console.log(r);
        if (r.data.code == 1001) {
          that.setData({
            uMsg: r.data.data
          })
        }
        else {
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
        }
      }
    })      
  },
  goMyself(e) {
    if(e.currentTarget.dataset.n!=''){
      wx.navigateTo({
        url: "../myself/myself?tx=" + this.data.userImg + "&n=" + this.data.name + "&t=" + this.data.mobile
      })
    }else{
      wx.navigateTo({
        url: '../login/login',
      })      
    }
  },  
  goMessage(){
    wx.navigateTo({
      url:"../message/message"
    })
  },
  goTip() {
    wx.navigateTo({
      url: "../acTip/acTip"
    })
  }, 
  goKf() {
    wx.navigateTo({
      url: "../acKf/acKf"
    })
  },
  goYy() {
    wx.navigateTo({
      url: "../mYy/mYy"
    })
  },
  goLogin:function(){
    wx.navigateTo({
      url: "../login/login"
    })
  },  
  // getUinfo:function(){
  //   var that=this;
  //   wx.getUserInfo({
  //     success(res) {
  //       const userInfo = res.userInfo
  //       const nickName = userInfo.nickName
  //       const avatarUrl = userInfo.avatarUrl
  //       const gender = userInfo.gender // 性别 0：未知、1：男、2：女
  //       const province = userInfo.province
  //       const city = userInfo.city
  //       const country = userInfo.country
  //       console.log(nickName);
        
  //       that.setData({
  //         userImg: avatarUrl
  //       })
  //     }
  //   })
  // },    
  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '已复制到剪切板',
              icon:'none'
            })
          }
        })
      }
    })
  },
  exit: function () {
    wx.clearStorage();
    this.onShow()
  },
  goMyhouse(e){
    wx.navigateTo({
      url: '../goMyhouse/goMyhouse',
    })
  },
  goWt(e){
    wx.navigateTo({
      url: '../myWtinfo/myWtinfo',
    })
  },

  index(e) {
    wx.reLaunch({
      url: "../index/index"
    })
  },
  house(e) {
    wx.reLaunch({
      url: "../house/house"
    })
  },
  pubStatement(e) {
    wx.navigateTo({
      url: "../pubStatement/pubStatement"
    })
  },
  mainHouse() {
    wx.reLaunch({
      url: "../mainHouse/mainHouse"
    })
  },
  my(e) {
    wx.reLaunch({
      url: '../my/my',
    })
  }

})