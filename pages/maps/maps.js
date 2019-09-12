// pages/my/my.js
// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
var mark = [{
  id: "1",
  latitude: "22.51229",
  longitude: "113.94064",
  iconPath: "../../img/mark.jpg",
  title: "海信南方大厦",
  // 标签      
  label: { content: "海信南方大厦", bgColor: "#fa5e3c", padding: "5px", borderRadius: "3", anchorX: "20", anchorY: "-40",color:"#fff" },
  // 气泡
  // callout: {
  //   content: "海信南方大厦",
  //   color: "#fff",
  //   fontSize: 14,
  //   padding: 5,
  //   borderRadius: 3,
  //   bgColor: "#fa5e3c",
  //   display: "ALWAYS",
  //   boxShadow: "2px 2px 10px #aaa"
  // },
  width: 40,
  height: 40
}];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectName:"",
    markers:mark,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '3XABZ-EAL33-UKR3S-YHJBW-QFHYK-VGFP3' // 必填
    });
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
  // 事件触发，调用接口
  nearby_search: function (n) {
    var _this = this;
    _this.setData({
      selectName: n.currentTarget.dataset.name
    })
    console.log(n.currentTarget);
    // 调用接口
    qqmapsdk.search({
      keyword: n.currentTarget.dataset.name,  //搜索关键词
      location: '22.512290,113.940640',  //设置周边搜索中心点
      circles:[{
        latitude: "22.51229",
        longitude: "113.94064",
        fillColor: "#ddd"
      }],
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            longitude: res.data[i].location.lng,
            latitude: res.data[i].location.lat,          
            iconPath: "../../img/mark1.png", //图标路径
            // callout: {
            //   content: res.data[i].title,
            //   color: "#2c8df6",
            //   fontSize: 20,
            //   borderRadius: 10,
            //   bgColor: "#fff",
            //   display: "ALWAYS",
            //   boxShadow: "2px 2px 10px #aaa"
            // },            
            width: 20,
            height: 30
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mark.concat(mks)
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
    //获取当前位置 
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       name: "自定义名称",
    //       scale: 28
    //     })
    //   }
    // })    
  },
  //点击标注点进行导航 
  gotohere: function (res) {
    console.log(res);
    // wx.openLocation({ // 打开微信内置地图，实现导航功能（在内置地图里面打开地图软件）
    //   latitude: 22.512290,
    //   longitude: 113.940640,
    //   name: "name",
    //   success: function (res) {
    //     console.log(res);
    //   },
    //   fail: function (res) {
    //     console.log(res);
    //   }
    // })

    let lat = ''; // 获取点击的markers经纬度
    let lon = ''; // 获取点击的markers经纬度
    let name = ''; // 获取点击的markers名称
    let markerId = res.markerId;// 获取点击的markers  id
    let markers = res.currentTarget.dataset.markers;// 获取markers列表
    console.log(markerId);
    console.log(mark);
    for (let item of mark) {
      console.log(item.id === markerId);
      if (item.id === markerId) {
        lat = Number(item.latitude);
        lon = Number(item.longitude);
        name = item.title;
        wx.openLocation({ // 打开微信内置地图，实现导航功能（在内置地图里面打开地图软件）
          latitude: lat,
          longitude: lon,
          name: name,
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          }
        })
        break;
      }
    }
  },



})