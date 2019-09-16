// pages/houseZt/houseZt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ztHouse: [
      // { title: "", price: "", time: "2019/06/15 12:00" },
      // { title: "", price: "", time: "2019/08/16 17:00" },
      // { title: "", price: "", time: "2019/07/29 09:39" },
      // { title: "", price: "", time: "2019/09/18 16:44:15" }
    ],
    datetime:"",
    tipMsg:"抢购提醒",
    ztList:[],
    isSet:false,
    ptotal: 0,
    isN:false,
    pidx: 2,
    no: false,    
    utoken:"",
    idx:0,
    wxcode:"",
    isLogin:false,
    timer:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
      
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res);
        that.setData({
          utoken: res.data.Token,
          isLogin: true
        })
      },
      complete() {
        that.getData(1).then(function (resolve) {
          that.setData({
            timer: setInterval(function () {
              that.djsList()
            }, 1000)
          })
          console.log(resolve);
          wx.hideLoading();
        });
      }
    }) 
  },  
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    var that = this;
    wx.stopPullDownRefresh();
    //显示动画
    wx.showNavigationBarLoading();
    that.onShow();
    setTimeout(function () {
      //隐藏动画
      wx.hideNavigationBarLoading()
    }, 500)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    var that = this;
    if (Math.ceil(that.data.ptotal / 10) >= that.data.pidx) {
      wx.showLoading({
        title: '加载中'
      });
      that.getData(that.data.pidx).then(function (resolve) {
        that.setData({
          timer: setInterval(function () {
            that.djsList()
          }, 1000)
        })
      });
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
  onHide(){
    // 关闭页面清除定时器
    clearInterval(this.data.timer);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res);
    return {
      title: '深圳周边最笋二手盘源，尽在“找笋盘”！',
      imageUrl: "../../img/house.jpg",
      path: '/pages/index/index'
    }
  },     
  getData: function (num){
    var that=this; 
    return new Promise(function (resolve){
      wx.getStorage({
        key: 'userInfo',
        success: function (res) {
          console.log(res);
          that.setData({
            utoken: res.data.Token
          })
        }
      })      
      console.log(that.data.utoken);   
      if (num == undefined) {
        num = 1;
      }    
      wx.request({
        url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateSpecialPageList',
        data: { PageIndex: num, PageSize: 10 },
        header:{
          token:that.data.utoken
        },
        success(res){
          console.log(res);
          if(res.data.code==1001){
            that.setData({
              // ztHouse: res.data.data.DataList,
              ptotal: res.data.data.TotalRecord,
              isN: true            
            }) 
            if (num == 1) {
              
              that.setData({
                ztHouse: res.data.data.DataList
              })
              console.log(that.data.ztHouse);
            }
            if (num > 1) {
              that.setData({
                ztHouse: that.data.ztHouse.push(res.data.data.DataList)
              })
            }
            // that.djsList();
            console.log(that.data.ztHouse);   
            resolve('zt');     
          }
        }
      })
    })
  },

  // 本周笋盘倒计时
  djsList: function (bz) {
    // 倒计时时间转换为时间戳
    var dates = [];
    for (var i in this.data.ztHouse) {
      // if (this.data.ztHouse[i].StartTime != "" && this.data.ztHouse[i].Type==1) {
      var end_time = new Date((this.data.ztHouse[i].StartTime).replace(/-/g, '/')).getTime();//月份是实际月份-1  
      var current_time = new Date().getTime();
      var sys_second = (end_time - new Date().getTime());
      if (isNaN(sys_second)){
        sys_second=0
      }
      dates.push({ dat: sys_second });
      // }
    }
    this.setData({
      datetime: dates
    })
    // 倒计时执行
    let that = this;
    let len = that.data.datetime.length;//时间数据长度

    // var timer = setInterval(function () {//时间函数

      for (var i = 0; i < len; i++) {
        var intDiff = that.data.datetime[i].dat;//获取数据中的时间戳
        if (intDiff > 0) {//转换时间
          that.data.datetime[i].dat -= 1000;
          var day = Math.floor((intDiff / 1000 / 3600) / 24);
          var hour = Math.floor((intDiff / 1000 / 3600) % 24);
          var minute = Math.floor((intDiff / 1000 / 60) % 60);
          var second = Math.floor(intDiff / 1000 % 60);

          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          var str = day + "," + hour + ',' + minute + ',' + second
          that.data.datetime[i].difftime = str;//在数据中添加difftime参数名，把时间放进去
          
          that.data.ztHouse[i].djs = that.data.datetime[i].difftime;
          that.setData({
            ztHouse: that.data.ztHouse
          })
        } else {
          // var str = "已结束！";
          // clearInterval(timer);
          continue;
        }
      }

    // }, 1000)

  },
  goZtInfo: function (e) {
    console.log(e)
      wx.navigateTo({
        url: '../ygInfo/ygInfo?yid=' + e.currentTarget.dataset.id
      })

  },   
  setTip:function(e){
    console.log(e);
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
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
                url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/AddShootEstateSpecialRemind',
                method: "post",
                header: {
                  token: res.data.Token
                },
                data: {
                  ShootEstateSpecialId: e.currentTarget.dataset.id,
                  Mobile: res.data.Mobile,
                  ShootEstateDirectionType:2
                },
                success(r) {
                  console.log(r);
                  if(r.data.code==1001){
                    wx.showToast({
                      title:"设置成功"
                    })      
                    that.data.ztHouse[e.currentTarget.dataset.idx].isOn=true;
                    that.setData({
                      tipMsg: "已设置",
                      ztHouse: that.data.ztHouse
                    })

                  }else{
                    wx.showToast({
                      title: "服务器错误，请稍后再试",
                      icon:"none"
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
      fail(error){
        wx.showModal({
          title: '请先登录',
          content: '非常抱歉，必须登录后才能设置提醒哦~',
          confirmText: "好的",
          // showCancel: false,
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login?ym=houseZt',
              })
            }
          }
        }) 
      }
    })
  
  },
  getCode: function () {
    var that = this;
    wx.login({
      success(res) {
        console.log(res);
        that.setData({
          wxcode: res.code
        })
      }
    })
  },   
  //通过绑定手机号登录
  getPhoneNumber: function (e) {
    var ivObj = e.detail.iv
    var telObj = e.detail.encryptedData
    var that = this;
    console.log(this.data.wxcode);

    //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
      // wx.reLaunch({
      //   url: '../index/index',
      // })
      console.log(e);
    } else { //授权通过执行跳转
      wx.showLoading({
        // title: '登录中',
        mask: true
      })
      wx.request({
        url: 'https://spapi.centaline.com.cn/SPXinFangApi/Users/UserLogin', //接口地址
        data: {
          code: this.data.wxcode,
          encryptedData: telObj,
          iv: ivObj,
          Type: 3
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
            that.setData({
              isLogin:true
            })
            that.setTip(e);           
          }
          else {
            wx.showToast({
              title: "服务器错误，请稍后再试",
              icon: "none"
            })
          }
          wx.hideLoading();
        }
      })
    }
    //   }
    // });

    //---------登录有效期检查
    wx.checkSession({
      success: function () {
        console.log(1);
        //session_key 未过期，并且在本生命周期一直有效       
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        console.log(2);
        wx.login() //重新登录
      }
    });
  },

})