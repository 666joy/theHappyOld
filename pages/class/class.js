// pages/class/class.js
let that='';
var app = getApp();
// urlList = app.globalData.urlList;
Page({
  data:{
    avatarUrl:"",//这里放了一张灰色头像图片
    nickName:"点击获取头像和昵称",//用户昵称
  },
  // 生命周期函数--监听页面显示
  onLoad:function(e){
    // console.log(this.nickName);
    // console.log("加载class页面");
    // console.log(res.userInfo.nickName);
  },
  onShow:function(e){
    console.log("加载class页面");
    this.setData({
      avatarUrl:app.globalData.avatarUrl,
      nickName:app.globalData.nickName
    })
  },
  btnOneAction:function(){
  wx.navigateTo({
    url: '/pages/course/course',
  })
  },
  onShareAppMessage: function () {}
})
