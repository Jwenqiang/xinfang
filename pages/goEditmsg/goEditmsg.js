// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityInfo:"",
    hid:"",
    time: '2019-08-06 15时:30分',
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0],    
    index: 0,
    lcInfo: "中层",
    lcArr: ["高层", "中层", "低层"],
    ldInfo: "5栋",
    dyInfo: "5",
    mpInfo:"505B",
    houseName: "天机公馆",
    houseAddr: "建设路与大新路交汇处1003号",

    hxIndex: "",
    hxInfo: "1室0厅1卫",
    hxArr: [
      ['1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室', '9室'],
      ['0厅', '1厅', '2厅', '3厅', '4厅', '5厅', '6厅', '7厅', '8厅', '9厅'],
      ['0卫', '1卫', '2卫', '3卫', '4卫', '5卫', '6卫', '7卫', '8卫', '9卫',]
    ],
    mj: "98",
    yj: "888",
    qgj: "878",
    nxSub: 1,
    nxMsg: "",
    wySub: 0,
    wyMsg: "",
    dySub: 0,
    dyMsg: "",
    hbSub: 0,
    hbMsg: "",
    zxSub: 0,
    zxMsg: "",
    cxInfo: "南",  
    cxArr: ["东", "南", "西", "北", "东南", "东南", "东北", "西北"],
    wyArr: ["住宅", "公寓", "别墅", "商铺", "写字楼", "洋房", "商住楼", "综合体", "统建房", "福利房", "军产房"],
    currentTime: "",
    jyInfo:"2019-05-12",
    wyInfo:"住宅",
    nx: [
      { name: "不满两年", isOn: false, type: "nx" },
      { name: "满两年", isOn: false, type: "nx" },
      { name: "满五年", isOn: false, type: "nx" }
    ],
    wy: [
      { name: "唯一住房", isOn: false, type: "wy" },
      { name: "不唯一住房", isOn: false, type: "wy" }
    ],
    dy: [
      { name: "有抵押", isOn: false, type: "dy" },
      { name: "无抵押", isOn: false, type: "dy" }
    ],
    hb: [
      { name: "有红本", isOn: false, type: "hb" },
      { name: "无红本", isOn: false, type: "hb" }
    ],
    zx: [
      { name: "毛坯", isOn: false, type: "zx" },
      { name: "简装", isOn: false, type: "zx" },
      { name: "精装", isOn: false, type: "zx" },
      { name: "豪装", isOn: false, type: "zx" }
    ],

    fyMsg: '',
    fy: [
      { name: "满五年", isOn: true, type: "nx" },
      { name: "满两年", isOn: false, type: "nx" },
      { name: "唯一住房", isOn: false, type: "nx" },
      { name: "红本在手", isOn: false, type: "nx" },
      { name: "近地铁", isOn: false, type: "nx" },
      { name: "南北通透", isOn: false, type: "nx" },
      { name: "名校学区", isOn: false, type: "nx" },
      { name: "降价", isOn: false, type: "nx" }
    ],
    fmPic: [],
    slPic: [],
    hxPic: [],
    zbPic: [],
    spMsg: "",
    hzMsg: "",
    tgTitle:'',
    xm:'',
    dh:"",
    qyDate:"",
    cjPrice:"",
    cjUser: "",                   
    cjPhone:"",  

    cqArr: ["40年", "50年", "70年", "999年", "永久权限"],
    cqInfo: "",
    ndArr: [],
    ndInfo: '',
    xq: ""                     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

    if (e.id != undefined) {
      this.setData({
        hid:e.id
      })
    }
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          utoken:res.data.Token
        })
        that.getData();
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
  getData(e) {
    var that = this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetShootEstateById',
      header: { token: that.data.utoken },
      data: {
        Id: that.data.hid
      },
      success: res => {
        console.log(res);
        if (res.data.code == 1001) {
          that.setData({
            qyDate: res.data.data.DealDate,
            cjPrice: res.data.data.DealAmount+"万元",
            cjUser: res.data.data.DealFullName,
            cjPhone: res.data.data.DealTelePhone,
            house: res.data.data,
            time: res.data.data.ReserveTime,
            cityInfo: res.data.data.RegionId,
            houseName: res.data.data.VillageName,
            houseAddr: res.data.data.Address,
            lcInfo: res.data.data.StoreyH,
            hxInfo: res.data.data.CountF + "室" + res.data.data.CountT + "厅" + res.data.data.CountW + "卫",
            mj: res.data.data.ProductionAcreage,
            cxInfo: res.data.data.Orientation,
            wyInfo: res.data.data.PropertyType,
            cqInfo: res.data.data.PropertyYears,
            ndInfo: res.data.data.BuildYears,
            jyInfo: res.data.data.TransactionTime,
            xq: res.data.data.MatchingSchool,
            yj: res.data.data.OriginalSalePrice,
            qgj: res.data.data.BuySalePrice,
            nxSub: res.data.data.PurchaseYears - 1,
            nxMsg: res.data.data.PurchaseYears,
            wyMsg: res.data.data.IsOnly,
            dyMsg: res.data.data.IsMortgage,
            hbMsg: res.data.data.IsRedbook,
            zxSub: res.data.data.ShootEstateRenovation - 1,
            zxMsg: res.data.data.ShootEstateRenovation,
            fyMsg: res.data.data.ShootEstateTag,
            spMsg: res.data.data.ShootEvaluate,
            hzMsg: res.data.data.CooperationScheme,
            tgTitle: res.data.data.Name,
            xm: res.data.data.OwnerFullName,
            dh: res.data.data.OwnerTelephone
          })
          // 区域名称
          if (res.data.data.RegionId == 233) {
            that.setData({
              cityInfo: '深圳市'
            })
          }else if (res.data.data.RegionId == 2142){
            that.setData({
              cityInfo: '深圳市-罗湖区'
            })            
          }else if (res.data.data.RegionId == 2143) {
            that.setData({
              cityInfo: '深圳市-福田区'
            })
          } else if (res.data.data.RegionId == 2144) {
            that.setData({
              cityInfo: '深圳市-南山区'
            })
          } else if (res.data.data.RegionId == 2146) {
            that.setData({
              cityInfo: '深圳市-龙岗区'
            })
          } else if (res.data.data.RegionId == 3393) {
            that.setData({
              cityInfo: '深圳市-龙华区'
            })
          } else if (res.data.data.RegionId == 2145) {
            that.setData({
              cityInfo: '深圳市-宝安区'
            })
          } else if (res.data.data.RegionId == 3394) {
            that.setData({
              cityInfo: '深圳市-坪山区 '
            })
          } else if (res.data.data.RegionId == 3392) {
            that.setData({
              cityInfo: '深圳市-光明区'
            })
          } else if (res.data.data.RegionId == 2147) {
            that.setData({
              cityInfo: '深圳市-盐田区'
            })
          } else if (res.data.data.RegionId == 3395) {
            that.setData({
              cityInfo: '深圳市-大鹏新区'
            })
          }else{
            that.setData({
              cityInfo: '临深区域'
            })           
          }

          var monIndex = res.data.data.ReserveTime.substring(5, 7) - 1;
          var dayIndex = res.data.data.ReserveTime.substring(8, 10) - 1;
          that.setData({
            multiIndex: [0, monIndex, dayIndex, 0, 0]
          })
          // 物业类型
          if (res.data.data.PropertyType == 1) {
            that.setData({
              wyInfo: '住宅'
            })
          } else if (res.data.data.PropertyType == 2) {
            that.setData({
              wyInfo: '公寓'
            })
          } else if (res.data.data.PropertyType == 3) {
            that.setData({
              wyInfo: '别墅'
            })
          } else if (res.data.data.PropertyType == 4) {
            that.setData({
              wyInfo: '商铺'
            })
          } else if (res.data.data.PropertyType == 5) {
            that.setData({
              wyInfo: '写字楼'
            })
          } else if (res.data.data.PropertyType == 6) {
            that.setData({
              wyInfo: '洋房'
            })
          } else if (res.data.data.PropertyType == 7) {
            that.setData({
              wyInfo: '商住楼'
            })
          } else if (res.data.data.PropertyType == 8) {
            that.setData({
              wyInfo: '综合体'
            })
          } else if (res.data.data.PropertyType == 9) {
            that.setData({
              wyInfo: '统建房'
            })
          } else if (res.data.data.PropertyType == 10) {
            that.setData({
              wyInfo: '福利房'
            })
          } else if (res.data.data.PropertyType == 11) {
            that.setData({
              wyInfo: '军产房'
            })
          }           
          // 是否唯一  true false
          if (res.data.data.IsOnly) {
            that.setData({
              wySub: 0
            })
          } else {
            that.setData({
              wySub: 1
            })
          }
          // 有无抵押  true false
          if (res.data.data.IsMortgage) {
            that.setData({
              dySub: 0
            })
          } else {
            that.setData({
              dySub: 1
            })
          }
          // 红本在手  true false
          if (res.data.data.IsRedbook) {
            that.setData({
              hbSub: 0
            })
          } else {
            that.setData({
              hbSub: 1
            })
          }
          // 房源标签
          for (var i in that.data.fy) {
            console.log(res.data.data.ShootEstateTag.indexOf(that.data.fy[i].name));
            if (res.data.data.ShootEstateTag.indexOf(that.data.fy[i].name) > -1) {
              that.data.fy[i].isOn = true
              that.setData({
                fy: that.data.fy
              })
            }
          }
          // 房源图片
          for (var i in res.data.data.ShootEstatePicAllList) {
            if (res.data.data.ShootEstatePicAllList[i].Type == 2) {
              that.data.fmPic.push(res.data.data.ShootEstatePicAllList[i])
            } else if (res.data.data.ShootEstatePicAllList[i].Type == 3) {
              that.data.slPic.push(res.data.data.ShootEstatePicAllList[i])
            } else if (res.data.data.ShootEstatePicAllList[i].Type == 4) {
              that.data.hxPic.push(res.data.data.ShootEstatePicAllList[i])
            } else if (res.data.data.ShootEstatePicAllList[i].Type == 8) {
              that.data.zbPic.push(res.data.data.ShootEstatePicAllList[i])
            }
          }
          that.setData({
            fmPic: that.data.fmPic,
            slPic: that.data.slPic,
            hxPic: that.data.hxPic,
            zbPic: that.data.zbPic,
          })
          wx.hideLoading()
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
  }, 

  handleImagePreview(e) {
    console.log(e);
    const idx = e.target.dataset.idx
    if (e.target.dataset.t == "fm") {
      const images = this.data.fmPic
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    } if (e.target.dataset.t == "sl") {
      const images = this.data.slPic
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    } if (e.target.dataset.t == "hx") {
      const images = this.data.hxPic
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    } if (e.target.dataset.t == "zb") {
      const images = this.data.zbPic
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    }
  },

})