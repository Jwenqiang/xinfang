// pages/pubTwo/pubTwo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex:"",
    hxInfo: "",
    hxArr: [
        ['1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室', '9室'], 
        ['0厅', '1厅', '2厅', '3厅', '4厅', '5厅', '6厅', '7厅', '8厅', '9厅'], 
        ['0卫', '1卫', '2卫', '3卫', '4卫', '5卫', '6卫', '7卫', '8卫', '9卫',]
      ],
    mj:""  ,
    yj:"",
    qgj:"",
    nxSub:-1,
    nxMsg:"",
    wySub: -1,
    wyMsg: '-1',   
    wyInfo: '',   
    dySub: -1,
    dyMsg: '-1',  
    hbSub: -1,
    hbMsg: '-1',    
    zxSub: -1,
    zxMsg: "",   
    cxInfo:"",         
    cxArr: ["东", "南", "西", "北", "东南", "西南", "东北", "西北"],
    wyArr: ["住宅", "公寓", "别墅", "商铺", "写字楼", "洋房", "商住楼", "综合体", "统建房", "福利房","军产房"],
    currentTime:"",
    jyInfo: "",
    nx: [
      { name: "不满两年", value: '1', isOn: false, type: "nx" },
      { name: "满两年", value: '2', isOn: false, type: "nx" },
      { name: "满五年", value: '3', isOn: false, type: "nx" }
    ], 
    wy: [
      { name: "唯一住房", value: true, isOn: false, type: "wy" },
      { name: "不唯一住房", value: false, isOn: false, type: "wy" }
    ], 
    dy: [
      { name: "有抵押", value: true, isOn: false, type: "dy" },
      { name: "无抵押", value: false, isOn: false, type: "dy" }
    ],  
    hb: [
      { name: "有红本", value: true, isOn: false, type: "hb" },
      { name: "无红本", value: false, isOn: false, type: "hb" }
    ], 
    zx: [
      { name: "毛坯",value:"1", isOn: false, type: "zx" },
      { name: "简装", value: "2", isOn: false, type: "zx" },
      { name: "精装", value: "3", isOn: false, type: "zx" },
      { name: "豪装", value: "4", isOn: false, type: "zx" }
    ], 
    houseData:{} ,

    cqArr: ["40年", "50年", "70年", "999年", "永久权限"],
    cqInfo:"",
    ndArr: [],
    ndInfo:'',
    xq:""                   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var d = new Date()
    var day = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()    
    this.setData({
      currentTime: year + "-" + month+"-"+day
    })
    this.getY();

