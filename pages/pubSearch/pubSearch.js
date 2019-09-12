Page({

  /**
   * 页面的初始数据
   */
  data: {
    utoken:"",
    focus: true,
    dList:[

    ],
    recordList:[
      { Name: "城市广场" },
      { Name: "欢乐家园" },
      { Name:"新河天地"},
    ],
    hName:"",
    goTo:"",
    allData:[],
    recordList:[],
    total:"",
    num:1,
    allData1: [],
    allData2: [],
    allData3: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e);
    wx.showLoading({
      title: '数据加载中',
      mask:true
    })
    if(e.t){
      this.setData({
        goTo: e.t
      })
    }
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          utoken:res.data.Token
        })
        // wx.getStorage({
        //   key: 'areaList',
        //   success: function(res) {},
        //   fail:err=>{
        //     that.getData(1, 2000)  
        //   }
        // })       
      },
      complete:y=>{
        that.getData() 
      }
    })
    // wx.getStorage({
    //   key: 'history',
    //   success: function(res) {
    //     that.setData({
    //       recordList: res.data, 
    //       // utoken: res.data.Token
    //     })
    //     that.getData(1, 2000)
    //     if (that.data.total > 2000) {
    //       var val=that.data.total-2000
    //       console.log(val)
    //       that.getData(2, val)
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
      title: '专业为您甄选最笋房源，想买房，买好房，就上找笋盘！',
      imageUrl: "../../img/share.jpg",
      path: '/pages/index/index'
    }
  },
  getData(idx,size){
    var that=this;
    console.log(that.data.utoken)
    wx.request({
      url: 'https://spapi.centaline.com.cn/SPXinFangApi/ShootEstate/GetDictionariesHousePageList',
      header:{token:that.data.utoken},
      data:{PageIndex:idx,PageSize:size},
      success:res=>{
        console.log(res);
        if(res.data.code==1001){
          that.setData({
            total:res.data.data.TotalRecord,
            num: Math.ceil(res.data.data.TotalRecord/2000)
            // allData: res.data.data.DataList
          }) 
          console.log(Math.round(res.data.data.TotalRecord / 2000));
          if (Math.round(res.data.data.TotalRecord / 2000)==1){
            that.setData({
              allData1: res.data.data.DataList.slice(0,2000)
            })
          } else if (Math.round(res.data.data.TotalRecord / 2000) == 2){
            that.setData({
              allData1: res.data.data.DataList.slice(0, 2000),
              allData2: res.data.data.DataList.slice(2000, res.data.data.TotalRecord)
            })           
          } else if (Math.round(res.data.data.TotalRecord / 2000) == 3) {
            that.setData({
              allData1: res.data.data.DataList.slice(0, 2000),
              allData2: res.data.data.DataList.slice(2000, 4000),
              allData3: res.data.data.DataList.slice(4000, res.data.data.TotalRecord),
            })
          }
          wx.hideLoading()
          // for (var i = 1; i <= that.data.num;i++){
          //   console.log(that.data.num)
          // }
          // if(idx==1){
          //   wx.setStorage({
          //     key: 'areaList',
          //     data: res.data.data.DataList,
          //     success:rr=>{
          //       that.setData({
          //         allData: res.data.data.DataList
          //       })
          //       if (that.data.total > 2000) {
          //         var val = that.data.total - 2000
          //         console.log(val)
          //         that.getData(2, val)
          //       } 
          //     }
            
          //   })
          // }else{
          //   wx.setStorage({
          //     key: 'areaList1',
          //     data: res.data.data.DataList,
          //     success: rr => {
          //       console.log('少于4000')
          //     }
          //   })            
          // }      
        }else{
          wx.hideLoading()
          wx.showModal({
            title: '错误提示',
            content: '登录信息已失效,请重新登录~',
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
  search: function (e) {
    var that=this;
    if (e.detail==undefined){
      var val = e;
    }else{
      var val = e.detail.value;
    }
    var arr=[];
    if(val!=''){
      var array=[];
      var all=that.data.allData1
      for (var i in all) {
        if (all[i].Name.indexOf(val) > -1) {
          arr.push(all[i]);
        }
      }
      if (that.data.allData2!=""){
        var all2 = that.data.allData2
        for (var i in all2) {
          if (all2[i].Name.indexOf(val) > -1) {
            arr.push(all2[i]);
          }
        }        
      }
      if (that.data.allData3 != "") {
        var all3 = that.data.allData3
        for (var i in all3) {
          if (all3[i].Name.indexOf(val) > -1) {
            arr.push(all3[i]);
          }
        }
      }
      that.setData({
        dList: arr
      })
      // wx.getStorage({
      //   key: 'areaList',
      //   success: function(res) {
      //     array = that.data;
      //     wx.getStorage({
      //       key: 'areaList1',
      //       success: function(r) {
      //         var all = array.concat(r.data);
      //         for (var i in all) {
      //           if (all[i].Name.indexOf(val) > -1) {
      //             arr.push(all[i]);
      //           }
      //         }
      //         that.setData({
      //           dList: arr
      //         })
      //       },
      //     })

      //   },
      // })
    }
  },
  setHistory(e){
    var that = this;
    var val = e.detail.value;
    that.search(val);
    if(val!=''){
      that.data.recordList.push(val);
    }   
    if (that.data.recordList.length>0){
     var arr = [...new Set(that.data.recordList)];
      console.log(arr);      
      wx.getStorage({
        key: 'history',
        success: function(res) {
          that.setData({
            recordList: [...new Set(res.data.concat(arr))]
          }) 
          wx.setStorage({
            key: 'history',
            data: that.data.recordList,
          })          
        },
        fail:err=>{
          wx.setStorage({
            key: 'history',
            data: that.data.recordList,
          })
        }
      })
    }
  },
  clearH(e){
    var that=this;
    wx.removeStorage({
      key: 'history',
      success: function(res) {
        that.setData({
          recordList:''
        })
      },
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  setMsg:function(e){
    var that=this;
    // if(that.data.goTo=="pub"){
    //   wx.navigateTo({
    //     url: '/pages/publish/publish?name=' + e.currentTarget.dataset.n + "&addr=" + e.currentTarget.dataset.a
    //   })
    // }else{
    //   wx.navigateTo({
    //     url: '/pages/goEdit/goEdit?name=' + e.currentTarget.dataset.n + "&addr=" + e.currentTarget.dataset.a
    //   })      
    // }
    wx.navigateBack({
      detail:1
    })
    wx.setStorage({
      key: 'selectResult',
      data: {
        name: e.currentTarget.dataset.n,
        addr: e.currentTarget.dataset.a
      },
    })
  },
  setInput:function(e){
    console.log(e);
    this.setData({
      hName: e.currentTarget.dataset.t,
      // focus:true
    })
    this.search(e.currentTarget.dataset.t)
  },
  getHname:function(e){

  }
})