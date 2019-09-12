const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isX: false,
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
        current: 1,
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
      }, {
        name: "我的",
        current: 0,
        style: 0,
        ico: 'icon-wo',
        fn: 'my'
      },
    ],
    hisHouse: [],
    isFix:false,
    ptotal:0,
    pidx:2,
    pval:"",
    no:false,
    list:[],
    tagList:[],
    allv:[],
    isN:false,
    isShare: false,
    showBj:false,
    // showS:false,
    // focus:false
    cityList:[
      { RegionId: 0, Name: "不限" },
    ],
    subCity: [
      { RegionId: 0, Name: "不限" },
    ],
    sSub:-1,
    citySub:0,
    priceSub: 0,
    houseSub: 0,    
    showQy: false,
    showZj: false,
    showFx: false,
    showSx:false,
    oneList:[],
    priceList:[
      { Id: 0, Name: "不限" },
      { Id: 1, Name: "100万以下" },
      { Id: 2, Name: "100-150万" },
      { Id: 3, Name: "150-200万" },
      { Id: 4, Name: "200-300万" },
      { Id: 5, Name: "300-500万" },
      { Id: 6, Name: "500-800万" },
      { Id: 7, Name: "800-1000万" },
      { Id: 8, Name: "1000万以上" }
    ],
    houseList:[
      { Id: 0, Name: "不限" },
      { Id: 1, Name: "一室" },
      { Id: 2, Name: "两室" },
      { Id: 3, Name: "三室" },
      { Id: 4, Name: "四室" },
      { Id: 5, Name: "五室及以上" },
    ],
    allList:[
      {
        Id: 1, Name: "面积（㎡）", 
        Sub: [
          { Tag: "50㎡以下", isOn: false, Sid: 1, Val:"1" },
          { Tag: "50㎡-70㎡", isOn: false, Sid: 2, Val: "2" },
          { Tag: "70㎡-90㎡", isOn: false, Sid: 3, Val: "3" },
          { Tag: "90㎡-110㎡", isOn: false, Sid: 4, Val: "4" },
          { Tag: "110㎡-130㎡", isOn: false, Sid: 5, Val: "5" },
          { Tag: "130㎡-150㎡", isOn: false, Sid: 6, Val: "6" },
          { Tag: "150㎡-180㎡", isOn: false, Sid: 7, Val: "7" },
          { Tag: "180㎡-200㎡", isOn: false, Sid: 8, Val: "8" },
          { Tag: "200㎡以上", isOn: false, Sid: 9, Val: "9"},
        ]
      },
      {
        Id: 2, Name: "朝向",
        Sub: [
          { Tag: "东", isOn: false, Sid: 1, Val: "东" },
          { Tag: "南", isOn: false, Sid: 2, Val: "南" },
          { Tag: "西", isOn: false, Sid: 3, Val: "西" },
          { Tag: "北", isOn: false, Sid: 4, Val: "北"},
          { Tag: "东南", isOn: false, Sid: 5, Val: "东南" },
          { Tag: "东北", isOn: false, Sid: 6, Val: "东北"},
          { Tag: "西南", isOn: false, Sid: 7, Val: "西南"},
          { Tag: "西北", isOn: false, Sid: 8, Val: "西北" },
        ]
      }, 
      {
        Id: 3, Name: "物业类型",
        Sub: [
          { Tag: "住宅", isOn: false, Sid: 1, Val: "1" },
          { Tag: "公寓", isOn: false, Sid: 2, Val: "2" },
          { Tag: "别墅", isOn: false, Sid: 3, Val: "3" },
          { Tag: "商铺", isOn: false, Sid: 4, Val: "4" },
          { Tag: "写字楼", isOn: false, Sid: 5, Val: "5" },
          { Tag: "洋房", isOn: false, Sid: 6, Val: "6" },
          { Tag: "商住楼", isOn: false, Sid: 7, Val: "7" },
          { Tag: "综合体", isOn: false, Sid: 8, Val: "8" },
          { Tag: "统建房", isOn: false, Sid: 9, Val: "9" },
          { Tag: "福利房", isOn: false, Sid: 10, Val: "10" },
          { Tag: "军产房", isOn: false, Sid: 11, Val: "11" },
        ]
      },  
      {
        Id: 4, Name: "装修情况",
        Sub: [
          { Tag: "毛坯", isOn: false, Sid: 1, Val: "1" },
          { Tag: "简装", isOn: false, Sid: 2, Val: "2" },
          { Tag: "精装", isOn: false, Sid: 3, Val: "3" },
          { Tag: "豪装", isOn: false, Sid: 4, Val: "4" }
        ]
      },   
      {
        Id: 5, Name: "楼层",
        Sub: [
          { Tag: "高层", isOn: false, Sid: 1, Val: "高" },
          { Tag: "中层", isOn: false, Sid: 2, Val: "中" },
          { Tag: "低层", isOn: false, Sid: 3, Val: "低" }
        ]
      },                      
    ],
    qy:"",
    qyName: "",
    zj:"",
    zjName:"",
    fx:"",
    fxName:"",
    mj:"",
    cx:"",
    wy:"",
    zx:"",
    lc:"",
    keyword:"",
    animationData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.getTag();
    this.setData({
      isX: app.isIphoneX
    }) 
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.RoleType == 4 || res.data.RoleType == 5) {
          that.data.navData[2].style = 1;
          that.setData({
            navData: that.data.navData
          })
        }
      },
    })         
    wx.showLoading({
      title: '加载中'
    });    
    var that = this;
    if (e.val) {
      this.setData({
        keyword: e.val         
      })
      this.results(1);
    }else{
      that.getData();
    }    
    if (e.share == 1) {
      that.setData({
        isShare: true
      })
    }
    that.getCity();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    var that = this;
    if (Math.ceil(that.data.ptotal / 10) >= that.data.pidx){
        wx.showLoading({
          title: '加载中'
        });
      if (that.data.allv == '' && that.data.qy == '' && that.data.zj == '' && that.data.fx == '' && that.data.mj.length == 0 && that.data.cx.length == 0 && that.data.wy.length == 0 && that.data.zx.length == 0 && that.data.lc.length == 0){
        that.getData(that.data.pidx);
      }else{
        that.results(that.data.pidx);
      }
        that.setData({
          pidx: that.data.pidx+1
        })   
        setTimeout(function () {
          wx.hideLoading();
        }, 1000) 
    }else{
      that.setData({
        no:true
      })
    }   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '海量精选笋盘，刚需上车、名校学区、投资改善，帮你买的值',
      imageUrl: "../../img/share.jpg",
      path: '/pages/mainHouse/mainHouse'
    }
  }, 
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  // onPullDownRefresh: function () {
  //   var that = this;
  //   wx.stopPullDownRefresh();
  //   //显示动画
  //   wx.showNavigationBarLoading()
  //   that.getData();
  //   that.setData({
  //     keyword:"",
  //     sSub: -1,
  //     citySub: 0,
  //     priceSub: 0,
  //     houseSub: 0,
  //     isFix:false 
  //   })
  //   setTimeout(function () {
  //     //隐藏动画
  //     wx.hideNavigationBarLoading()
  //   }, 500)
  // },   
  getTag(){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/GetShootTagList',
      success(res) {
        that.setData({
          tagList: res.data.data
        })
      }
    }) 
  },
  getData:function(num){
    var that =this;
    if(num==undefined){
      num=1;
    };
    // if (val == undefined) {
        // that.results(1);     
    // }
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/GetShootEstatePageList',
      method:"post",
      data: { State: 4, PageIndex: num, PageSize: 10 },
      success(res){
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            hisHouse:res.data.data.DataList,
            ptotal: res.data.data.TotalRecord,
            isN:true,
            no:false
          })
          if(num==1){
            that.setData({
              list: res.data.data.DataList
            })
          }
          if (num > 1){
            that.setData({
              list: that.data.list.concat(res.data.data.DataList)
            })                      
          }
          wx.hideLoading();
        }
      }
    })
  },

  onPageScroll:function(e){
    var that=this;
    if (e.scrollTop>150){
      that.setData({
        isFix:true
      })
    }
    if (e.scrollTop < 10&&that.data.showBj==false){
      that.setData({
        isFix: false
      })      
    }
  },  
  goHouseInfo: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../houseInfo/houseInfo?id='+e.currentTarget.dataset.id,
    })
  },

  searchList:function(e){
    console.log(e);
    var that=this;
    var idx = e.currentTarget.dataset.idx;
    that.setData({
      pval: e.currentTarget.dataset.n,
      showSx: false,
      showQy: false,
      showZj: false,
      showFx: false,
      showBj: false      
    })    
    var val = e.currentTarget.dataset.n
      console.log(that.data.tagList[idx].State == true);
      if (that.data.tagList[idx].State == true) {
        that.data.tagList[idx].State = false;
        that.data.allv.push(val);
        that.setData({
          tagList: that.data.tagList,
          allv: that.data.allv
        })
      } else {
        that.data.tagList[idx].State = true;
        var aidx = that.data.allv.indexOf(val);
        that.data.allv.splice(aidx, 1);
        that.setData({
          tagList: that.data.tagList,
          allv: that.data.allv
        })
      }
      wx.showLoading({
        title: '',
      })
      that.results(1) 
  },
  gosearch:function(e){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  goIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
  } , 

