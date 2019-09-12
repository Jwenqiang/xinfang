// pages/myself/myself.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    uimg:"",
    mobile:"",
    utoken:"",
    role:"",
    isRz: "",
    isJjr:"",
    fullName:"",
    company:"",
    store:"",
    job:"",
    wxEwm:"",

    years:"",
    goodJ:"",
    area:"",
    msg:"",
    isShow:false,
    tagList:[],
    tsMsg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e);
    this.setData({
      uimg: e.tx,
      name: e.n,
      mobile:e.t
    })
    console.log(this.data.uimg);
  
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
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          utoken: res.data.Token,
          role: res.data.RoleType,
          isRz: res.data.Isrz,
          isJjr: res.data.IsAgentrz,
          fullName: res.data.FullName,
          company:res.data.CompanyDes,
          store: res.data.StoreDes,
          job: res.data.StationDes,
          wxEwm: res.data.WxQRcode,
          years: res.data.PractitionersYears,
          goodJ: res.data.BusinessGood,
          area: res.data.MainVillage,
          msg: res.data.PersonalIntroduce,          
        })
        if (that.data.fullName != null && that.data.fullName != '') {
          var iname = that.data.fullName.substring(0, 1) + "*" + that.data.fullName.substring(2)
          that.setData({
            fullName: iname
          })
        }  
        that.getTag();
      }
    })  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("hide");
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
  exit:function(){
    wx.clearStorage();
    wx.reLaunch({
      url: '../my/my',
    })
  },
  // 修改昵称
  setName(e){
    var that=this;
    var newName=e.detail.value;
    if (newName==''){
      wx.showToast({
        title: '昵称不能为空',
        icon:"none"
      })
      that.setData({
        name:that.data.name
      })
    }else{
      wx.request({
        url: 'https://spapi.centaline.com.cn/Users/UpdateNickName',
        header: { token: that.data.utoken },
        method: "post",
        data: { NickName: newName },
        success: r => {
          console.log(r);
          if(r.data.code==1001){
            wx.getStorage({
              key: 'userInfo',
              success: function (res) {
                res.data.NickName = newName;
                that.restHz(res.data);
              }
            })
            that.setData({
              name: newName
            })         
          }
        } 
      })     
    }
  },
  setTx(e){
    var that = this;
    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
            wx.showToast({
              title: '正在上传...',
              icon: 'loading',
              mask: true,
              duration: 10000
            })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: r => { //成功的回调
            var baseUrl='data:image/jpg;base64,' + r.data;
            wx.request({
              url: 'https://spapi.centaline.com.cn/System/PostImgByBase64',
              method:"post",
              data:{
                ImgBase64: baseUrl,
                Type: 1
              },
              success:r=>{
                if(r.data.code==1001){
                  var newImg = r.data.message;
                  wx.request({
                    url: 'https://spapi.centaline.com.cn/Users/UpdateHeadImg',
                    header: { token: that.data.utoken },
                    method:"post",
                    data: { HeadImg:r.data.message},
                    success:r=>{
                        if(r.data.code==1001){
                          wx.getStorage({
                            key: 'userInfo',
                            success: function (res) {
                              res.data.HeadImg = newImg;
                              that.restHz(res.data);
                            }
                          })                          
                          that.setData({
                            uimg: newImg
                          })  
                          wx.hideToast();
                        }else{
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
                }else{
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
        //启动上传等待中...
            // wx.showToast({
            //   title: '正在上传...',
            //   icon: 'loading',
            //   mask: true,
            //   duration: 10000
            // })
            // console.log(tempFilePaths)
            // wx.uploadFile({
            //   url: '192.168.1.1/home/uploadfilenew',
            //   filePath: tempFilePaths[0],
            //   name: 'uploadfile_ant',
            //   formData: {
            //   },
            //   header: {
            //     "Content-Type": "multipart/form-data"
            //   },
            //   success: function (res) {
            //     var data = JSON.parse(res.data);
            //     //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
            //     console.log(data);
            //   },
            //   fail: function (res) {
            //     wx.hideToast();
            //     wx.showModal({
            //       title: '错误提示',
            //       content: '上传图片失败',
            //       showCancel: false,
            //       success: function (res) { }
            //     })
            //   }
            // });
          }
        })   

      }
    })   
  },
  restHz(val){
    wx.setStorage({
      key: 'userInfo',
      data: val,
      success: y => {
        console.log("成功");
      }
    })
  },
  goEwm(e){
    wx.navigateTo({
      url: '../myEwm/myEwm',
    })
  },
  goRz(e){
    wx.navigateTo({
      url: '../myselfRz/myselfRz',
    })
  },
  // 从业年限
  setY(e) {
    var that = this;
    var newName = e.detail.value;
    wx.request({
      url: 'https://spapi.centaline.com.cn/Users/UpdatePractitionersYears',
      header: { token: that.data.utoken },
      method: "post",
      data: { PractitionersYears: newName },
      success: r => {
        console.log(r);
        if (r.data.code == 1001) {
          that.setData({
            years: newName
          })
        }
      }
    })
  },  
  // 主营小区
  setQ(e) {
    var that = this;
    var newName = e.detail.value;
    wx.request({
      url: 'https://spapi.centaline.com.cn/Users/UpdateMainVillage',
      header: { token: that.data.utoken },
      method: "post",
      data: { MainVillage: newName },
      success: r => {
        console.log(r);
        if (r.data.code == 1001) {
          that.setData({
            area: newName
          })
        }
      }
    })
  },  
  // 个人介绍
  setM(e) {
    var that = this;
    var newName = e.detail.value;
    wx.request({
      url: 'https://spapi.centaline.com.cn/Users/UpdatePersonalIntroduce',
      header: { token: that.data.utoken },
      method: "post",
      data: { PersonalIntroduce: newName },
      success: r => {
        console.log(r);
        if (r.data.code == 1001) {
          that.setData({
            msg: newName
          })
        }
      }
    })
  },  
  setJ(e){
    var that = this;
    // 显示遮罩层 
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      isShow: true
    })
    animation.translateY(0).step()    
    this.setData({
      animationData: animation.export()
    })    
  },
  getTag(e){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/GetShootTagList',
      header: { token: that.data.utoken },
      data: { Type: 2, Recommend: 0, Tags: that.data.goodJ},
      success: r => {
        console.log(r);
        if (r.data.code == 1001) {
          that.setData({
            tagList:r.data.data
          })
        }else{
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
  },
  addOn: function (e) {
    var that = this;
    console.log(e);
      // 多选
      var index = e.currentTarget.dataset.idx;
    if (this.data.tagList[index].isOn == true) {
      this.data.tagList[index].isOn = false;

    } else{
      this.data.tagList[index].isOn = true;
    }
      that.setData({
        tagList: this.data.tagList,
      });
      var tsArr = ""
    for (var i in that.data.tagList) {
      if (that.data.tagList[i].isOn) {
        tsArr += that.data.tagList[i].Name + ","
        }
    }
      that.setData({
        tsMsg: tsArr.substring(0, tsArr.lastIndexOf(','))
      });
  }, 
  show(e){
    this.setData({
      isShow:false
    })
  },
  conf(e){
    this.setData({
      isShow: false
    })    
    this.setData({
      goodJ: this.data.tsMsg
    })
    wx.request({
      url: 'https://spapi.centaline.com.cn/Users/UpdateBusinessGood',
      header: { token: this.data.utoken },
      method:"post",
      data: { BusinessGood: this.data.goodJ },
      success: r => {
        console.log(r);
        if (r.data.code == 1001) {
        }
      }
    })     

  } 
})