
// const date = new Date();
// const years = [];
// const months = [];
// const days = [];
// const hours = [];
// const minutes = [];
// //获取年
// // for (let i = 2019; i <= date.getFullYear() + 5; i++) {
// //   years.push("" + i);
// // }
// years.push(date.getFullYear());
// //获取月份
// for (let i = 1; i <= 12; i++) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   months.push("" + i);
// }
// //获取日期
// for (let i = 1; i <= 31; i++) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   days.push("" + i);
// }
// //获取小时
// for (let i = 0; i < 24; i++) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   hours.push("" + i + '时');
// }
// //获取分钟
// for (let i = 0; i < 60; i++) {
//   if (i < 10) {
//     i = "0" + i;
//   }
//   minutes.push("" + i + '分');
// }  
Page({
  data: {
    yid:"",
    ystate:"",
    ymsg:"",
    utoken:"",
    role:"",
    index: 0,
    time: '',
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0],
    choose_year: '',

    orderData: "请选择时间",
    orderStyle:false

  },


  /**
  
  * 生命周期函数--监听页面加载
  
  */
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
  onLoad: function(options) {
    //设置默认的年份
    // this.setData({
    //   choose_year: this.data.multiArray[0][0]
    // })   
    // console.log(this.data.choose_year) ;
    this.getYMH();
    var monIndex = new Date().getMonth();
    var dayIndex = new Date().getDate()-1;
    this.setData({
      multiIndex: [0, monIndex, dayIndex,0,0]
    })
    console.log(monIndex);
    console.log(dayIndex);
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          utoken: res.data.Token,
          role: res.data.RoleType
        })
      }
    })
    console.log(that.data.utoken);
    if (options.yid) {
      that.setData({
        yid: options.yid,
        ystate: options.state
      })
    }    
  },
  getYMH:function(){
    const date = new Date();
    const years = [];
    const months = [];
    const days = [];
    const hours = [];
    const minutes = [];
    console.log(new Date().getFullYear());
    //获取年
    // for (let i = 2019; i <= date.getFullYear() + 5; i++) {
    //   years.push("" + i);
    // }
    years.push(date.getFullYear());
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
      hours.push("" + i + '时');
    }
    //获取分钟
    for (let i = 0; i < 60; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      minutes.push("" + i + '分');
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
    // console.log(this.data.time);
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
  changeV:function(e){
    this.setData({
      ymsg: e.detail.value
    })
  },
  setMsg:function(e){
    var that=this;
    if (that.data.time !="" && that.data.ymsg!=""){
      wx.request({
        url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/UpdateShootEstateReserveState',
        data: {
          Id: that.data.yid,
          State: 2,
          LeadLookHouseTime: that.data.time,
          PurchaseIntention: that.data.ymsg
        },
        method: "post",
        header: { token: that.data.utoken },
        success(res) {
          console.log(res);
          if (res.data.code == 1001) {
            wx.showToast({
              title: "操作成功",
            })
            setTimeout(function () {
              wx.navigateBack({
                delta:2
              })
            }, 500)
          } else {
            wx.showToast({
              title: res.data.message,
              icon: "none"
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: "必填项不能空着",
        icon: "none"
      })     
    }

  }

})