// pages/rzName/rzName.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgZ:"",
    imgZbase:"",
    imgF: "",
    imgFbase:"",
    rzName:"",
    rzNum:"",
    utoken: "",
    role: "",
    isRz: "",
    uid:"",
    bjz:true,
    bjf:true    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          utoken: res.data.Token,
          role: res.data.RoleType,
          isRz: res.data.Isrz,
          // uid: res.data.UserId,
          // imgZ: res.data.IdCardPositive,
          // imgF: res.data.IdCardNegative,
          // rzName: res.data.FullName,
          // rzNum: res.data.IdCard,
        })
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
  onShareAppMessage: function () {

  },
  setImg(e) {
    var type = e.currentTarget.dataset.t;
    var that = this;
    if (type == 'z') {
      wx.chooseImage({
        count: 1,  //最多可以选择的图片总数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths[0];
          console.log(tempFilePaths);
          //启动上传等待中...
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
          })
          wx.getFileSystemManager().readFile({
            filePath: tempFilePaths, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: r => { //成功的回调
              var baseUrl = 'data:image/jpg;base64,' + r.data;
              wx.request({
                url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgByBase64',
                method: "post",
                data: {
                  ImgBase64: baseUrl
                },
                success: r => {
                  console.log("正");
                  if (r.data.code == 1001) {
                    var newImg = r.data.message;
                    that.setData({
                      imgZ: newImg,
                      bjz:false
                    })
                    wx.hideToast();
                    console.log("正面"+that.data.imgZ)
                  } else {
                    wx.hideToast();
                    wx.showModal({
                      title: '错误提示',
                      content: '上传图片失败,请稍后再试~',
                      showCancel: false,
                      success: function (res) { }
                    })
                  }
                }
              })
            }
          })

        }
      })
    } else if (type == 'f') {
      var that = this;
      wx.chooseImage({
        count: 1,  //最多可以选择的图片总数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths[0];

          //启动上传等待中...
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
          })
          wx.getFileSystemManager().readFile({
            filePath: tempFilePaths, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: r => { //成功的回调
              console.log("反");
              var baseUrl = 'data:image/jpg;base64,' + r.data;
              wx.request({
                url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgByBase64',
                method: "post",
                data: {
                  ImgBase64: baseUrl
                },
                success: r => {
                  console.log(r);
                  if (r.data.code == 1001) {
                    var newImgF = r.data.message;
                    that.setData({
                      imgF: newImgF,
                      bjf:false
                    })
                    wx.hideToast();
                  } else {
                    wx.hideToast();
                    wx.showModal({
                      title: '错误提示',
                      content: '上传图片失败,请稍后再试~',
                      showCancel: false,
                      success: function (res) { }
                    })
                  }
                }
              })
            }
          })

        }
      })
    }
  },  
  setInfo(e){
    var that=this;
    console.log(e);
    var t = e.currentTarget.dataset.t;
    var val = e.detail.value;
    if(t=='name'){
      that.setData({
        rzName:val
      })
    }else{
      that.setData({
        rzNum: val
      })      
    }
  },
  goSuc(e){
    var that=this;
    if(that.data.imgZ==''){
      wx.showToast({
        title: '请上传身份证正面',
        icon:'none'
      })
    } else if (that.data.imgF == ''){
      wx.showToast({
        title: '请上传身份证反面',
        icon: 'none'
      })      
    } else if (that.data.rzName == '') {
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'none'
      })
    } else if (that.data.rzNum == '') {
      wx.showToast({
        title: '请输入您的身份证号码',
        icon: 'none'
      })
    } else if (that.data.rzNum.length!=18){
      wx.showToast({
        title: '您的身份证号码有误',
        icon: 'none'
      })      
    }else{
      //等待中...
      wx.showToast({
        title: '提交中...',
        icon: 'loading',
        mask: true,
        duration: 10000
      })
      wx.request({
        url: 'https://spapi.centaline.com.cn/SPXinFangApi/Users/UpdateIdentity',
        header: { token: that.data.utoken },
        method: "post",
        data: { IdCardPositive: that.data.imgZ, IdCardNegative: that.data.imgF, FullName: that.data.rzName, IdCard: that.data.rzNum, UserId:that.data.uid},
        success: r => {
          console.log(r);
          if (r.data.code == 1001) {
            wx.hideToast();
            wx.navigateTo({
              url: '../rzSuc/rzSuc',
            })
            wx.setStorage({
              key: 'rzMsg',
              data: {FullName: that.data.rzName, IdCard: that.data.rzNum},
            })
          } else if (r.data.Message =="已拒绝为此请求授权。") {
            wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '登录信息已失效,请重新登录~',
              showCancel: false,
              success: function (res) { 
                wx.navigateTo({
                  url: '../login/login?ym=rzName',
                })
              }
            })
          } else {
            wx.hideToast();
            wx.showModal({
              title: '错误提示',
              content: '提交失败,请稍后再试~',
              showCancel: false,
              success: function (res) { }
            })
          }
        }
      })
    } 
  }
})