// 筛选
  showList(e){
    var that = this;
        
    var num = e.currentTarget.dataset.num;
    that.setData({
      showNum:num,
    })
    if(num==1){
      that.data.showQy = !that.data.showQy
        // 显示遮罩层 
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: "ease-in-out",
          delay: 0
        })
        this.animation = animation
        animation.translateY(-100)
        animation.opacity(0).step()
        this.setData({
          animationData: animation.export(),
          showQy: that.data.showQy,
          showZj: false,
          showFx: false,
          showSx: false,   
        })
        // setTimeout(function () {
        animation.translateY(0)
        animation.opacity(1).step()
        this.setData({
          animationData: animation.export()
        })  
      
      // that.setData({
      //   showQy: that.data.showQy,
      //   showZj: false,
      //   showFx: false,
      //   showSx: false,
      // })       
    } else if (num == 2){
      that.data.showZj = !that.data.showZj
      // 显示遮罩层 
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease-in-out",
        delay: 0
      })
      this.animation = animation
      animation.translateY(-100)
      animation.opacity(0).step()
      this.setData({
        animationData: animation.export(),
        showZj: that.data.showZj,
        showQy: false,
        showFx: false,
        showSx: false,  
      })
      animation.translateY(0)
      animation.opacity(1).step()
      this.setData({
        animationData: animation.export()
      })        
      // that.setData({
      //   showZj: that.data.showZj,
      //   showQy: false,
      //   showFx: false,
      //   showSx: false,        
      // })  
    } else if (num == 3) {
      that.data.showFx = !that.data.showFx
      // 显示遮罩层 
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease-in-out",
        delay: 0
      })
      this.animation = animation
      animation.translateY(-100)
      animation.opacity(0).step()
      this.setData({
        animationData: animation.export(),
        showFx: that.data.showFx,
        showQy: false,
        showZj: false,
        showSx: false,   
      })
      animation.translateY(0)
      animation.opacity(1).step()
      this.setData({
        animationData: animation.export()
      })         
      // that.setData({
      //   showFx: that.data.showFx,
      //   showQy: false,
      //   showZj: false,
      //   showSx: false,        
      // })
    } else if (num == 4) {
      that.data.showSx = !that.data.showSx
      // 显示遮罩层 
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease-in-out",
        delay: 0
      })
      this.animation = animation
      animation.translateY(-100)
      animation.opacity(0).step()
      this.setData({
        animationData: animation.export(),
        showSx: that.data.showSx,
        showQy: false,
        showZj: false,
        showFx: false,
      })
      animation.translateY(0)
      animation.opacity(1).step()
      this.setData({
        animationData: animation.export()
      })        
      // that.setData({
      //   showSx: that.data.showSx,
      //   showQy: false,
      //   showZj: false,
      //   showFx: false,
      // })
    }
    if (that.data.showQy || that.data.showZj || that.data.showFx || that.data.showSx){
      that.setData({
        isFix:true,
        showBj:true
      })
    } else{
      that.setData({
        isFix: false,
        showBj: false
      })      
    } 

  

  },
  hideBj(){
    var that=this;
    that.setData({
      showSx: false,
      showQy: false,
      showZj: false,
      showFx: false,
      showBj: false
    })    
  },
  getCity(e) {
    var that = this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/Region/GetRegionCityOrArea?RegionId=19&ShootEstateBl=true',
      // data:{
      //   RegionId:19,
      //   ShootEstateBl:1
      // },
      success: res => {
        console.log(res);
        that.setData({
          cityList: that.data.cityList.concat(res.data.data)
        })
      }
    })
  },  
