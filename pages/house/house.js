const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isX:false,
    navData: [
      {
        name: "首页",  //文本
        current: 0,    //是否是当前页，0不是  1是
        style: 0,     //样式
        ico: 'icon-home',  //不同图标
        fn: 'index'   //对应处理函数
      },
      {
        name: "房源",
        current: 0,
        style: 0,
        ico: 'icon-loufang',
        fn: 'mainHouse'
      },       
      {
        name: "",
        current: 0,
        style: 2,
        ico: '',
        fn: 'pubStatement'
      }, {
        name: "找笋盘",
        current: 1,
        style: 0,
        ico: 'icon-find',
        fn: 'house'
      }, {
        name: "我的",
        current: 0,
        style: 0,
        ico: 'icon-wo',
        fn: 'my'
      },
    ],


    change: false, // 当两个slider在最右端重合时，将change设置为true，从而隐藏slider2，才能继续操作slider1
    max: 1000, // 两个slider所能达到的最大值
    min: 0, // 两个slider所能取的最小值
    rate: 1, // slider的最大最小值之差和100（或1000）之间的比率
    scale: 1, // 比例系数。页面显示值的时候，需要将slider1Value(slider2Value)乘以比例系数scale
    slider1Max: 1000, // slider1的最大取值
    slider2Value: 1000, // slider2的值
    slider1Value: 50, // slider1的值
    slider2Min: 0, // slider2的最小取值
    slider1W: 1000, // slider1的宽度
    slider2W: 0, // slider2的宽度


    change1: false, // 当两个slider在最右端重合时，将change设置为true，从而隐藏slider2，才能继续操作slider1
    max1: 500, // 两个slider所能达到的最大值
    min1: 0, // 两个slider所能取的最小值
    rate: 1, // slider的最大最小值之差和100（或1000）之间的比率
    scale: 1, // 比例系数。页面显示值的时候，需要将slider1Value(slider2Value)乘以比例系数scale
    slider3Max: 500, // slider1的最大取值
    slider4Value: 500, // slider2的值
    slider3Value: 30, // slider1的值
    slider4Min: 0, // slider2的最小取值
    slider3W: 500, // slider1的宽度
    slider4W: 0, // slider2的宽度


    lx:[
      { name: "住宅", isOn: false, id: 0, type: "lx" },
      { name: "公寓", isOn: false, id: 1, type: "lx"},
      { name: "别墅", isOn: false, id: 2, type: "lx" },
      { name: "商铺", isOn: false, id: 3, type: "lx"},
      { name: "写字楼", isOn: false, id: 4, type: "lx" },
      { name: "洋房", isOn: false, id: 5, type: "lx" },
      { name: "商住楼", isOn: false, id: 6, type: "lx" },
      { name: "综合体", isOn: false, id: 7, type: "lx"}
    ],
    hx: [
      { name: "不限", isOn: false,type:"hx" },
      { name: "一室", isOn: false, type: "hx" },
      { name: "二室", isOn: false, type: "hx" },
      { name: "三室", isOn: false, type: "hx" },
      { name: "四室", isOn: false, type: "hx" },
      { name: "五室", isOn: false, type: "hx" },
      { name: "五室以上", isOn: false, type: "hx" }
    ],  
    cx: [
      { name: "东", isOn: false, type: "cx" },
      { name: "南", isOn: false, type: "cx" },
      { name: "西", isOn: false, type: "cx" },
      { name: "北", isOn: false, type: "cx" },
      { name: "东南", isOn: false, type: "cx" },
      { name: "西南", isOn: false, type: "cx" },
      { name: "东北", isOn: false, type: "cx" },
      { name: "西北", isOn: false, type: "cx" }
    ],  
    lc: [
      { name: "低层", isOn: false, type: "lc" },
      { name: "中高层", isOn: false, type: "lc" },
      { name: "高层", isOn: false, type: "lc" }
    ], 
    ts: [
      { name: "满五年", isOn: false, type: "ts" },
      { name: "满两年", isOn: false, type: "ts" },
      { name: "唯一住房", isOn: false, type: "ts" },      
      { name: "红本在手", isOn: false, type: "ts" },
      { name: "近地铁", isOn: false, type: "ts" },
      { name: "南北通透", isOn: false, type: "ts"},      
      { name: "名校学区", isOn: false, type: "ts"},      
      { name: "降价", isOn: false, type: "ts" }      
    ], 
    lxSub:"",
    lxMsg:"住宅",
    hxSub: "", 
    hxMsg: "不限",             
    cxSub: "", 
    cxMsg: "东",             
    lcSub: "", 
    lcMsg: "低",             
    tsSub:"", 
    tsMsg: "",             
    yxqy:"请选择意向区域",
    array: ['南山区', '福田区', '宝安区', '龙华区','盐田区','大鹏新区','光明新区'],
    objectArray: [
      {
        id: 0,
        name: '南山区'
      },
      {
        id: 1,
        name: '福田区'
      },
      {
        id: 2,
        name: '宝安区'
      },
      {
        id: 3,
        name: '龙华区'
      },
      {
        id: 4,
        name: '盐田区'
      },
      {
        id: 5,
        name: '大鹏新区'
      },
      {
        id: 6,
        name: '光明新区'
      }
    ],
    index: 0,
    isSel:false,
    other:"",
    uName:"",
    uPhone:"",
    time: '12:01',
    region: ['广东省', '深圳市', '南山区'],
    customItem: '不限区',
    show: false    
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      yxqy: this.data.array[e.detail.value],
      isSel: true
    })
  },  
  
  changeStart: function (e) {
    var idx = parseInt(e.currentTarget.dataset.idx)
    if (idx === 1) {
      // dW是当前操作的slider所能占据的最大宽度百分数
      var dW = (this.data.slider2Value - this.data.min) / this.data.rate
      this.setData({
        slider1W: dW,
        slider2W: 1000 - dW,
        slider1Max: this.data.slider2Value,
        slider2Min: this.data.slider2Value,
        change: false
      })
    } else if (idx === 2) {
      var dw = (this.data.max - this.data.slider1Value) / this.data.rate
      this.setData({
        slider2W: dw,
        slider1W: 1000 - dw,
        slider1Max: this.data.slider1Value,
        slider2Min: this.data.slider1Value,
        change: false
      })
    }
  },
  changing: function (e) {
    var idx = parseInt(e.currentTarget.dataset.idx)
    var value = e.detail.value
    if (idx === 1) {
      this.setData({
        slider1Value: value
      })
    } else if (idx === 2) {
      this.setData({
        slider2Value: value
      })
    }
  },
  changed: function (e) {
    if (this.data.slider1Value === this.data.slider2Value && this.data.slider2Value === this.data.max) {
      this.setData({
        change: true
      })
    }
  },
