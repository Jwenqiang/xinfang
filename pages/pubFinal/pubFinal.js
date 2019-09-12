// pages/pubFinal/pubFinal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    utoken:"",
    time: '',
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0],     
    tgTitle:"",
    xm:"",
    dh:"",
    isOn: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getYMH();
    var monIndex = new Date().getMonth();
    var dayIndex = new Date().getDate() - 1;
    this.setData({
      multiIndex: [0, monIndex, dayIndex, 0, 0]
    })  

// var that=this;
// wx.getStorage({
//   key: 'houseData',
//   success: function(res) {
//     if (res.data.Name){
//     that.setData({
//       tgTitle: res.data.Name,
//       xm: res.data.OwnerFullName,
//       dh: res.data.OwnerTelephone
//     })
//     var monIndex = res.data.ReserveTime.substring(5, 7) - 1;
//     var dayIndex = res.data.ReserveTime.substring(8, 10) - 1;
//     that.setData({
//       multiIndex: [0, monIndex, dayIndex, 0, 0]
//     })

//     }
  
//   },
// })

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
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          utoken: res.data.Token
        })
      },
    })
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
  getYMH: function () {
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
  setMsg(e){
    console.log(e);
    if(e.target.dataset.t=="bt"){
      this.setData({
        tgTitle:e.detail.value
      })
    } else if (e.target.dataset.t == "xm"){
      this.setData({
        xm: e.detail.value
      })      
    } else if (e.target.dataset.t == "dh") {
        this.setData({
          dh: e.detail.value
        })
    }
  },
  goFinal(e){      
    var that=this;
    if(that.data.time==''){
      wx.showToast({
        title: '请设置抢购时间',
        icon: 'none'
      })      
    } else if (that.data.tgTitle==''){
      wx.showToast({
        title: '请输入推广标题',
        icon: 'none'
      })         
    } else{
    wx.showToast({
      title: '发布中...',
      icon: 'loading',
      mask: true,
      duration: 10000
    }) 
    console.log(that.data.utoken)
    var list={};
    wx.getStorage({
      key: 'houseData',
      success: function(res) {
        list=res.data;
        list.ReserveTime=that.data.time;
        list.Name = that.data.tgTitle;
        list.OwnerFullName=that.data.xm;
        list.OwnerTelephone=that.data.dh;
        if(e.currentTarget.dataset.t=='yes'){
          list.State = 4
        }else{
          list.State = 3
        }
        wx.setStorage({
          key: 'houseData',
          data: list,
          success:r=>{
            wx.request({
              url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/AddShootEstate',
              header: {
                'token': that.data.utoken
              },              
              method:"post",
              data: {ShootEstate:list},
              success:obj=>{
                wx.hideToast();
                console.log(obj);
                if(obj.data.code==1001){
                  wx.showModal({
                    title: '成功',
                    content: '您的房源已发布成功！',
                    showCancel: false,
                    success: function (res) { 
                      wx.hideToast()
                      wx.removeStorage({
                        key: 'houseData',
                        success: function(res) {},
                      })
                      wx.reLaunch({
                        url: '../my/my',
                      })
                    }
                  })
                }else{
                  wx.showModal({
                    title: '错误',
                    content: '登录信息已失效，请重新登录！',
                    showCancel: false,
                    success: function (res) {
                      wx.hideToast()
                      wx.navigateTo({
                        url: '../login/login?ym=pubFinal',
                      })
                    }
                  })                  
                }
              }
            })
          }
        })
      },
    })
    }
  }
})