// 显示记录数据
    var that = this;
    wx.getStorage({
      key: 'houseData',
      success: function (res) {
        if (res.data.ShootEstateRenovation){
        that.setData({
          hxInfo: res.data.CountF + "室" + res.data.CountT + "厅" + res.data.CountW + "卫",
          mj: res.data.ProductionAcreage,
          cxInfo: res.data.Orientation,
          wyInfo: res.data.PropertyType,
          cqInfo: res.data.PropertyYears,
          ndInfo: res.data.BuildYears,
          jyInfo: res.data.TransactionTime,
          xq: res.data.MatchingSchool,
          yj: res.data.OriginalSalePrice,
          qgj: res.data.BuySalePrice,
          nxSub: res.data.PurchaseYears - 1,
          nxMsg: res.data.PurchaseYears,
          wyMsg: res.data.IsOnly,
          dyMsg: res.data.IsMortgage,
          hbMsg: res.data.IsRedbook,
          zxSub: res.data.ShootEstateRenovation - 1,
          zxMsg: res.data.ShootEstateRenovation,
        })
        // 物业类型
        if (res.data.PropertyType == 1) {
          that.setData({
            wyInfo: '住宅'
          })
        } else if (res.data.PropertyType == 2) {
          that.setData({
            wyInfo: '公寓'
          })
        } else if (res.data.PropertyType == 3) {
          that.setData({
            wyInfo: '别墅'
          })
        } else if (res.data.PropertyType == 4) {
          that.setData({
            wyInfo: '商铺'
          })
        } else if (res.data.PropertyType == 5) {
          that.setData({
            wyInfo: '写字楼'
          })
        } else if (res.data.PropertyType == 6) {
          that.setData({
            wyInfo: '洋房'
          })
        } else if (res.data.PropertyType == 7) {
          that.setData({
            wyInfo: '商住楼'
          })
        } else if (res.data.PropertyType == 8) {
          that.setData({
            wyInfo: '综合体'
          })
        } else if (res.data.PropertyType == 9) {
          that.setData({
            wyInfo: '统建房'
          })
        } else if (res.data.PropertyType == 10) {
          that.setData({
            wyInfo: '福利房'
          })
        } else if (res.data.PropertyType == 11) {
          that.setData({
            wyInfo: '军产房'
          })
        }
        // 是否唯一  true false
        if (res.data.IsOnly) {
          that.setData({
            wySub: 0
          })
        } else {
          that.setData({
            wySub: 1
          })
        }
        // 有无抵押  true false
        if (res.data.IsMortgage) {
          that.setData({
            dySub: 0
          })
        } else {
          that.setData({
            dySub: 1
          })
        }
        // 红本在手  true false
        if (res.data.IsRedbook) {
          that.setData({
            hbSub: 0
          })
        } else {
          that.setData({
            hbSub: 1
          })
        }
        }
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
  getY(){
    var that=this;
    var cYear = new Date().getFullYear();
    console.log(cYear);
    var year=[];
    for (var i = cYear;i>1929;i--){
      year.push(i);
    }
    that.setData({
      ndArr:year
    })
  },
  hxMsg:function(e){
    console.log(e);
    var info = this.data.hxArr[0][e.detail.value[0]]+ this.data.hxArr[1][e.detail.value[1]] + this.data.hxArr[2][e.detail.value[2]];
    console.log(info);
    this.setData({
      multiIndex: e.detail.value,
      hxInfo: info
    })
  },
  cxMsg(e){
    console.log(e);
    this.setData({
      cxInfo: this.data.cxArr[e.detail.value]
    })
  },
  wyMsg(e) {
    console.log(e);
    var val = e.detail.value;
    console.log(val);
    this.setData({
      wyInfo: this.data.wyArr[e.detail.value]
    })
  },  
  jyMsg(e) {
    console.log(e);
    this.setData({
      jyInfo: e.detail.value
    })
  }, 
  ndMsg(e) {
    console.log(e);
    this.setData({
      ndInfo: this.data.ndArr[e.detail.value]
    })
  },
  cqMsg(e) {
    console.log(e);
    this.setData({
      cqInfo: this.data.cqArr[e.detail.value]
    })
  },         
  setNum:function(e){
    console.log(e);
    if (e.currentTarget.dataset.t=="mj"){
      this.setData({
        mj: e.detail.value
      })
    } else if (e.currentTarget.dataset.t == "xq"){
      this.setData({
        xq: e.detail.value
      })
    } else if (e.currentTarget.dataset.t == "yj") {
      this.setData({
        yj: e.detail.value
      })
    } else if (e.currentTarget.dataset.t == "qgj") {
      this.setData({
        qgj: e.detail.value
      })
    }

  },
  addOn: function (e) {
    var that = this;
    console.log(e);
    if (e.currentTarget.dataset.type == "nx") {
      that.setData({
        nxSub: e.currentTarget.dataset.idx
      })
      if (that.data.nxSub == e.currentTarget.dataset.idx) {
        that.setData({
          nxMsg: e.currentTarget.dataset.name
        })
      }
    }else if (e.currentTarget.dataset.type == "wy") {
      that.setData({
        wySub: e.currentTarget.dataset.idx
      })
      if (that.data.wySub == e.currentTarget.dataset.idx) {
        that.setData({
          wyMsg: e.currentTarget.dataset.name
        })
      }
    } else if (e.currentTarget.dataset.type == "dy") {
      that.setData({
        dySub: e.currentTarget.dataset.idx
      })
      if (that.data.dySub == e.currentTarget.dataset.idx) {
        that.setData({
          dyMsg: e.currentTarget.dataset.name
        })
      }
    } else if (e.currentTarget.dataset.type == "hb") {
      that.setData({
        hbSub: e.currentTarget.dataset.idx
      })
      if (that.data.hbSub == e.currentTarget.dataset.idx) {
        that.setData({
          hbMsg: e.currentTarget.dataset.name
        })
      }
    } else if (e.currentTarget.dataset.type == "zx") {
      that.setData({
        zxSub: e.currentTarget.dataset.idx
      })
      if (that.data.zxSub == e.currentTarget.dataset.idx) {
        that.setData({
          zxMsg: e.currentTarget.dataset.name
        })
      }
    }
  }, 
  goNext(){
    var msg = this.data.hxInfo + "," + this.data.mj + "," + this.data.cxInfo + "," + this.data.wyInfo + "," + this.data.jyInfo + "," + this.data.yj + "," + this.data.qgj + "," + this.data.nxMsg + "," + this.data.wyMsg + "," + this.data.dyMsg + "," + this.data.hbMsg + "," + this.data.zxMsg;
    if (this.data.hxInfo==''){
      wx.showToast({
        title: '请选择户型',
        icon: 'none'
      })       
    } else if (this.data.mj==''){
      wx.showToast({
        title: '请填写面积',
        icon: 'none'
      })        
    } else if (this.data.cxInfo == '') {
      wx.showToast({
        title: '请选择朝向',
        icon: 'none'
      })
    } else if (this.data.wyInfo == '') {
      wx.showToast({
        title: '请选择物业类型',
        icon: 'none'
      })
    } else if (this.data.cqInfo == '') {
      wx.showToast({
        title: '请选择产权年限',
        icon: 'none'
      })
    } else if (this.data.ndInfo == '') {
      wx.showToast({
        title: '请选择建成年代',
        icon: 'none'
      })
    } else if (this.data.jyInfo == '') {
      wx.showToast({
        title: '请选择上次交易时间',
        icon: 'none'
      })
    } else if (this.data.yj == '') {
      wx.showToast({
        title: '请填写原价格',
        icon: 'none'
      })
    } else if (this.data.qgj == '') {
      wx.showToast({
        title: '请填写抢购价格',
        icon: 'none'
      })
    } else if (this.data.nxMsg == '') {
      wx.showToast({
        title: '请选择购置年限',
        icon: 'none'
      })
    } else if (this.data.wyMsg == '-1') {
      console.log(this.data.wyMsg);
      wx.showToast({
        title: '请选择是否唯一住房',
        icon: 'none'
      })
    } else if (this.data.dyMsg == '-1') {
      wx.showToast({
        title: '请选择有无抵押',
        icon: 'none'
      })
    } else if (this.data.hbMsg == '-1') {
      wx.showToast({
        title: '请选择有无红本',
        icon: 'none'
      })
    } else if (this.data.zxMsg == '') {
      wx.showToast({
        title: '请选择装修情况',
        icon: 'none'
      })
    }else{
      wx.showLoading({
        title: '',
      })      
      console.log(msg);
      var shi = this.data.hxInfo.substring(0, 1)
      var ting = this.data.hxInfo.substring(2, 3)
      var wei = this.data.hxInfo.substring(4,5)
      var that=this;
      wx.getStorage({
        key: 'houseData',
        success: function(res) {
          var list=res.data;
          list.CountF = shi;
          list.CountT = ting;
          list.CountW=wei;
          list.ProductionAcreage = that.data.mj;
          list.Orientation = that.data.cxInfo;
          if (that.data.wyInfo=='住宅'){
            list.PropertyType = 1;
          } else if (that.data.wyInfo == '公寓'){
            list.PropertyType = 2;
          } else if (that.data.wyInfo == '别墅') {
            list.PropertyType = 3;
          } else if (that.data.wyInfo == '商铺') {
            list.PropertyType = 4;
          } else if (that.data.wyInfo == '写字楼') {
            list.PropertyType = 5;
          } else if (that.data.wyInfo == '洋房') {
            list.PropertyType = 6;
          } else if (that.data.wyInfo == '商住楼') {
            list.PropertyType = 7;
          } else if (that.data.wyInfo == '综合体') {
            list.PropertyType = 8;
          } else if (that.data.wyInfo == '统建房') {
            list.PropertyType = 9;
          } else if (that.data.wyInfo == '福利房') {
            list.PropertyType = 10;
          } else if (that.data.wyInfo == '军产房') {
            list.PropertyType = 11;
          }
          list.PropertyYears = that.data.cqInfo;
          list.BuildYears = that.data.ndInfo;
          list.TransactionTime = that.data.jyInfo;
          list.MatchingSchool = that.data.xq;
          list.OriginalSalePrice = that.data.yj;
          list.BuySalePrice = that.data.qgj;
          list.PurchaseYears = that.data.nxMsg;
          list.IsOnly = that.data.wyMsg;
          list.IsMortgage = that.data.dyMsg;
          list.IsRedbook = that.data.hbMsg;
          list.ShootEstateRenovation = that.data.zxMsg;
          that.setData({
            houseData:list
          })
          console.log(that.data.houseData);
          wx.setStorage({
            key: 'houseData',
            data: that.data.houseData,
            success:r=>{
              wx.hideLoading()
              wx.navigateTo({
                url: '../pubThird/pubThird',
              })
            }
          })
        },
      })
    }
  } 
})