// pages/goMyhouse/goMyhouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statuList:["已上架","待上架","已成交","已失效"],
    statuSub:0,
    sId:4,
    utoken:"",
    house:"",
    ptotal:0,
    pidx:2,
    pval: "",
    no: false,
    ysjNum:"",
    dsjNum:"",
    ycjNum:"",
    ysxNum:"",
    isN:false,
    isCj:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: ''
    });    
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data.Token)
        that.setData({
          utoken: res.data.Token
        })
        that.getData(4,1);
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
    var that = this;
    console.log(that.data.ptotal);
    if (Math.ceil(that.data.ptotal / 10) >= that.data.pidx) {
      wx.showLoading({
        title: '加载中'
      });
      that.getData(that.data.sId,that.data.pidx);
      that.setData({
        pidx: that.data.pidx + 1
      })
      // setTimeout(function () {
      //   wx.hideLoading();
      // }, 1000)
    } else {
      that.setData({
        no: true
      })
    }  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getData(e,num){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateBrokerStoreSalePageList',
      header:{token:that.data.utoken},
      method:"post",
      data:{
        State:e,
        PageIndex: num,
        PageSize: 10,
      },
      success:res=>{
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            ptotal: res.data.data.TotalRecord,
            isN: true,
            // house:res.data.data.DataList
          })
          if (num == 1) {
            that.setData({
              house: res.data.data.DataList
            })
            wx.hideLoading()
          }
          if (num > 1) {
            that.setData({
              house: that.data.house.concat(res.data.data.DataList)
            })
            wx.hideLoading()
          }
          if(that.data.sId==6){
            that.setData({
              isCj: true
            })
          }
        }else{
          wx.showModal({
            title: '错误提示',
            content: '登录信息已失效，请重新登录~',
            showCancel: false,
            success: function (res) { 
              wx.navigateTo({
                url: '../login/login',
              })
            }
          })          
        }
        setTimeout(function () {
          wx.hideLoading();
        }, 1000)
      }
    })
  },
  changeState(e){
    var that=this;
    var msg = e.currentTarget.dataset
    var tip="";
    if (msg.t==3){
      tip="确认下架该房源？"
      wx.showModal({
        title: '提示',
        content: tip,
        success: r => {
          if (r.confirm) {
            wx.showLoading({
              title: '',
              icon: "none"
            })            
            wx.request({
              url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/UpdateShootEstateState',
              header: { token: that.data.utoken },
              method: "post",
              data: {
                State: 3,
                Type: 1,
                Id: msg.id
              },
              success: res => {
                console.log(res);
                if (res.data.code == 1001) {
                  setTimeout(function(){
                    that.getData(4, 1);
                    wx.showToast({
                      title: '下架成功',
                    })                    
                  },1000)

                } else {
                  wx.showModal({
                    title: '错误提示',
                    content: '登录信息已失效，请重新登录~',
                    showCancel: false,
                    success: function (res) {
                      wx.navigateTo({
                        url: '../login/login',
                      })
                    }
                  })
                }
              }
            })
          } else if (r.cancel) {
            console.log('用户点击取消')
          }
        }
      })      
    } else if (msg.t == 4){
      tip = "确认上架该房源？"
      wx.showModal({
        title: '提示',
        content: tip,
        success: r => {
          if (r.confirm) {
            wx.showLoading({
              title: '',
              icon: "none"
            })            
            wx.request({
              url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/UpdateShootEstateState',
              header: { token: that.data.utoken },
              method: "post",
              data: {
                State: 4,
                Type: 1,
                Id: msg.id
              },
              success: res => {
                console.log(res);
                if (res.data.code == 1001) {
                  setTimeout(function () {
                    that.getData(3, 1);
                    wx.showToast({
                      title: '上架成功',
                    })                    
                  }, 1000)

                } else {
                  wx.showModal({
                    title: '错误提示',
                    content: '登录信息已失效，请重新登录~',
                    showCancel: false,
                    success: function (res) {
                      wx.navigateTo({
                        url: '../login/login',
                      })
                    }
                  })
                }
              }
            })
          } else if (r.cancel) {
            console.log('用户点击取消')
          }
        }
      })      
    } else if (msg.t == 7) {
      tip = "确认该房源已失效？"
      wx.showModal({
        title: '提示',
        content: tip,
        success: r => {
          if (r.confirm) {
            wx.showLoading({
              title: '',
              icon: "none"
            })            
            wx.request({
              url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/UpdateShootEstateState',
              header: { token: that.data.utoken },
              method: "post",
              data: {
                State: 7,
                Type: 1,
                Id: msg.id
              },
              success: res => {
                console.log(res);
                if (res.data.code == 1001) {
                  setTimeout(function () {
                    that.getData(3, 1);
                    wx.showToast({
                      title: '设置失效成功',
                    })
                  }, 1000)

                } else {
                  wx.showModal({
                    title: '错误提示',
                    content: '登录信息已失效，请重新登录~',
                    showCancel: false,
                    success: function (res) {
                      wx.navigateTo({
                        url: '../login/login',
                      })
                    }
                  })
                }
              }
            })
          } else if (r.cancel) {
            console.log('用户点击取消')
          }
        }
      })      
    }

  },
  selMsg(e){
    wx.showLoading({
      title: '',
    })
    var index = e.currentTarget.dataset.idx;
    var name=e.currentTarget.dataset.name;
    var that=this;
    if(name=="已上架"){
      that.setData({
        statuSub: index,
        sId:4
      })   
      that.getData(4,1);   
    } else if (name == "待上架"){
      that.setData({
        statuSub: index,
        sId: 3
      })   
      that.getData(3,1);   
    } else if (name == "已成交") {
      that.setData({
        statuSub: index,
        sId: 6
      })
      that.getData(6,1);
    } else if (name == "已失效") {
      that.setData({
        statuSub: index,
        sId: 7
      })
      that.getData(7,1);
    }
  },
  getReason(e){
    wx.showModal({
      title: '审核未通过原因',
      content: '上架盘源存在虚假信息，请改正后重新上架~',
      showCancel:false
    })
  },
  soldOut(e){
    wx.showModal({
      title: '下架房源',
      content:"确定下架房源吗？",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goCj(e){
    var id = e.currentTarget.dataset.id;
    var c = e.currentTarget.dataset.c;
    wx.navigateTo({
      url: '../goHousecj/goHousecj?id='+id+'&c='+c,
    })
  },
  goEdit(e){
    var id = e.currentTarget.dataset.id
    var c = e.currentTarget.dataset.c;
    wx.setStorage({
      key: 'editMsg',
      data: { Id: id, cState: c},
      success:res=>{
        wx.navigateTo({
          url: '../goEdit/goEdit',
        })
      }
    })
  },
  goEditmsg(e) {
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goEditmsg/goEditmsg?id='+id,
    })
  },
  goHouseInfo: function (e) {
    if (e.currentTarget.dataset.s==4){
      wx.navigateTo({
        url: '../houseInfo/houseInfo?id=' + e.currentTarget.dataset.id,
      })
    }
  },    
  cancel(e){
    wx.showModal({
      title: '取消审核',
      content: "确定取消该房源审核吗？",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })    
  },
  del(e) {
    var that=this;
    var cId=e.currentTarget.dataset.id
    wx.showModal({
      title: '删除房源',
      content: "确定删除该房源审核吗？",
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/DelShootEstate?id='+cId,
            method:'delete',
            header: { token: that.data.utoken },
            success:res=>{
              console.log(res);
              that.getData(7,1);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }  
})