// pages/rzSale/rzSale.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    utoken:"",
    uid:"",
    name:"",
    phone:"",
    company:"",
    store:"",
    job:"",
    fmPic:"",
    again:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if(e.rz){
      this.setData({
        again:2
      })
    }
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          utoken: res.data.Token,
          uid: res.data.UserId,
          phone: res.data.Mobile,
          // name: res.data.FullName,
          // company: res.data.CompanyDes,
          // store: res.data.StoreDes,
          // job: res.data.StationDes,
          // fmPic: res.data.WorkCard
        })
      },
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
  setMsg(e){
    var that=this;
    var t=e.currentTarget.dataset.t;
    var val=e.detail.value;
    if(t=="name"){
      that.setData({
        name:val
      })
    }else if (t == "company") {
      that.setData({
        company: val
      })
    } else if (t == "store") {
      that.setData({
        store: val
      })
    } else if (t == "job") {
      that.setData({
        job: val
      })
    }
  },
  selectPic(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);
        console.log(e);
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths =res.tempFilePaths[0];
          that.setData({
            fmPic: tempFilePaths
          })
          console.log(that.data.fmPic);
      }
    })
  },
  removeImage(e) {
      this.setData({
        fmPic: ""
      })
  },

  handleImagePreview(e) {
    console.log(e);
    const images = this.data.fmPic
    wx.previewImage({
      current: images,
      urls: [images],
    })
  },
  goNext(e) {
    //启动上传等待中...
    wx.showToast({
      title: '提交中...',
      icon: 'loading',
      mask: true,
    })    
    var that=this;
    if(that.data.name==""){
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
      })      
    } else if (that.data.company == "") {
      wx.showToast({
        title: '请填写所在公司',
        icon: 'none',
      })
    } else if (that.data.store == "") {
      wx.showToast({
        title: '请填写所在门店',
        icon: 'none',
      })
    } else if (that.data.job == "") {
      wx.showToast({
        title: '请填写岗位名称',
        icon: 'none',
      })
    } else if (that.data.fmPic == ""){
      wx.showToast({
        title: '请上传工牌',
        icon: 'none',
      })      
    }else{
      wx.getFileSystemManager().readFile({
        filePath: that.data.fmPic, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: r => { //成功的回调
          console.log('data:image/png;base64,' + r.data);
          var baseUrl = 'data:image/jpg;base64,' + r.data;
          wx.request({
            url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgByBase64',
            method: "post",
            data: {
              ImgBase64: baseUrl,
              Type: 1
            },
            success: r => {
              console.log(r);
              if (r.data.code == 1001) {
                var newImg = r.data.message;
                that.setData({
                  fmPic: newImg
                })
                wx.request({
                  url: 'https://spapi.centaline.com.cn/SPXinFangApi/Users/UpdateEconomicMan',
                  header: { token: that.data.utoken },
                  method:"post",
                  data:{
                    UserId:that.data.uid,
                    FullName:that.data.name,
                    CompanyDes:that.data.company,
                    StoreDes:that.data.store,
                    StationDes:that.data.job,
                    WorkCard:that.data.fmPic,
                    Type:that.data.again
                  },
                  success:r=>{
                    console.log(r);  
                    if(r.data.code==1001){
                      wx.setStorage({
                        key: 'jjr',
                        data: {
                          UserId: that.data.uid,
                          FullName: that.data.name,
                          CompanyDes: that.data.company,
                          StoreDes: that.data.store,
                          StationDes: that.data.job,
                          WorkCard: that.data.fmPic,
                          Mobile:that.data.phone                        
                        },
                        success:(o)=>{
                          wx.navigateTo({
                            url: '../rzSalesuc/rzSalesuc?f=1',
                          })
                          wx.hideToast();
                        }
                      })
                    } else if (r.data.Message=='已拒绝为此请求授权。'){
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
                  }
                })

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

  
  },  
})