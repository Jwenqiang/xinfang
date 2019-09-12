// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityInfo: "",
    cityId: "",
    cityArr: [
      [
        {
          id: 233,
          name: '深圳市'
        },
        {
          id: 3397,
          name: '临深区域'
        }
      ], [
        {
          id: 2142,
          name: '罗湖区'
        },
        {
          id: 2143,
          name: '福田区'
        },
        {
          id: 2144,
          name: '南山区'
        },
        {
          id: 2146,
          name: '龙岗区'
        },
        {
          id: 3393,
          name: '龙华区'
        },
        {
          id: 2145,
          name: '宝安区'
        },
        {
          id: 3394,
          name: '坪山区'
        },
        {
          id: 3392,
          name: '光明区'
        },
        {
          id: 2147,
          name: '盐田区'
        },
        {
          id: 3395,
          name: '大鹏新区'
        }
      ]
    ],
    cityIndex: [0, 0],      
    utoken:"",
    hid:"",
    cState:"",
    house:"",
    time: '',
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0],    
    index: 0,
    lcInfo: "",
    lcArr: ["高层", "中层", "低层"],
    ldInfo: "",
    dyInfo: "",
    mpInfo:"",
    houseName: "",
    houseAddr: "",

    hxIndex: "",
    hxInfo: "",
    hxArr: [
      ['1室', '2室', '3室', '4室', '5室', '6室', '7室', '8室', '9室'],
      ['0厅', '1厅', '2厅', '3厅', '4厅', '5厅', '6厅', '7厅', '8厅', '9厅'],
      ['0卫', '1卫', '2卫', '3卫', '4卫', '5卫', '6卫', '7卫', '8卫', '9卫',]
    ],
    wyInfo: "",
    mj: "",
    yj: "",
    qgj: "",
    nxSub: 1,
    nxMsg: "",
    wySub: 0,
    wyMsg: "-1",  
    dySub: 0,
    dyMsg: "-1",
    hbSub: 0,
    hbMsg: "-1",
    zxSub: 0,
    zxMsg: "",
    cxInfo: "",  
    cxArr: ["东", "南", "西", "北", "东南", "东南", "东北", "西北"],
    wyArr: ["住宅", "公寓", "别墅", "商铺", "写字楼", "洋房", "商住楼", "综合体", "统建房", "福利房", "军产房"],
    currentTime: "",
    jyInfo:"",
    wyInfo:"",
    nx: [
      { name: "不满两年", value: '1',  isOn: false, type: "nx" },
      { name: "满两年", value: '2',  isOn: false, type: "nx" },
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
      { name: "毛坯", value: "1", isOn: false, type: "zx" },
      { name: "简装", value: "2", isOn: false, type: "zx" },
      { name: "精装", value: "3", isOn: false, type: "zx" },
      { name: "豪装", value: "4", isOn: false, type: "zx" }
    ],

    fyMsg: '',
    fy: [
      { name: "刚需笋盘", isOn: false, type: "fy" },
      { name: "价格低", isOn: false, type: "fy" },
      { name: "近地铁", isOn: false, type: "fy" },
      { name: "满五唯一", isOn: false, type: "fy" },
      { name: "红本在手", isOn: false, type: "fy" },
      { name: "名校学区", isOn: false, type: "fy" },
      { name: "南北通透", isOn: false, type: "fy" }   
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
    hzMsg: "" ,

    tgTitle: "",
    xm: "",
    dh: "",
    isShow:false,
    isHide:false,
    isSel:false,
    showT:false,
    showS:false,

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
    // 避免地址混淆
    wx.removeStorage({
      key: 'selectResult',
      success: function (res) { },
    })    

    wx.showLoading({
      title: '',
      mask:"true"
    })  
    this.getY();
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          utoken: res.data.Token
        })
        wx.getStorage({
          key: 'editMsg',
          success: function (r) {
            that.setData({
              hid: r.data.Id,
              cState: r.data.cState,
            })
            // if(e.name){
            //   that.setData({
            //     isSel:true,
            //     sname:e.name,
            //     saddr:e.addr
            //   })
            // }
            that.getData();        
          },
        })
      },
      fail: err => {
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
    })
    that.getYMH();  
  },
  onShow(e){
    var that = this;
    wx.getStorage({
      key: 'selectResult',
      success: function (res) {
        that.setData({
          houseName: res.data.name,
          houseAddr: res.data.addr
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.removeStorage({
      key: 'selectResult',
      success(res) {
        console.log(res)
      }
    })
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
  cityChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cityIndex: e.detail.value
    })
    var msg = this.data.cityArr[0][this.data.cityIndex[0]].name + "-" + this.data.cityArr[1][this.data.cityIndex[1]].name
    var id = this.data.cityArr[1][this.data.cityIndex[1]].id
    this.setData({
      cityInfo: msg,
      cityId: id
    })
  },
  cityColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      cityArr: this.data.cityArr,
      cityIndex: this.data.cityIndex
    };
    data.cityIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.cityIndex[0]) {
          case 0:
            data.cityArr[1] = [
              {
                id: 2142,
                name: '罗湖区'
              },
              {
                id: 2143,
                name: '福田区'
              },
              {
                id: 2144,
                name: '南山区'
              },
              {
                id: 2146,
                name: '龙岗区'
              },
              {
                id: 3393,
                name: '龙华区'
              },
              {
                id: 2145,
                name: '宝安区'
              },
              {
                id: 3394,
                name: '坪山区'
              },
              {
                id: 3392,
                name: '光明区'
              },
              {
                id: 2147,
                name: '盐田区'
              },
              {
                id: 3395,
                name: '大鹏新区'
              }
            ];
            break;
          case 1:
            data.cityArr[1] = [{ id: 3397, name: "所有地区" }];
            break;
        }
        data.cityIndex[1] = 0;
        data.cityIndex[2] = 0;
        break;
    }
    console.log(data.cityIndex);
    this.setData(data);
  },  
  getY() {
    var that = this;
    var cYear = new Date().getFullYear();
    console.log(cYear);
    var year = [];
    for (var i = cYear; i > 1929; i--) {
      year.push(i);
    }
    that.setData({
      ndArr: year
    })
  },  
  getYMH: function () {
    const date = new Date();
    const years = [];
    const months = [];
    const days = [];
    const hours = [];
    const minutes = [];
    //获取年
    for (let i = 2019; i <= date.getFullYear() + 5; i++) {
      years.push("" + i);
    }
    // years.push(date.getFullYear());
    console.log(years);
    //获取月份
    for (let i = 1; i <= 12; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      months.push("" + i);
    }
    //获取日期
    for (let i = 1; i <= 31; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      days.push("" + i);
    }
    //获取小时
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      hours.push("" + i);
    }
    //获取分钟
    for (let i = 0; i < 60; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      minutes.push("" + i);
    }
    this.setData({
      multiArray: [years, months, days, hours, minutes]
    })
  },
  //获取时间日期
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    this.setData({
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    })
    console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },    
  lcMsg(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      lcInfo: this.data.lcArr[e.detail.value]
    })
  },
  getData(e) {
    var that = this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/GetShootEstateById',
      header: { token: that.data.utoken },
      data: {
        Id: that.data.hid
      },
      success: res => {
        console.log(res);
        if (res.data.code == 1001) {
          that.setData({
            house: res.data.data,
            time: res.data.data.ReserveTime,
            cityId: res.data.data.RegionId,
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
            nxSub: res.data.data.PurchaseYears-1,
            nxMsg: res.data.data.PurchaseYears,
            wyMsg: res.data.data.IsOnly,
            dyMsg: res.data.data.IsMortgage,
            hbMsg: res.data.data.IsRedbook,
            zxSub: res.data.data.ShootEstateRenovation-1,
            zxMsg: res.data.data.ShootEstateRenovation,
            fyMsg: res.data.data.ShootEstateTag,
            spMsg: res.data.data.ShootEvaluate,
            hzMsg: res.data.data.CooperationScheme,
            tgTitle: res.data.data.Name,
            xm: res.data.data.OwnerFullName,
            dh: res.data.data.OwnerTelephone
          })
          // if(that.data.isSel==true){
          //   that.setData({
          //     houseName: that.data.sname,
          //     houseAddr: that.data.saddr
          //   })
          // }
          // 区域名称
          console.log(res.data.data.RegionId )
          if (res.data.data.RegionId == 233) {
            that.setData({
              cityInfo: '深圳市'
            })
          } else if (res.data.data.RegionId == 2142) {
            that.setData({
              cityInfo: '深圳市-罗湖区'
            })
          } else if (res.data.data.RegionId == 2143) {
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
          } else {
            that.setData({
              cityInfo: '临深区域'
            })
          }



          var monIndex = res.data.data.ReserveTime.substring(5,7)-1;
          var dayIndex = res.data.data.ReserveTime.substring(8, 10)-1;
          that.setData({
            multiIndex: [0, monIndex, dayIndex, 0, 0]
          }) 
          // 物业类型
          if (res.data.data.PropertyType == 1) {
            that.setData({
              wyInfo:'住宅'
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
          if (res.data.data.IsOnly){
            that.setData({
              wySub: 0
            })
          }else{
            that.setData({
              wySub: 1
            })           
          }
          // 有无抵押  true false
          if (res.data.data.IsMortgage){
            that.setData({
              dySub: 0
            })            
          }else{
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
          for(var i in that.data.fy){
            console.log(res.data.data.ShootEstateTag.indexOf(that.data.fy[i].name));
            if (res.data.data.ShootEstateTag.indexOf(that.data.fy[i].name)>-1){
              that.data.fy[i].isOn=true
              that.setData({
                fy: that.data.fy
              })
            }
          }
          // 房源图片
          for (var i in res.data.data.ShootEstatePicAllList){
            if (res.data.data.ShootEstatePicAllList[i].Type==2){
              that.data.fmPic.push(res.data.data.ShootEstatePicAllList[i])
            } else if (res.data.data.ShootEstatePicAllList[i].Type == 3){
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

  goSearch(e) {
    wx.navigateTo({
      url: '../pubSearch/pubSearch?t=goEdit',
    })
  },
  setNum: function (e) {
    console.log(e);
    if (e.currentTarget.dataset.t == "lc") {
      this.setData({
        lcInfo: e.detail.value
      })
    } else if (e.currentTarget.dataset.t == "dy") {
      this.setData({
        dyInfo: e.detail.value
      })
    } else if (e.currentTarget.dataset.t == "mp") {
      this.setData({
        mpInfo: e.detail.value
      })
    }

  },  

// 第二版
  hxMsg: function (e) {
    console.log(e);
    var info = this.data.hxArr[0][e.detail.value[0]] + this.data.hxArr[1][e.detail.value[1]] + this.data.hxArr[2][e.detail.value[2]];
    console.log(info);
    this.setData({
      hxIndex: e.detail.value,
      hxInfo: info
    })
  },
  cxMsg(e) {
    console.log(e);
    this.setData({
      cxInfo: this.data.cxArr[e.detail.value]
    })
  },
  wyMsg(e) {
    console.log(e);
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
  setNum: function (e) {
    console.log(e);
    if (e.currentTarget.dataset.t == "mj") {
      this.setData({
        mj: e.detail.value
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
    } else if (e.currentTarget.dataset.type == "wy") {
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

  addOnM(e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx;
    var arrL = [];
    that.data.fy[idx].isOn = !that.data.fy[idx].isOn;
    that.setData({
      fy: that.data.fy
    })
    for (var i in that.data.fy) {
      if (that.data.fy[i].isOn) {
        // arrL.push(that.data.fy[i].name)
        if (arrL.length < 5) {
          arrL.push(that.data.fy[i].name)
        } else {
          wx.showToast({
            title: '最多选5个标签',
            icon: 'none'
          })
          that.data.fy[i].isOn = false
          that.setData({
            fy: that.data.fy
          }) 
        }        
      }
    }
    that.setData({
      fyMsg: String(arrL)
    })
  },
  selectPic(e) {
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        //启动上传等待中...
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        // that.data.slPic = slPic.length <= 3 ? slPic : slPic.slice(0, 3)
        if (e.target.dataset.t == "fm") {
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
                    // url: 'https://spapi.centaline.com.cn/System/PostImgListByBase64',
                    url: 'https://spapi.centaline.com.cn/System/PostImgListShootEstateByBase64',
                    method: "post",
                    data: {
                      ImgBase64: baseArr,
                      Type: 2,
                      ShootEstateType: 2,
                      ShootEstateId:that.data.hid
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
                          success: function (res) { }
                        })
                      }
                    }
                  })
                }


              }
            })
          }



        } if (e.target.dataset.t == "sl") {
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
                    url: 'https://spapi.centaline.com.cn/System/PostImgListShootEstateByBase64',
                    method: "post",
                    data: {
                      ImgBase64: baseArr,
                      Type: 3,
                      ShootEstateType: 2,
                      ShootEstateId: that.data.hid
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
                          success: function (res) { }
                        })
                      }
                    }
                  })
                }


              }
            })
          }
        } if (e.target.dataset.t == "hx") {
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
                    url: 'https://spapi.centaline.com.cn/System/PostImgListShootEstateByBase64',
                    method: "post",
                    data: {
                      ImgBase64: baseArr,
                      Type: 4,
                      ShootEstateType: 2,
                      ShootEstateId: that.data.hid
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
                          success: function (res) { }
                        })
                      }
                    }
                  })
                }


              }
            })
          }
        } if (e.target.dataset.t == "zb") {
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
                    url: 'https://spapi.centaline.com.cn/System/PostImgListShootEstateByBase64',
                    method: "post",
                    data: {
                      ImgBase64: baseArr,
                      Type: 8,
                      ShootEstateType: 2,
                      ShootEstateId: that.data.hid
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
                          success: function (res) { }
                        })
                      }
                    }
                  })
                }


              }
            })
          }
        }
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    var id = e.target.dataset.id
    var gid = e.target.dataset.gid
    wx.showModal({
      title: '提示',
      content: '确认删除该图片吗？（删除成功后将不能恢复）',
      success:y=>{
        if(y.confirm){
          if (e.target.dataset.t == "fm") {
            if(id!=null&&id!=undefined&&id!=''){
              this.delPic(id);
            } else if (gid != null && gid != undefined && gid != ''){
              this.delPic(gid);
            }
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
        }
      }
    })
  },
  delPic(e){
    var that=this;
    wx.request({
      url: 'https://spapi.centaline.com.cn/ShootEstate/DelShootEstatePic',
      header:{token:that.data.utoken},
      data: { id:e},
      success:res=>{
        console.log(res);
        if(res.data.code==1001){

        } else if (res.data.Message ='已拒绝为此请求授权。'){
          wx.navigateTo({
            url: '../login/login',
          })
        }
      }
    })
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
    } if (e.target.dataset.t == "sl") {
      var pic = this.data.slPic
      var images = [];
      for (var i in pic) {
        images.push(pic[i].Url)
      }
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    } if (e.target.dataset.t == "hx") {
      var pic = this.data.hxPic
      var images = [];
      for (var i in pic) {
        images.push(pic[i].Url)
      }
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    } if (e.target.dataset.t == "zb") {
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
  getSp(e) {
    console.log(e);
    this.setData({
      spMsg: e.detail.value
    })
  },
  getHz(e) {
    console.log(e.detail.value);
    this.setData({
      hzMsg: e.detail.value
    })
    console.log(this.data.hzMsg)
  } , 
  setMsg(e) {
    console.log(e);
    if (e.target.dataset.t == "bt") {
      this.setData({
        tgTitle: e.detail.value
      })
    } else if (e.target.dataset.t == "xm") {
      this.setData({
        xm: e.detail.value
      })
    } else if (e.target.dataset.t == "dh") {
      this.setData({
        dh: e.detail.value
      })
    }
  },
  setAddr(e) {
    var that = this;
    var val = e.detail.value;
    if (val != '' && val != undefined) {
      if (e.currentTarget.dataset.t == 'mc') {
        that.setData({
          houseName: val
        })
      }
      if (e.currentTarget.dataset.t == 'dz') {
        that.setData({
          houseAddr: val
        })
      }
    }
  },

  saveAll(e){
    var that=this;
    console.log(that.data.time)
    var val=e.currentTarget.dataset.t;
    if(val!=undefined){
      console.log(val)
      that.setData({
        cState:val
      })
    }
    var list = {};
    var shi = that.data.hxInfo.substring(0, 1)
    var ting = that.data.hxInfo.substring(2, 3)
    var wei = that.data.hxInfo.substring(4, 5)    
    list.Id = that.data.hid;
    list.State = that.data.cState;
    list.ReserveTime = that.data.time;
    list.RegionId=that.data.cityId;
    list.VillageName=that.data.houseName;
    list.Address = that.data.houseAddr;
    list.StoreyH = that.data.lcInfo;
    list.CountF=shi;
    list.CountT=ting;
    list.CountW=wei;
    list.ProductionAcreage = that.data.mj;
    list.Orientation = that.data.cxInfo;
    // list.PropertyType = that.data.wyInfo
    if (that.data.wyInfo == '住宅') {
      list.PropertyType = 1;
    } else if (that.data.wyInfo == '公寓') {
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

    list.OriginalSalePrice = that.data.yj
    list.BuySalePrice = that.data.qgj
    list.PurchaseYears = that.data.nxMsg
    list.IsOnly = that.data.wyMsg
    list.IsMortgage = that.data.dyMsg;
    list.IsRedbook = that.data.hbMsg;
    list.ShootEstateRenovation = that.data.zxMsg;
    list.ShootEstateTag = that.data.fyMsg;
    list.ShootEvaluate = that.data.spMsg
    list.CooperationScheme = that.data.hzMsg;
    list.Name = that.data.tgTitle;
    list.OwnerFullName = that.data.xm;
    list.OwnerTelephone = that.data.dh;
    console.log(list);
    if (that.data.houseName == '') {
      wx.showToast({
        title: '请填写小区名称',
        icon: 'none'
      })
    } else if (that.data.lcInfo == '') {
      wx.showToast({
        title: '请选择楼层',
        icon: 'none'
      })
    } else if (that.data.mj == '') {
      wx.showToast({
        title: '请填写面积',
        icon: 'none'
      })
    } else if (that.data.cxInfo == '') {
      wx.showToast({
        title: '请选择朝向',
        icon: 'none'
      })
    } else if (that.data.wyInfo == '') {
      wx.showToast({
        title: '请选择物业类型',
        icon: 'none'
      })
    } else if (that.data.jyInfo == '') {
      wx.showToast({
        title: '请选择上次交易时间',
        icon: 'none'
      })
    } else if (that.data.yj == '') {
      wx.showToast({
        title: '请填写原价格',
        icon: 'none'
      })
    } else if (that.data.qgj == '') {
      wx.showToast({
        title: '请填写抢购价格',
        icon: 'none'
      })
    } else if (that.data.nxMsg == '') {
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
    }  else if (this.data.zxMsg == '') {
      wx.showToast({
        title: '请选择装修情况',
        icon: 'none'
      })
    }else if (that.data.fyMsg == '') {
      wx.showToast({
        title: '请选择房源标签',
        icon: 'none'
      })
    } else if (that.data.fmPic.length != 3) {
      wx.showToast({
        title: '请上传3张封面图',
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
    } else if (that.data.tgTitle == '') {
      wx.showToast({
        title: '请输入推广标题',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '保存中...',
        icon: 'loading',
        mask: true,
        duration: 10000
      }) 
      console.log({ ShootEstate: list, Id: that.data.hid});
      wx.request({
        url: 'https://spapi.centaline.com.cn/ShootEstate/UpdateShootEstate',
        method:"post",
        header: { token: that.data.utoken },
        data: { ShootEstate: list},
        success: obj => {
          console.log(obj);
          if (obj.data.code == 1001) {
            wx.showModal({
              title: '成功',
              content: '您的房源已重新编辑成功！',
              showCancel: false,
              success: function (res) {
                wx.navigateBack({
                  detail:1
                })
              }
            })
          } else if(obj.data.message=='已拒绝为此请求授权。') {
            wx.showModal({
              title: '错误',
              content: '登录信息已失效，请重新登录！',
              showCancel: false,
              success: function (res) {
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            })
          }else{
            console.log(obj.data.message)
            wx.showModal({
              title: '错误',
              content: obj.data.message,
              showCancel: false,
            })            
          }
          wx.hideToast();
        }      
      })
    }
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