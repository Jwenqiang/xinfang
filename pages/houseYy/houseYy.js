// pages/houseYy/houseYy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    hid:1,
    house:"",
    yname:"",
    ytime:"",
    ytel:"",
    utoken:"",
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {  
    // 获取页面传递过来的Id
    console.log(e.id);
    if (e.id) {
      this.setData({
        hid: e.id
      })
    }
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          utoken:res.data.Token
        })
      },
      complete(e){
        that.getData(that.data.hid);
      }
    })

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
  getData:function(e){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateBasicById',
      header: {
        token: that.data.utoken
      },
      data: { Id: e },
      success(res) {
        console.log(res);
        that.setData({
          house: res.data.data
        })
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          ytel: res.data.Mobile,
          utoken: res.data.Token,
          show:true
        })
      }
    })
  },
  bindDateChange(e) {
    console.log(e);
    var that=this;
    that.setData({
      date: e.detail.value
    })
  },
  getval:function(e){
    this.setData({
      yname:e.detail.value
    })
  },
  setPhone: function (e) {
    var that=this;
    this.setData({
      ytel: e.detail.value
    })
    if (e.detail.value.length > 0) {
      that.setData({
        show: true
      })
    } else {
      that.setData({
        show: false
      })
    }    
  }, 
  clearNum:function(){
    this.setData({
      ytel: "",
      show: false
    })    
  }, 
  confimY:function(e){  
    console.log(this.data.yname);
    console.log(this.data.date);
    console.log(this.data.ytel);
    if (this.data.yname == "" ){
      wx.showToast({
        title: "姓名不能为空",
        icon: "none"
      })      
    }
    else if (this.data.date == "") {
      wx.showToast({
        title: "预约时间不能为空",
        icon: "none"
      })
    }  
    else if (this.data.ytel == "") {
      wx.showToast({
        title: "手机号码不能为空",
        icon: "none"
      })
    }       
    else if (this.data.yname != "" && this.data.date != "" && this.data.ytel!=""){
      if (this.data.ytel.length != 11 || !(/^1[345678]\d{9}$/.test(this.data.ytel))) {
        wx.showToast({
          title: "手机号码格式错误",
          icon: "none"
        })         
      }else{
        wx.showLoading({
          title: '',
        })
        wx.request({
          url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/AddShootEstateReserve',
          method: "post",
          header: {
            'content-type': 'application/json',
            'token': this.data.utoken
          },
          data: {
            FullName: this.data.yname,
            Mobile: this.data.ytel,
            ShootEstateId: this.data.hid,
            LookHouseTime: this.data.date,
            Type: 1,
            ShootEstateDirectionType:2
          },
          success(res) {
            console.log(res);
            if (res.data.code == 1001) {
              wx.hideLoading()
              wx.showModal({
                title: "预约成功",
                content: '客服会及时联系您确定带看具体事项，请保持通讯通畅',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      detal:1
                    })
                  }
                }
              });
            } else {
              wx.showToast({
                title: res.data.message,
                icon: "none"
              })
            }
          }
        })
      }       
    }
    // else{
    //   wx.showToast({
    //     title: "必填项不能空着",
    //     icon: "none"
    //   })      
    // }
  }  
})