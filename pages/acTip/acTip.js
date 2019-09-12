// pages/acTip/acTip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    utoken:"",
    tipList:"",
    ptotal: 0,
    pidx: 2,
    isN:false,
    no:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '数据加载中',
    })    
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          utoken:res.data.Token
        })
        that.getData(1);
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
    if (Math.ceil(that.data.ptotal / 10) >= that.data.pidx) {
      wx.showLoading({
        title: '加载中'
      });
      that.getData(that.data.pidx);
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
  getData:function(num){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateSpecialRemindPageList',
      data: { PageIndex: num, PageSize: 10,},
      header:{
        token:that.data.utoken
      },
      success(res){
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            // tipList: res.data.data.DataList
            ptotal: res.data.data.TotalRecord,
            isN: true
          })
          if (num == 1) {
            that.setData({
              tipList: res.data.data.DataList
            })
          }
          if (num > 1) {
            that.setData({
              tipList: that.data.tipList.push(res.data.data.DataList)
            })
          }
          wx.hideLoading();          
        }

      }
    })
  },
  cancelTip:function(e){
    var that=this;
    wx.showModal({
      title: '取消提醒',
      content: '确定取消提醒吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/UpdateShootEstateSpecialRemindState',
            method:"post",
            header: {
              token: that.data.utoken
            },
            data:{
              Id: e.currentTarget.dataset.id,
              State:false
            },
            success(r){
              console.log(r);
              wx.showToast({
                title: '已取消',
              })              
              that.getData(1);
            }            
          })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  goZtinfo: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../ygInfo/ygInfo?yid=' + e.currentTarget.dataset.id
    })
  },
  del:function(e){
    var that=this;
    wx.showModal({
      title: '删除',
      content: '确定删除该条记录吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/DelShootEstateSpecialRemind',
            // method: "delete",
            header: {
              token: that.data.utoken
            },
            data: {
              Id: e.currentTarget.dataset.id,
            },
            success(r) {
              console.log(r);
              wx.showToast({
                title: '已删除',
              })
              that.getData(1);
            }
          })  
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });      
  }    
})