// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    currentTab:0,
    flag:0, 
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    indicatorDots:true,
    // imgUrls
    hdimg:[
      '/pictures/t01.jpg',
      '/pictures/t02.jpg',
      '/pictures/t03.jpg',
      '/pictures/t04.jpg',
    ],
     //是否采用衔接滑动
     circular: true,
     //是否显示画板指示点
     indicatorDots: true,
     //选中点的颜色
     indicatorcolor: "#000",
     //是否竖直
     vertical: false,
     //是否自动切换
     autoplay: true,
     //滑动动画时长毫秒
     duration: 1000,
     //所有图片的高度
     imgheights: [
       750,750,750,750
     ],
     //图片宽度
     imgwidth: 1000,
     //默认
     current:0
  },
  imageLoad: function (e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比
      ratio = imgwidth / imgheight;
    //console.log(imgwidth, imgheight)
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange: function (e) {
    //console.log(e.detail.current)
    this.setData({ current: e.detail.current})
  },
  seeDetail:function(e){
    var id = e.currentTarget.id;
    wx.navigateTo({
      url:'../subjectDetail/subjectDetail?id='+id
    })
  },
  stopTouchMove: function() {
    return false
  },
  switchNav:function(e){
    var page = this;
    var id = e.target.dataset.current;//变换置顶标签
    if(this.data.currentTab == id){
       return false;
    }else{
      page.setData({currentTab:id});
    }
    page.setData({flag:id});
  },
  onShareAppMessage:function(){//分享页面
    return{
      title:'卡路里检测',
      imageUrl: '/pictures/share.jpg',
      path:'/pages/travel/travel'
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
