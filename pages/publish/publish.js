// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityInfo: "",
    cityId:"",
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
    multiIndex: [0, 0],  
    index: 0,
    lcInfo:"",
    lcArr:["高层","中层","低层"],
    houseName:"",
    houseAddr:"",
    houseData:{}
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
  
    // if(e.name!=undefined){
    //   this.setData({
    //     houseName:e.name,
    //     houseAddr:e.addr
    //   })
    // }
    var that = this;
    wx.getStorage({
      key: 'houseData',
      success: function (res) {
        that.setData({
          houseName: res.data.VillageName,
          houseAddr: res.data.Address,
          lcInfo: res.data.StoreyH
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.getStorage({
      key: 'selectResult',
      success: function(res) {
        that.setData({
          houseName:res.data.name,
          houseAddr: res.data.addr
        })
      },
    })

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
      multiIndex: e.detail.value
    })
    var msg = this.data.cityArr[0][this.data.multiIndex[0]].name + "-" + this.data.cityArr[1][this.data.multiIndex[1]].name
    var id = this.data.cityArr[1][this.data.multiIndex[1]].id
    this.setData({
      cityInfo: msg,
      cityId:id
    })    
  },
  cityColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      cityArr: this.data.cityArr,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
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
            data.cityArr[1] = [{id:3397,name:"所有地区"}];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },



  lcMsg(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      lcInfo: this.data.lcArr[e.detail.value]
    })
  }, 
  goNext() {
    var dataList = this.data.houseName + "," + this.data.houseAddr +","+ this.data.lcInfo
    console.log(this.data.houseName)
    var that=this;
    if (that.data.cityId==''){
      wx.showToast({
        title: '请选择所在区域',
        icon: 'none'
      })       
    }else if (that.data.houseName==''){
      wx.showToast({
        title: '请选择小区',
        icon: 'none'
      })       
    } else if (that.data.lcInfo==''){
      wx.showToast({
        title: '请选择楼层',
        icon: 'none'
      })       
    }else{
      wx.showLoading({
        title: '',
      })      
      var list={}
      wx.getStorage({
        key: 'houseData',
        success: function(res) {
          list=res.data
        },
        complete(s){
          list.RegionId = that.data.cityId;
          list.VillageName = that.data.houseName;
          list.StoreyH = that.data.lcInfo.substring(0, 1);
          list.Address = that.data.houseAddr;
          console.log(list);
          that.setData({
            houseData: list
          })
          wx.setStorage({
            key: 'houseData',
            data: that.data.houseData,
            success: res => {
              wx.hideLoading()
              wx.navigateTo({
                url: '../pubTwo/pubTwo',
              })
            }
          })
        }
      })

    } 
  },
  setMsg(e){
    var that=this;
    var val=e.detail.value;
    if(val!=''&&val!=undefined){
      if(e.currentTarget.dataset.t=='mc'){
        that.setData({
          houseName:val
        })
      }
      if (e.currentTarget.dataset.t == 'dz'){
        that.setData({
          houseAddr: val
        })     
      }
    }
  },
  goSearch(e){
    wx.navigateTo({
      url: '../pubSearch/pubSearch?t=pub',
    })
  }   
})