// 第二个滑动
  changeStart1: function (e) {
    var idx = parseInt(e.currentTarget.dataset.idx);
    console.log(idx);
    if (idx === 1) {
      // dW是当前操作的slider所能占据的最大宽度百分数
      var dW = (this.data.slider4Value - this.data.min1) / this.data.rate
      console.log(dw);
      this.setData({
        slider3W: dW,
        slider4W: 500 - dW,
        slider3Max: this.data.slider4Value,
        slider4Min: this.data.slider4Value,
        change1: false
      })
    } else if (idx === 2) {
      var dw = (this.data.max1 - this.data.slider3Value) / this.data.rate
      this.setData({
        slider4W: dw,
        slider3W: 500 - dw,
        slider3Max: this.data.slider3Value,
        slider4Min: this.data.slider3Value,
        change1: false
      })
    }
  },
  changing1: function (e) {
    var idx = parseInt(e.currentTarget.dataset.idx)
    var value = e.detail.value
    if (idx === 1) {
      this.setData({
        slider3Value: value
      })
    } else if (idx === 2) {
      this.setData({
        slider4Value: value
      })
    }
  },
  changed1: function (e) {
    if (this.data.slider3Value === this.data.slider4Value && this.data.slider4Value === this.data.max1) {
      console.log(2222);
      this.setData({
        change1: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isX: app.isIphoneX
    })     
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          uPhone:res.data.Mobile,
          show:true
        })
        if(res.data.RoleType==4||res.data.RoleType==5){
          that.data.navData[2].style=1;
          that.setData({
            navData:that.data.navData
          })
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
  onShareAppMessage: function (res) {
    return {
      title: '提交找笋盘需求，平台一对一为您甄选最笋的房源！',
      imageUrl: "../../img/share.jpg",
      path: '/pages/house/house'
    }
  }, 
  addOn:function(e){
    var that=this;
    console.log(e);
    if (e.currentTarget.dataset.type=="lx"){
      that.setData({
        lxSub: e.currentTarget.dataset.idx
      }) 
      if (that.data.lxSub == e.currentTarget.dataset.idx){
        that.setData({
          lxMsg: e.currentTarget.dataset.name
        })         
      }
    } else if (e.currentTarget.dataset.type == "hx") {
      that.setData({
        hxSub: e.currentTarget.dataset.idx
      })
      if (that.data.hxSub == e.currentTarget.dataset.idx) {
        that.setData({
          hxMsg: e.currentTarget.dataset.name
        })
      }      
    } else if (e.currentTarget.dataset.type == "cx") {
      that.setData({
        cxSub: e.currentTarget.dataset.idx
      })
      if (that.data.cxSub == e.currentTarget.dataset.idx) {
        that.setData({
          xMsg: e.currentTarget.dataset.name
        })
      }      
    } else if (e.currentTarget.dataset.type == "lc") {
      that.setData({
        lcSub: e.currentTarget.dataset.idx
      })
      if (that.data.lcSub == e.currentTarget.dataset.idx) {
        that.setData({
          lcMsg: e.currentTarget.dataset.name
        })
      }      
    } else if (e.currentTarget.dataset.type == "ts") {
      // 多选
      var index = e.currentTarget.dataset.idx;
      if (this.data.ts[index].isOn == true) {
        this.data.ts[index].isOn = false;
        
      } else if (this.data.ts[index].isOn == false) {
        this.data.ts[index].isOn = true;  
      }
      this.setData({
        ts: this.data.ts,
      });
      var tsArr=""
      for(var i in that.data.ts){
        if (that.data.ts[i].isOn){
          tsArr+= that.data.ts[i].name+";"
        }
      }
      this.setData({
        tsMsg: "房源特色：" + tsArr
      });           
    }
 
  },
  changeV:function(e){
    this.setData({
      other:e.detail.value
    })
  },
  changeName:function(e){
    this.setData({
      uName: e.detail.value
    })
  },
  changePhone: function (e) {
    var that=this;
    that.setData({
      uPhone: e.detail.value
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
  goOrder:function(){
    var that=this;
    if (that.data.slider2Value>990){
      var zj = "总价预算：不限;"
    }else{
      var zj = "总价预算：" + that.data.slider1Value + "-" + that.data.slider2Value + "万" + ";";
    }
    if (that.data.slider4Value>490){
      var mj = "意向面积：不限;"
    }else{
      var mj = "意向面积：" + that.data.slider3Value + "-" + that.data.slider4Value + "㎡" + ";";
    }
    var allstation = zj + mj + "物业类型：" + that.data.lxMsg + ";" + "意向户型：" + that.data.hxMsg + ";" + "户型朝向：" + that.data.cxMsg + ";" + "楼层高低：" + that.data.lcMsg + ";" + that.data.tsMsg + "意向区域：" + that.data.region +";"+"其他要求:"+that.data.other+";";
    console.log(allstation);
    if (that.data.region.length==0){
      wx.showToast({
        title: "请选择意向区域",
        icon: "none"
      })      
    }
    else if (that.data.uName == ''){
      wx.showToast({
        title: "请填写您的姓名",
        icon: "none"
      })        
    }
    else if (that.data.uPhone == ''){
      wx.showToast({
        title: "请填写您的手机号码",
        icon: "none"
      })      
    }
    else if (that.data.uPhone.length != 11 || !(/^1[345678]\d{9}$/.test(that.data.uPhone))){
      wx.showToast({
        title: "手机号码格式错误",
        icon: "none"
      })       
    }    
    else{
      wx.request({
        url: 'https://spapi.centaline.com.cn/ShootEstate/AddShootEstateReserve',
        method: "post",
        data: {
          FullName: that.data.uName,
          Mobile: that.data.uPhone,
          Type: 2,
          Remark: allstation
        },
        success(res) {
          console.log(res);
          if (res.data.code == 1001) {
            wx.navigateTo({
              url: '../houseSuc/houseSuc',
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }
        }
      })
    }
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },    
  clearNum: function () {
    this.setData({
      uPhone: "",
      show: false
    })
  }, 



  index(e) {
    wx.reLaunch({
      url: "../index/index"
    })
  },
  house(e) {
    wx.reLaunch({
      url: "../house/house"
    })
  },
  pubStatement(e) {
    wx.navigateTo({
      url: "../pubStatement/pubStatement"
    })
  },
  mainHouse() {
    wx.reLaunch({
      url: "../mainHouse/mainHouse"
    })
  },
  my(e) {
    wx.reLaunch({
      url: '../my/my',
    })
  }
})