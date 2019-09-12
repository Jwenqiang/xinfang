const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isX:false,
    ips: [
      // { id: "1", title: "客厅图", isSelect: true },
      // { id: "2", title: "卧室图", isSelect: false },
      // { id: "3", title: "厨房图", isSelect: false },
      // { id: "4", title: "卫生间图", isSelect: false },
      // { id: "5", title: "阳台图", isSelect: false },
      // { id: "6", title: "户型图", isSelect: false },
      // { id: "7", title: "周边图", isSelect: false },
    ],
    house:"",
    current: 0,    
    content: [],
    urlList:[],
    idx:1,
    pidx:"",
    jjr: false,
    isShow: false,
    ewm:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      isX: app.isIphoneX
    })     
    console.log(e);
    var that=this;
    that.setData({
      pidx:e.t
    })
    that.getData();
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
  /**
    * item点击事件
    */
  onIpItemClick: function (event) {
    console.log(event);
    var that=this;
    if (event>0){
      var id = event;
    }else{
      var id = event.currentTarget.dataset.item.id;
    }
    
    var curIndex = 0;
    for (var i = 0; i < this.data.ips.length; i++) {
      if (id == this.data.ips[i].id) {
        this.data.ips[i].isSelect = true;
        curIndex = i;
        if(id==1){
          that.setData({
            current: 0, 
            content: that.data.house.ShootEstatePicRoomList
          })       
        }
        if(id==2){
          that.setData({
            current: 0, 
            content: that.data.house.ShootEstatePicBedroomList
          })          
        }
        if (id == 3) {
          that.setData({
            current: 0, 
            content: that.data.house.ShootEstatePicKitchenList
          }) 
        }
        if (id == 4) {
          that.setData({
            current: 0, 
            content: that.data.house.ShootEstatePicToiletList 
          })
        }
        else if (id == 5) {
          that.setData({
            current: 0, 
            content: that.data.house.ShootEstatePicBalconyList
          })
        }
        else if (id == 6) {
          that.setData({
            current: 0, 
            content: that.data.house.ShootEstatePicApartmentList 
          })
        }
        else if (id == 7) {
          that.setData({
            current: 0, 
            content: that.data.house.ShootEstatePicPeripheryList
          })
        }                                        
        
      } else {
        this.data.ips[i].isSelect = false;
      }
    }

    this.setData({
      idx: this.data.ips[curIndex].id,
      ips: that.data.ips,
    });
    console.log(this.data.ips[curIndex].id);
  },
  swiperChange: function (e) {
    console.log(e);
    if (e.detail.source == 'touch') {
        this.setData({
          current: e.detail.current
        })   
    }
  },
  openConfirm: function (e) {
    console.log(e);
    if (e.currentTarget.dataset.tel != '' && e.currentTarget.dataset.tel != null) {
      wx.showModal({
        title: String(e.currentTarget.dataset.tel),
        content: '点确认拨打上面的电话号码，并根据提示输入分机号',
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: e.currentTarget.dataset.tel,
            })
          } else {
            console.log('用户点击辅助操作')
          }
        }
      });
    } else {
      wx.showModal({
        title: String(e.currentTarget.dataset.m),
        content: '点确认拨打上面的手机号码',
        confirmText: "确认",
        cancelText: "取消",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: e.currentTarget.dataset.m,
            })
          } else {
            console.log('用户点击辅助操作')
          }
        }
      });
    }


  },
  getData:function(){
    var that=this;
    console.log(that.data.pidx);
    wx.getStorage({
      key: 'house',
      success: function(res) {
        console.log(res);
        if (res.data.BrokerCompanyId > 0) {
          that.setData({
            jjr: true
          })
        }
        that.setData({
          ips: res.data.ShootEstateImgTabList,
          house:res.data,
          ewm: res.data.BrokerStoreSale.WxQRcode,
          // content: res.data.ShootEstatePicRoomList
        })
        if(that.data.pidx==3){//客厅
          that.setData({
            content: res.data.ShootEstatePicRoomList
          })  
          that.onIpItemClick(1);        
        } else if (that.data.pidx == 4){//户型
          that.setData({
            content: res.data.ShootEstatePicApartmentList
          }) 
          that.onIpItemClick(6);              
        } else if (that.data.pidx == 5) {//卧室
          that.setData({
            content: res.data.ShootEstatePicBedroomList
          })
          that.onIpItemClick(2);  
        } else if (that.data.pidx == 6) {//厨房
          that.setData({
            content: res.data.ShootEstatePicKitchenList
          })
          that.onIpItemClick(3);  
        } else if (that.data.pidx == 7) {//卫生间
          that.setData({
            content: res.data.ShootEstatePicToiletList
          })
          that.onIpItemClick(4);  
        } else if (that.data.pidx == 8) {//周边
          that.setData({
            content: res.data.ShootEstatePicPeripheryList
          })
          that.onIpItemClick(7);  
        } else if (that.data.pidx == 9) {//阳台
          that.setData({
            content: res.data.ShootEstatePicBalconyList
          })
          that.onIpItemClick(5);  
        }
      },
    })
  },
  changeBig:function(e){
    var that=this;
    var arr=[];
    for (var i in that.data.content){
      arr.push(that.data.content[i].Url)
    }
    wx.previewImage({
      current: arr[e.currentTarget.dataset.idx], // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })    
  },
  show(e) {
    this.data.isShow = !this.data.isShow;
    this.setData({
      isShow: this.data.isShow
    })
  },  
  mBig(e) {
    wx.previewImage({
      current: this.data.ewm,
      urls: [this.data.ewm]
    })
  },  
})