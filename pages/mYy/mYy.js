// pages/acTip/acTip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role:"",
    yyList:"",
    utoken:"",
    ptotal: 0,
    pidx: 2,
    no: false,
    cPhone: "",
    isN: false,
    myTab:[
      {
        name: '我的预约',
        id: 1
      },       
      {
        name: '客户的预约',
        id: 2
      },           
    ] ,
    tabSub:0 ,
    who:1,
    wdNum:"",
    khNum:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.showLoading({
      title: '数据加载中',
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          utoken: res.data.Token,
          role: res.data.RoleType
        })
        that.getData(1, 1);
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
  onReachBottom: function (e) {
    var that = this;
    if (Math.ceil(that.data.ptotal / 10) >= that.data.pidx) {
      wx.showLoading({
        title: '加载中'
      });
      that.getData(that.data.pidx, that.data.who);
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
  changeNum: function (n) {
    n = n.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");
    return n;
  },	  
  getData:function(num,state){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateReservePageList',
      header:{
        token:that.data.utoken
      },
      data:{
        PageIndex: num, PageSize: 10, Type: state, ShootEstateDirectionType:2
      },
      success(res){
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            // yyList:res.data.data.DataList,
            ptotal: res.data.data.PageList.TotalRecord,
            wdNum: res.data.data.User,
            khNum: res.data.data.Customer,
            isN:true
          })
          if (num == 1) {
            that.setData({
              yyList: res.data.data.PageList.DataList
            })
          }
          if (num > 1) {
            that.setData({
              yyList: that.data.yyList.push(res.data.data.PageList.DataList)
            })
          }
          wx.hideLoading();
        }
      }
    })
  },
  cancelTip: function (e) {
    var that=this;
    wx.showModal({
      title: '取消预约',
      content: '确定取消预约吗？',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/UpdateShootEstateReserveState',
            method:"post",
            header:{token:that.data.utoken},
            data:{
              Id:e.currentTarget.dataset.yid,
              ShootEstateId: e.currentTarget.dataset.hid,
              State:3
            },
            success(r){
              console.log(r);
              if(r.data.code==1001){
                wx.showToast({
                  title: '已取消',
                })
                wx.showLoading({
                  title: '数据加载中',
                })
                that.getData(that.data.pidx-1, that.data.who);
              }else{
                wx.showToast({
                  title: r.data.message,
                  icon:"none"
                })                
              }
            }
          })

        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  goConfir:function(e){
    wx.navigateTo({
      url: '../mYyinfo/mYyinfo?id=' + e.currentTarget.dataset.hid + "&yid=" + e.currentTarget.dataset.yid + "&t=" + this.data.who,
    })
  },
  goHouseYY:function(e){
    wx.navigateTo({
      url: '../mYyinfo/mYyinfo?id=' + e.currentTarget.dataset.hid + "&yid=" + e.currentTarget.dataset.yid+"&t="+this.data.who,
    })
  },
  del:function(){
    var that=this;
  } ,
  changeS(e){
    wx.showLoading({
      title: '',
    })
    var that=this;
    var id = e.currentTarget.dataset.s
    var idx=e.currentTarget.dataset.idx
    that.setData({
      tabSub:idx,
      who:id
    })
    that.getData(1,id)
  }  
})