selectC(e){
  var that=this;
  var idx = e.currentTarget.dataset.idx;
  var type = e.currentTarget.dataset.type;
  var val = e.currentTarget.dataset.val;
  var name=e.currentTarget.dataset.name;
  var arr = [{ RegionId: val, Name: "不限" }]
  if(type=="city"){
    that.setData({
      citySub: idx
    })
    wx.request({
      url: 'https://spapi.centaline.com.cn/Region/GetRegionCityOrArea?RegionId='+val,
      // data:{
      //   RegionId: e.currentTarget.dataset.val
      // },
      success: res => {
        console.log(res);
        var sData = arr.concat(res.data.data) 
        console.log(sData);
        that.setData({
          subCity: sData,
          // sSub: -1
        })      
        console.log(that.data.subCity)
      }
    })

  } else if (type == "sSub") {
    console.log(val)
    that.setData({
      sSub: idx,
      qy:val,
      qyName: name,
      showQy:false
    })
    if(val==233){
      that.setData({
        qyName: "深圳市",
      })     
    } else if (val == 3397) {
      that.setData({
        qyName: "临深地区",
      })
    } 

    wx.showLoading({
      title: '',
    })
    that.results(1);
  }  else if (type == "price"){
    that.setData({
      priceSub: idx,
      zj:val,
      zjName:name,
      showZj:false
    })  
    wx.showLoading({
      title: '',
    })
    that.results(1);      
  } else if (type == "house") {
    that.setData({
      houseSub: idx,
      fx:val,
      fxName: name,
      showFx:false
    })
    wx.showLoading({
      title: '',
    })
    that.results(1);       
  }
  console.log(e)
},
// 筛选多选
  selectA(e){
    var that=this;
    var pVal = e.currentTarget.dataset.p;
    var subVal = e.currentTarget.dataset.sub;
    var pidx = e.currentTarget.dataset.pidx;
    var sidx = e.currentTarget.dataset.sidx;
    that.data.allList[pidx].Sub[sidx].isOn = !that.data.allList[pidx].Sub[sidx].isOn
    that.setData({
      allList: that.data.allList
    })
  },
  selectConfim(){
    var that=this;
    var mjArr = [], cxArr = [], wyArr = [], zxArr = [], lcArr = [];
    for (var i in that.data.allList[0].Sub) {
      if (that.data.allList[0].Sub[i].isOn == true) {
        mjArr.push(that.data.allList[0].Sub[i].Val)
      }
    }
    for (var i in that.data.allList[1].Sub) {
      if (that.data.allList[1].Sub[i].isOn == true) {
        cxArr.push(that.data.allList[1].Sub[i].Val)
      }
    } 
    for (var i in that.data.allList[2].Sub) {
      if (that.data.allList[2].Sub[i].isOn == true) {
        wyArr.push(that.data.allList[2].Sub[i].Val)
      }
    } 
    for (var i in that.data.allList[3].Sub) {
      if (that.data.allList[3].Sub[i].isOn == true) {
        zxArr.push(that.data.allList[3].Sub[i].Val)
      }
    } 
    for (var i in that.data.allList[4].Sub) {
      if (that.data.allList[4].Sub[i].isOn == true) {
        lcArr.push(that.data.allList[4].Sub[i].Val)
      }
    }
    that.setData({
      mj: mjArr,
      cx: cxArr,
      wy: wyArr,
      zx: zxArr,
      lc:lcArr,
      showSx:false
    })  
    wx.showLoading({
      title: '',
    })        
    that.results(1);      
  },
  selectCancel(){
    this.setData({
      allList: [
        {
          Id: 1, Name: "面积（㎡）",
          Sub: [
            { Tag: "50㎡以下", isOn: false, Sid: 1, Val: "1" },
            { Tag: "50㎡-70㎡", isOn: false, Sid: 2, Val: "2" },
            { Tag: "70㎡-90㎡", isOn: false, Sid: 3, Val: "3" },
            { Tag: "90㎡-110㎡", isOn: false, Sid: 4, Val: "4" },
            { Tag: "110㎡-130㎡", isOn: false, Sid: 5, Val: "5" },
            { Tag: "130㎡-150㎡", isOn: false, Sid: 6, Val: "6" },
            { Tag: "150㎡-180㎡", isOn: false, Sid: 7, Val: "7" },
            { Tag: "180㎡-200㎡", isOn: false, Sid: 8, Val: "8" },
            { Tag: "200㎡以上", isOn: false, Sid: 9, Val: "9" },
          ]
        },
        {
          Id: 2, Name: "朝向",
          Sub: [
            { Tag: "东", isOn: false, Sid: 1, Val: "东" },
            { Tag: "南", isOn: false, Sid: 2, Val: "南" },
            { Tag: "西", isOn: false, Sid: 3, Val: "西" },
            { Tag: "北", isOn: false, Sid: 4, Val: "北" },
            { Tag: "东南", isOn: false, Sid: 5, Val: "东南" },
            { Tag: "东北", isOn: false, Sid: 6, Val: "东北" },
            { Tag: "西南", isOn: false, Sid: 7, Val: "西南" },
            { Tag: "西北", isOn: false, Sid: 8, Val: "西北" },
          ]
        },
        {
          Id: 3, Name: "物业类型",
          Sub: [
            { Tag: "住宅", isOn: false, Sid: 1, Val: "1" },
            { Tag: "公寓", isOn: false, Sid: 2, Val: "2" },
            { Tag: "别墅", isOn: false, Sid: 3, Val: "3" },
            { Tag: "商铺", isOn: false, Sid: 4, Val: "4" },
            { Tag: "写字楼", isOn: false, Sid: 5, Val: "5" },
            { Tag: "洋房", isOn: false, Sid: 6, Val: "6" },
            { Tag: "商住楼", isOn: false, Sid: 7, Val: "7" },
            { Tag: "综合体", isOn: false, Sid: 8, Val: "8" },
            { Tag: "统建房", isOn: false, Sid: 9, Val: "9" },
            { Tag: "福利房", isOn: false, Sid: 10, Val: "10" },
            { Tag: "军产房", isOn: false, Sid: 11, Val: "11" },
          ]
        },
        {
          Id: 4, Name: "装修情况",
          Sub: [
            { Tag: "毛坯", isOn: false, Sid: 1, Val: "1" },
            { Tag: "简装", isOn: false, Sid: 2, Val: "2" },
            { Tag: "精装", isOn: false, Sid: 3, Val: "3" },
            { Tag: "豪装", isOn: false, Sid: 4, Val: "4" }
          ]
        },
        {
          Id: 5, Name: "楼层",
          Sub: [
            { Tag: "高层", isOn: false, Sid: 1, Val: "高" },
            { Tag: "中层", isOn: false, Sid: 2, Val: "中" },
            { Tag: "低层", isOn: false, Sid: 3, Val: "低" }
          ]
        },
      ],      
    })
  },
  results(num){
    var that=this;
    that.setData({
      showBj:false
    })
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/GetShootEstatePageList',
      method: "post",
      data: { State: 4, PageIndex: num, PageSize: 10, ShootEstateTag: that.data.allv.toString(), RegionId: that.data.qy, BuySalePrice: that.data.zj, Apartment: that.data.fx, ProductionAcreage: that.data.mj, Orientation: that.data.cx, PropertyType: that.data.wy, ShootEstateRenovation: that.data.zx, StoreyH: that.data.lc, Keyword:that.data.keyword},
      success(res) {
        console.log(res);
        if (res.data.code == 1001) {
          that.setData({
            hisHouse: res.data.data.DataList,
            ptotal: res.data.data.TotalRecord,
            isN: true,
            no: false
          })
          if (num == 1) {
            that.setData({
              list: res.data.data.DataList,
              pidx:2
            })
          }
          if (num > 1) {
            that.setData({
              list: that.data.list.concat(res.data.data.DataList)
            })
          }
          wx.hideLoading();
        }
      }
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