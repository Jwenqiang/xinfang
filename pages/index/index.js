//获取应用实例
const app = getApp()
Page({
  data: {
    isX:false,
    navData: [
      {
        name: "首页",  //文本
        current: 1,    //是否是当前页，0不是  1是
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
        current: 0,
        style: 0,
        ico: 'icon-find',
        fn: 'house'
      },  {
        name: "我的",
        current: 0,
        style: 0,
        ico: 'icon-wo',
        fn: 'my'
      },
    ],

    imgUrls: [],    
    datetime: "",
    zttime: "",
    xjtime: "",
    bzHouse:[],
    ztHouse: [], 
    xjbHouse: [],       
    autoplay: true,
    interval: 5000,
    duration: 500,
    swiperCurrent: 0, 
    tian: '0',
    shi: '0',
    fen: '0',
    miao:"0", 
    xjDay:"0",
    xjHour:"0",
    xjMinute:"0",

    djsList:[],
    qgHouse:{
      title:"",
      time:"",
      price: ""
    },
    xjHouse: {
      title: "",
      time: "",
      price:"",
      orderNum:12,
      lookNum:125
    },  
    idx:0,
    timer:""
  },
  // 本周笋盘倒计时
  djsList: function (bz) {
    // 倒计时时间转换为时间戳
    var dates = [];
    for (var i in this.data.bzHouse) {
      if (this.data.bzHouse[i].ReserveTime != "") {
        var end_time = new Date((this.data.bzHouse[i].ReserveTime).replace(/-/g, '/')).getTime();//月份是实际月份-1  
        // console.log(end_time);
        var current_time = new Date().getTime();
        var sys_second = (end_time - new Date().getTime());
        dates.push({ dat: sys_second });
      }
    }
    this.setData({
      datetime: dates
    })
    // 倒计时执行
    let that = this;
    let len = that.data.datetime.length;//时间数据长度

   // var timer = setInterval(function () {//时间函数

      for (var i = 0; i < len; i++) {
        var intDiff = that.data.datetime[i].dat;//获取数据中的时间戳
        if (intDiff > 0) {//转换时间
          that.data.datetime[i].dat -= 1000;
          var day = Math.floor((intDiff / 1000 / 3600) / 24);
          var hour = Math.floor((intDiff / 1000 / 3600) % 24);
          var minute = Math.floor((intDiff / 1000 / 60) % 60);
          var second = Math.floor(intDiff / 1000 % 60);

          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          var str = day + "," + hour + ',' + minute + ',' + second
          that.data.datetime[i].difftime = str;//在数据中添加difftime参数名，把时间放进去
          that.data.bzHouse[i].djs = that.data.datetime[i].difftime;

          that.setData({
            bzHouse: that.data.bzHouse
          })

        } else {
          // var str = "已结束！";
          // clearInterval(timer);
        }
      }

  //  }, 1000)

  },
  // 笋盘专题倒计时
  ztList: function (zt) {
    // 倒计时时间转换为时间戳
    var dates = [];
    for (var i in this.data.ztHouse) {
      // if (this.data.ztHouse[i].StartTime != "" && this.data.ztHouse[i].Type==1){
      // this.setData({
      //   idx:i
      // })
      var end_time = new Date((this.data.ztHouse[i].StartTime).replace(/-/g, '/')).getTime();//月份是实际月份-1  
      // console.log(end_time);
      var current_time = new Date().getTime();
      var sys_second = (end_time - new Date().getTime());
      dates.push({ dat: sys_second });
      // }
    }
    this.setData({
      zttime: dates
    })

    // 倒计时执行
    let that = this;
    let len = that.data.zttime.length;//时间数据长度

    // var timer = setInterval(function () {//时间函数

      for (var i = 0; i < len; i++) {
        var intDiff = that.data.zttime[i].dat;//获取数据中的时间戳
        if (intDiff > 0) {//转换时间
          that.data.zttime[i].dat -= 1000;
          var day = Math.floor((intDiff / 1000 / 3600) / 24);
          var hour = Math.floor((intDiff / 1000 / 3600) % 24);
          var minute = Math.floor((intDiff / 1000 / 60) % 60);
          var second = Math.floor(intDiff / 1000 % 60);

          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          var str = day + "," + hour + ',' + minute + ',' + second
          that.data.zttime[i].difftime = str;//在数据中添加difftime参数名，把时间放进去
          that.data.ztHouse[i].djs = that.data.zttime[i].difftime;

          that.setData({
            ztHouse: that.data.ztHouse
          })

        } else {
          // var str = "已结束！";
          // clearInterval(timer);
        }
      }

    // }, 1000)

  },
  // 性价比倒计时
  xjList: function (xj) {
    // 倒计时时间转换为时间戳
    var dates = [];
    for (var i in this.data.xjbHouse) {
      if (this.data.xjbHouse[i].ReserveTime != "") {
        var end_time = new Date((this.data.xjbHouse[i].ReserveTime).replace(/-/g, '/')).getTime();//月份是实际月份-1  
        // console.log(end_time);
        var current_time = new Date().getTime();
        var sys_second = (end_time - new Date().getTime());
        dates.push({ dat: sys_second });
      }
    }
    this.setData({
      xjtime: dates
    })
    // 倒计时执行
    let that = this;
    let len = that.data.xjtime.length;//时间数据长度

    // var timer = setInterval(function () {//时间函数

      for (var i = 0; i < len; i++) {
        var intDiff = that.data.xjtime[i].dat;//获取数据中的时间戳
        if (intDiff > 0) {//转换时间
          that.data.xjtime[i].dat -= 1000;
          var day = Math.floor((intDiff / 1000 / 3600) / 24);
          var hour = Math.floor((intDiff / 1000 / 3600) % 24);
          var minute = Math.floor((intDiff / 1000 / 60) % 60);
          var second = Math.floor(intDiff / 1000 % 60);
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          var str = day + "," + hour + ',' + minute + ',' + second
          that.data.xjtime[i].difftime = str;//在数据中添加difftime参数名，把时间放进去
          that.data.xjbHouse[i].djs = that.data.xjtime[i].difftime;
          that.setData({
            xjbHouse: that.data.xjbHouse
          })
        } else {
          // var str = "已结束！";
          // clearInterval(timer);
        }
      }

    // }, 1000)

  }, 

  onLoad: function () {

    this.setData({
      isX: app.isIphoneX
    })  
    wx.showLoading({
      title: '加载中'
    })  
    var that=this
    // 判断是否据有发布权限
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {    
        if (res.data.RoleType == 4 || res.data.RoleType== 5){
          that.data.navData[2].style = 1;
          that.setData({
            navData: that.data.navData
          }) 
        }

      },
    })
  },
  // 点击tab页执行
  onTabItemTap(item) {   

  },  
  onReady: function () {
    
  },  
  onShow:function(){

    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    // wx.showLoading({
    //   title: '加载中'
    // })
    var p1 = this.getData();
    var p3 = this.getZt();
    var p2 = this.getWeekAndHot();
    var that = this;
    // 同步执行
    Promise.all([p1, p2, p3]).then(function (results) {
      console.log(results); // 获得一个Array: ['P1', 'P2',"P3"]
      // 设计定时器
      that.setData({
        timer: setInterval(function () {
          that.djsList();
          that.xjList();
          that.ztList();
        }, 1000)
      })
      setTimeout(function () { wx.hideLoading();},300)
    });

  },
  onHide(){

    clearInterval(this.data.timer);
  },
  onUnload(){

  },
    
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '专业为您甄选最笋房源，想买房，买好房，就上找笋盘！',
      imageUrl:"../../img/share.jpg",
      path: '/pages/index/index'
    }    
  },  

  swiperChange: function (e) {
    if(e.detail.source=="touch"){
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  },  
getData:function(){ 
  var that = this;
  return new Promise(function (resolve) {
    wx.request({
      url: 'https://spapi.centaline.com.cn/System/GetBanner',
      data:{
        AdPositionId:30
      },
      success(res){
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            imgUrls:res.data.data.Item
          })
          resolve(1);
        }
      }
    })
  })
},
goBan:function(u){
  console.log(u);
  wx.navigateTo({
    url: u.currentTarget.dataset.u.substring(7)
  })
},
// 获取本周最笋和热门笋盘
getWeekAndHot:function(){
  var that=this;
  return new Promise(function (resolve) {
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/GetShootEstateWeekAndHotList',
      method:"post",
      success(res){
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            bzHouse: res.data.data.ShootEstateNowWeekList.DataList,
            xjbHouse: res.data.data.ShootEstateHotList.DataList
          })
          // that.djsList();
          // that.xjList();
          resolve(2);
        }
      }
    })
  })
},
// 获取笋盘专题
getZt:function(){
  var that=this;
  return new Promise(function (resolve) {
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/GetShootEstateSpecialPageList',
      success(res){
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            ztHouse: res.data.data.DataList
          })
          // that.ztList();
          resolve(3);
        }
      }
    })  
  })  
},
  goHouseInfo:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../houseInfo/houseInfo?id=' + e.currentTarget.dataset.id,
    })
  },
  goZt:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../houseZt/houseZt',
    })
  },  
  goZtInfo: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../ygInfo/ygInfo?yid=' + e.currentTarget.dataset.id
    })
  },
  goTop:function(e){
    wx.navigateTo({
      url: '../topHouse/topHouse',
    })
  },
  goHistory:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  }, 
  goMain: function () {
    wx.navigateTo({
      url: '../mainHouse/mainHouse',
    })
  }, 
  goJx: function () {
    wx.navigateTo({
      url: '../houseList/houseList',
    })
  },   
  goYy:function(e){
    wx.navigateTo({
      url: '../houseYy/houseYy?id='+e.currentTarget.dataset.id,
    })    
  }, 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh(); //刷新完成后停止下拉刷新动效
    //显示动画
    wx.showNavigationBarLoading(); 
    // var p1 = this.getData();
    // var p2 = this.getZt();
    // var p3 = this.getWeekAndHot();
    // // 同步执行
    // Promise.all([p1, p2, p3]).then(function (results) {
    //   clearInterval();
    //   setTimeout(function(){
    //     //隐藏动画
    //     wx.hideNavigationBarLoading()   
    //   },300)
    // });  
    this.onShow();
    setTimeout(function(){
      //隐藏动画
      wx.hideNavigationBarLoading()   
    },300)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     
  },  
  index(e) {
    wx.reLaunch({
      url: "../index/index"
    })
  },
  house(e){
    wx.reLaunch({
      url: "../house/house"
    })
  },
  pubStatement(e){
    wx.navigateTo({
      url: "../pubStatement/pubStatement"
    })    
  },
  mainHouse(){
    wx.reLaunch({
      url: "../mainHouse/mainHouse"
    })
  },
  my(e) {
    wx.reLaunch({
      url: '../my/my',
    })
  }
});