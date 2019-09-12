Page({

  /**
   * 页面的初始数据
   */
  data: {
    nxMsg: [],
    nx: [{
        name: "刚需笋盘",
        isOn: false,
        type: "nx"
      },
      {
        name: "价格低",
        isOn: false,
        type: "nx"
      },
      {
        name: "近地铁",
        isOn: false,
        type: "nx"
      },
      {
        name: "满五唯一",
        isOn: false,
        type: "nx"
      },
      {
        name: "红本在手",
        isOn: false,
        type: "nx"
      },
      {
        name: "名校学区",
        isOn: false,
        type: "nx"
      },
      {
        name: "南北通透",
        isOn: false,
        type: "nx"
      }
    ],
    fmPic: [],
    fmTemp: [],
    slPic: [],
    slTemp: [],
    hxPic: [],
    hxTemp: [],
    zbPic: [],
    zbTemp: [],
    spMsg: "",
    hzMsg: "",
    houseData: {},
    isShow: false,
    isHide: false,
    showT: false,
    showS: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    wx.getStorage({
      key: 'houseData',
      success: function(res) {
        if (res.data.ShootEvaluate) {
          that.setData({
            nxMsg: res.data.ShootEstateTag,
            spMsg: res.data.ShootEvaluate,
            hzMsg: res.data.CooperationScheme,
          })
          // 房源标签
          for (var i in that.data.nx) {
            console.log(res.data.ShootEstateTag.indexOf(that.data.nx[i].name));
            if (res.data.ShootEstateTag.indexOf(that.data.nx[i].name) > -1) {
              that.data.nx[i].isOn = true
              that.setData({
                nx: that.data.nx
              })
            }
          }
          // 房源图片
          for (var i in res.data.ShootEstatePicAllList) {
            if (res.data.ShootEstatePicAllList[i].Type == 2) {
              that.data.fmPic.push(res.data.ShootEstatePicAllList[i])
            } else if (res.data.ShootEstatePicAllList[i].Type == 3) {
              that.data.slPic.push(res.data.ShootEstatePicAllList[i])
            } else if (res.data.ShootEstatePicAllList[i].Type == 4) {
              that.data.hxPic.push(res.data.ShootEstatePicAllList[i])
            } else if (res.data.ShootEstatePicAllList[i].Type == 8) {
              that.data.zbPic.push(res.data.ShootEstatePicAllList[i])
            }
          }
          that.setData({
            fmPic: that.data.fmPic,
            slPic: that.data.slPic,
            hxPic: that.data.hxPic,
            zbPic: that.data.zbPic,
          })
        }
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  addOn(e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    var arrL = [];
    that.data.nx[idx].isOn = !that.data.nx[idx].isOn;
    that.setData({
      nx: that.data.nx
    })
    for (var i in that.data.nx) {
      if (that.data.nx[i].isOn) {
        if (arrL.length < 5) {
          arrL.push(that.data.nx[i].name)
        } else {
          wx.showToast({
            title: '最多选5个标签',
            icon: 'none'
          })
          that.data.nx[i].isOn = false
          that.setData({
            nx: that.data.nx
          })
        }
      }
    }
    console.log(arrL);
    that.setData({
      nxMsg: String(arrL)
    })
    console.log(that.data.nxMsg);
  },
  // selectPic(e){
  //   var that=this;
  //   wx.chooseImage({
  //     count: 3,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success(res) {
  //       // that.data.slPic = slPic.length <= 3 ? slPic : slPic.slice(0, 3)
  //       if (e.target.dataset.t == "fm") {
  //         //启动上传等待中...
  //         wx.showToast({
  //           title: '正在上传...',
  //           icon: 'loading',
  //           duration: 30000
  //         })                
  //         console.log(res.tempFilePaths)
  //         // tempFilePath可以作为img标签的src属性显示图片
  //         // const tempFilePaths = that.data.fmTemp.concat(res.tempFilePaths);
  //         const tempFilePaths = res.tempFilePaths;
  //         that.setData({
  //           fmTemp: tempFilePaths
  //         })
  //         // console.log(that.data.fmTemp)
  //         var baseArr=[];
  //         for (var i=0;i< that.data.fmTemp.length;i++){
  //           wx.getFileSystemManager().readFile({
  //             filePath: that.data.fmTemp[i], //选择图片返回的相对路径
  //             encoding: 'base64', //编码格式
  //             success: r => { //成功的回调
  //               // console.log('data:image/png;base64,' + r.data);
  //               var baseUrl = 'data:image/jpg;base64,' + r.data;
  //               baseArr.push(baseUrl);
  //               console.log(baseArr);

  //               // console.log(that.data.fmPic);
  //               if (baseArr.length == that.data.fmTemp.length) {
  //                 wx.request({
  //                   // url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgListByBase64',
  //                   url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgListShootEstateByBase64',
  //                   method: "post",
  //                   data: {
  //                     ImgBase64: baseArr,
  //                     Type:2
  //                   },
  //                   success: d => {
  //                     console.log(d);
  //                     if (d.data.code == 1001) {
  //                       that.setData({
  //                         fmPic: that.data.fmPic.concat(d.data.data)
  //                       })  
  //                       wx.hideToast();
  //                       console.log(that.data.fmPic)
  //                     } else {
  //                       wx.hideToast();
  //                       wx.showModal({
  //                         title: '错误提示',
  //                         content: '上传图片失败,请稍后再试~',
  //                         showCancel: false,
  //                         success: function (res) { }
  //                       })
  //                     }
  //                   }
  //                 })
  //               }


  //             }
  //           })
  //         } 



  //       }else if (e.target.dataset.t=="sl"){
  //         //启动上传等待中...
  //         wx.showToast({
  //           title: '正在上传...',
  //           icon: 'loading',
  //           duration: 30000
  //         })      

  //         // tempFilePath可以作为img标签的src属性显示图片
  //         const tempFilePaths = res.tempFilePaths;          
  //         that.setData({
  //           slTemp: tempFilePaths
  //         })
  //         var baseArr = [];
  //         for (var i = 0; i < that.data.slTemp.length; i++) {
  //           wx.getFileSystemManager().readFile({
  //             filePath: that.data.slTemp[i], //选择图片返回的相对路径
  //             encoding: 'base64', //编码格式
  //             success: r => { //成功的回调
  //               // console.log('data:image/png;base64,' + r.data);
  //               var baseUrl = 'data:image/jpg;base64,' + r.data;
  //               baseArr.push(baseUrl);
  //               console.log(baseArr);

  //               // console.log(that.data.fmPic);
  //               if (baseArr.length == that.data.slTemp.length) {
  //                 wx.request({
  //                   url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgListShootEstateByBase64',
  //                   method: "post",
  //                   data: {
  //                     ImgBase64: baseArr,
  //                     Type: 3
  //                   },
  //                   success: d => {
  //                     console.log(d);
  //                     if (d.data.code == 1001) {
  //                       that.setData({
  //                         slPic: that.data.slPic.concat(d.data.data)
  //                       })
  //                       wx.hideToast();
  //                     } else {
  //                       wx.hideToast();
  //                       wx.showModal({
  //                         title: '错误提示',
  //                         content: '上传图片失败,请稍后再试~',
  //                         showCancel: false,
  //                         success: function (res) { }
  //                       })
  //                     }
  //                   }
  //                 })
  //               }


  //             }
  //           })
  //         }
  //       } else if (e.target.dataset.t == "hx"){
  //         //启动上传等待中...
  //         wx.showToast({
  //           title: '正在上传...',
  //           icon: 'loading',
  //           duration: 30000
  //         })      

  //         // tempFilePath可以作为img标签的src属性显示图片
  //         const tempFilePaths = res.tempFilePaths;          
  //         that.setData({
  //           hxTemp: tempFilePaths
  //         })  
  //         var baseArr = [];
  //         for (var i = 0; i < that.data.hxTemp.length; i++) {
  //           wx.getFileSystemManager().readFile({
  //             filePath: that.data.hxTemp[i], //选择图片返回的相对路径
  //             encoding: 'base64', //编码格式
  //             success: r => { //成功的回调
  //               // console.log('data:image/png;base64,' + r.data);
  //               var baseUrl = 'data:image/jpg;base64,' + r.data;
  //               baseArr.push(baseUrl);
  //               console.log(baseArr);

  //               // console.log(that.data.fmPic);
  //               if (baseArr.length == that.data.hxTemp.length) {
  //                 wx.request({
  //                   url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgListShootEstateByBase64',
  //                   method: "post",
  //                   data: {
  //                     ImgBase64: baseArr,
  //                     Type: 4
  //                   },
  //                   success: d => {
  //                     console.log(d);
  //                     if (d.data.code == 1001) {
  //                       that.setData({
  //                         hxPic: that.data.hxPic.concat(d.data.data)
  //                       })
  //                       wx.hideToast();
  //                     } else {
  //                       wx.hideToast();
  //                       wx.showModal({
  //                         title: '错误提示',
  //                         content: '上传图片失败,请稍后再试~',
  //                         showCancel: false,
  //                         success: function (res) { }
  //                       })
  //                     }
  //                   }
  //                 })
  //               }


  //             }
  //           })
  //         }                  
  //       } else if (e.target.dataset.t == "zb") {
  //         //启动上传等待中...
  //         wx.showToast({
  //           title: '正在上传...',
  //           icon: 'loading',
  //           duration: 30000
  //         })      

  //         // tempFilePath可以作为img标签的src属性显示图片
  //         const tempFilePaths = res.tempFilePaths;          
  //         that.setData({
  //           zbTemp: tempFilePaths
  //         })
  //         var baseArr = [];
  //         for (var i = 0; i < that.data.zbTemp.length; i++) {
  //           wx.getFileSystemManager().readFile({
  //             filePath: that.data.zbTemp[i], //选择图片返回的相对路径
  //             encoding: 'base64', //编码格式
  //             success: r => { //成功的回调
  //               // console.log('data:image/png;base64,' + r.data);
  //               var baseUrl = 'data:image/jpg;base64,' + r.data;
  //               baseArr.push(baseUrl);
  //               console.log(baseArr);

  //               // console.log(that.data.fmPic);
  //               if (baseArr.length == that.data.zbTemp.length) {
  //                 wx.request({
  //                   url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgListShootEstateByBase64',
  //                   method: "post",
  //                   data: {
  //                     ImgBase64: baseArr,
  //                     Type: 8
  //                   },
  //                   success: d => {
  //                     console.log(d);
  //                     if (d.data.code == 1001) {
  //                       that.setData({
  //                         zbPic: that.data.zbPic.concat(d.data.data)
  //                       })
  //                       wx.hideToast();
  //                     } else {
  //                       wx.hideToast();
  //                       wx.showModal({
  //                         title: '错误提示',
  //                         content: '上传图片失败,请稍后再试~',
  //                         showCancel: false,
  //                         success: function (res) { }
  //                       })
  //                     }
  //                   }
  //                 })
  //               }


  //             }
  //           })
  //         }          
  //       }
  //     }
  //   })    
  // },


  selectPic(e) {
    var that = this;

    // that.data.slPic = slPic.length <= 3 ? slPic : slPic.slice(0, 3)
    if (e.target.dataset.t == "fm") {
      wx.chooseImage({
        count: 3,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          //启动上传等待中...
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            duration: 30000
          })
          console.log(res.tempFilePaths)
          // tempFilePath可以作为img标签的src属性显示图片
          // const tempFilePaths = that.data.fmTemp.concat(res.tempFilePaths);
          const tempFilePaths = res.tempFilePaths;
          that.setData({
            fmTemp: tempFilePaths
          })
          // console.log(that.data.fmTemp)
          var baseArr = [];
          for (var i = 0; i < that.data.fmTemp.length; i++) {
            wx.getFileSystemManager().readFile({
              filePath: that.data.fmTemp[i], //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: r => { //成功的回调
                // console.log('data:image/png;base64,' + r.data);
                var baseUrl = 'data:image/jpg;base64,' + r.data;
                baseArr.push(baseUrl);
                console.log(baseArr);

                // console.log(that.data.fmPic);
                if (baseArr.length == that.data.fmTemp.length) {
                  wx.request({
                    // url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgListByBase64',
                    url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgListShootEstateByBase64',
                    method: "post",
                    data: {
                      ImgBase64: baseArr,
                      Type: 2
                    },
                    success: d => {
                      console.log(d);
                      if (d.data.code == 1001) {
                        that.setData({
                          fmPic: that.data.fmPic.concat(d.data.data)
                        })
                        wx.hideToast();
                        console.log(that.data.fmPic)
                      } else {
                        wx.hideToast();
                        wx.showModal({
                          title: '错误提示',
                          content: '上传图片失败,请稍后再试~',
                          showCancel: false,
                          success: function(res) {}
                        })
                      }
                    }
                  })
                }


              }
            })
          }
        }
      })


    } else if (e.target.dataset.t == "sl") {
      wx.chooseImage({
        count: 3,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          //启动上传等待中...
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            duration: 30000
          })

          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          that.setData({
            slTemp: tempFilePaths
          })
          var baseArr = [];
          for (var i = 0; i < that.data.slTemp.length; i++) {
            wx.getFileSystemManager().readFile({
              filePath: that.data.slTemp[i], //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: r => { //成功的回调
                // console.log('data:image/png;base64,' + r.data);
                var baseUrl = 'data:image/jpg;base64,' + r.data;
                baseArr.push(baseUrl);
                console.log(baseArr);

                // console.log(that.data.fmPic);
                if (baseArr.length == that.data.slTemp.length) {
                  wx.request({
                    url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgListShootEstateByBase64',
                    method: "post",
                    data: {
                      ImgBase64: baseArr,
                      Type: 3
                    },
                    success: d => {
                      console.log(d);
                      if (d.data.code == 1001) {
                        that.setData({
                          slPic: that.data.slPic.concat(d.data.data)
                        })
                        wx.hideToast();
                      } else {
                        wx.hideToast();
                        wx.showModal({
                          title: '错误提示',
                          content: '上传图片失败,请稍后再试~',
                          showCancel: false,
                          success: function(res) {}
                        })
                      }
                    }
                  })
                }


              }
            })
          }

        }
      })

    } else if (e.target.dataset.t == "hx") {
      wx.chooseImage({
        count: 3,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          //启动上传等待中...
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            duration: 30000
          })

          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          that.setData({
            hxTemp: tempFilePaths
          })
          var baseArr = [];
          for (var i = 0; i < that.data.hxTemp.length; i++) {
            wx.getFileSystemManager().readFile({
              filePath: that.data.hxTemp[i], //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: r => { //成功的回调
                // console.log('data:image/png;base64,' + r.data);
                var baseUrl = 'data:image/jpg;base64,' + r.data;
                baseArr.push(baseUrl);
                console.log(baseArr);

                // console.log(that.data.fmPic);
                if (baseArr.length == that.data.hxTemp.length) {
                  wx.request({
                    url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgListShootEstateByBase64',
                    method: "post",
                    data: {
                      ImgBase64: baseArr,
                      Type: 4
                    },
                    success: d => {
                      console.log(d);
                      if (d.data.code == 1001) {
                        that.setData({
                          hxPic: that.data.hxPic.concat(d.data.data)
                        })
                        wx.hideToast();
                      } else {
                        wx.hideToast();
                        wx.showModal({
                          title: '错误提示',
                          content: '上传图片失败,请稍后再试~',
                          showCancel: false,
                          success: function(res) {}
                        })
                      }
                    }
                  })
                }


              }
            })
          }

        }
      })

    } else if (e.target.dataset.t == "zb") {


      wx.chooseImage({
        count: 3,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {

          //启动上传等待中...
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            duration: 30000
          })

          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          that.setData({
            zbTemp: tempFilePaths
          })
          var baseArr = [];
          for (var i = 0; i < that.data.zbTemp.length; i++) {
            wx.getFileSystemManager().readFile({
              filePath: that.data.zbTemp[i], //选择图片返回的相对路径
              encoding: 'base64', //编码格式
              success: r => { //成功的回调
                // console.log('data:image/png;base64,' + r.data);
                var baseUrl = 'data:image/jpg;base64,' + r.data;
                baseArr.push(baseUrl);
                console.log(baseArr);

                // console.log(that.data.fmPic);
                if (baseArr.length == that.data.zbTemp.length) {
                  wx.request({
                    url: 'https://spapi.centaline.com.cn/SPXinFangApi/System/PostImgListShootEstateByBase64',
                    method: "post",
                    data: {
                      ImgBase64: baseArr,
                      Type: 8
                    },
                    success: d => {
                      console.log(d);
                      if (d.data.code == 1001) {
                        that.setData({
                          zbPic: that.data.zbPic.concat(d.data.data)
                        })
                        wx.hideToast();
                      } else {
                        wx.hideToast();
                        wx.showModal({
                          title: '错误提示',
                          content: '上传图片失败,请稍后再试~',
                          showCancel: false,
                          success: function(res) {}
                        })
                      }
                    }
                  })
                }


              }
            })
          }

        }
      })


    }

  },


  hideLoad() {
    wx.hideToast()
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    if (e.target.dataset.t == "fm") {
      this.data.fmPic.splice(idx, 1)
      this.setData({
        fmPic: this.data.fmPic
      })
    } else if (e.target.dataset.t == "sl") {
      this.data.slPic.splice(idx, 1)
      this.setData({
        slPic: this.data.slPic
      })
    } else if (e.target.dataset.t == "hx") {
      this.data.hxPic.splice(idx, 1)
      this.setData({
        hxPic: this.data.hxPic
      })
    } else if (e.target.dataset.t == "zb") {
      this.data.zbPic.splice(idx, 1)
      this.setData({
        zbPic: this.data.zbPic
      })
    }
  },

  handleImagePreview(e) {
    console.log(e);
    const idx = e.target.dataset.idx
    if (e.target.dataset.t == "fm") {
      var pic = this.data.fmPic
      var images = [];
      for (var i in pic) {
        images.push(pic[i].Url)
      }
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    }
    if (e.target.dataset.t == "sl") {
      var pic = this.data.slPic
      var images = [];
      for (var i in pic) {
        images.push(pic[i].Url)
      }
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    }
    if (e.target.dataset.t == "hx") {
      var pic = this.data.hxPic
      var images = [];
      for (var i in pic) {
        images.push(pic[i].Url)
      }
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    }
    if (e.target.dataset.t == "zb") {
      var pic = this.data.zbPic
      var images = [];
      for (var i in pic) {
        images.push(pic[i].Url)
      }
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    }
  },
  goNext(e) {
    var arr = this.data.fmPic.concat(this.data.slPic).concat(this.data.hxPic).concat(this.data.zbPic);
    console.log(arr);
    var that = this;
    if (that.data.nxMsg == '') {
      wx.showToast({
        title: '请选择房源标签',
        icon: 'none'
      })
    } else if (that.data.fmPic.length != 3) {
      wx.showToast({
        title: '封面图必须上传三张',
        icon: 'none'
      })
    } else if (that.data.slPic.length == 0) {
      wx.showToast({
        title: '请上传室内图',
        icon: 'none'
      })
    } else if (that.data.hxPic.length == 0) {
      wx.showToast({
        title: '请上传户型图',
        icon: 'none'
      })
    } else if (that.data.zbPic.length == 0) {
      wx.showToast({
        title: '请上传周边环境图',
        icon: 'none'
      })
    } else if (that.data.spMsg == '') {
      wx.showToast({
        title: '请填写你对房源的评价',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '',
      })
      wx.getStorage({
        key: 'houseData',
        success: function(res) {
          var list = res.data;
          list.ShootEstateTag = that.data.nxMsg;
          list.ShootEstatePicAllList = arr;
          list.ShootEvaluate = that.data.spMsg;
          list.CooperationScheme = that.data.hzMsg;
          wx.setStorage({
            key: 'houseData',
            data: list,
            success: r => {
              wx.hideLoading()
              wx.navigateTo({
                url: '../pubFinal/pubFinal',
              })
            }
          })
        },
      })
    }
  },
  getSp(e) {
    console.log(e);
    this.setData({
      spMsg: e.detail.value
    })
  },
  getHz(e) {
    console.log(e);
    this.setData({
      hzMsg: e.detail.value,
      showT: false
    })
  },
  show(e) {
    var that = this
    that.data.isShow = !that.data.isShow
    that.data.isHide = !that.data.isHide
    that.setData({
      isShow: that.data.isShow,
      isHide: that.data.isHide
    })
  },
  showT() {
    this.setData({
      showT: true
    })
  },
  showS() {
    this.setData({
      showS: true
    })
  }
})