// pages/phoneLogin/phoneLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eleven:false,
    code:"获取验证码",
    phoneCode:"",
    mobile:"",
    dis:false,
    ym:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if(e.ym){
      this.setData({
        ym:e.ym
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
  getNum:function(i){
    var _this=this;
    console.log(i);
    if (i.detail.cursor == 11 && (/^1[345678]\d{9}$/.test(i.detail.value))){
      _this.setData({
        eleven:true,
        mobile: i.detail.value
      })
    }else{
      _this.setData({
        eleven: false,
        mobile: i.detail.value,
        code: "获取验证码",
      })      
    }
  },
  getCode:function(){
    var _this=this;
    if (_this.data.eleven){
      var i=60;
      _this.setData({
        eleven: false,
      }) 
      wx.request({
        url: 'https://spapi.centaline.com.cn/Users/AddUserVerificationCode',
        method:"post",
        data: { Mobile:_this.data.mobile,Type:5},
        success(res){
          console.log(res);
          _this.setData({
            phoneCode: res.data.data.VerificationCode
          })
        }
      })     
      var djs=setInterval(function(){
        if(i>0){
          i--;
          _this.setData({
            dis: true,
            code: i+"秒后重新发送"
          })          
        }else{
          _this.setData({
            dis: false,
            code: "重新获取验证码",
            eleven: true,
          })
          i=60; 
          clearInterval(djs);           
        }
      },1000)

    }
  },
  setCode:function(e){
    this.setData({
      phoneCode:e.detail.value
    })
  },
  login:function(e){
    var that=this;
    if (that.data.mobile.length == 11 && (/^1[345678]\d{9}$/.test(that.data.mobile))){
      if (that.data.phoneCode!=""){
        wx.showLoading({
          title: '正在登录',
        })         
        wx.request({
          url: 'https://spapi.centaline.com.cn/Users/UserLogin',
          method:"post",
          data: { Mobile: that.data.mobile, Type: 2, Password: that.data.phoneCode},
          success(res){  
            wx.hideLoading();    
            console.log(res);      
            if(res.data.code==1001){
              setTimeout(function () {
                wx.showToast({
                  title: '登录成功',
                })
                wx.setStorage({
                  key: 'userInfo',
                  data: res.data.data,
                })
                if(that.data.ym!=""){
                  wx.navigateTo({
                    url: "../" + that.data.ym + "/" + that.data.ym
                  })                  
                }else{
                  wx.reLaunch({
                    url: "../my/my"
                  })  
                }
              }, 500)                         
            }else{
              setTimeout(function(){
                wx.showToast({
                  title: res.data.message,
                  icon: "none"
                })
              },500)
            }
          }
        })
      }else{
        wx.showToast({
          title: '验证码不能空着',
          icon: "none"
        })        
      }
    }else{
      wx.showToast({
        title: '手机号格式错误',
        icon:"none"
      })
    }
  }
})