// pages/mine/mine.js
var app = getApp();
Page({
  data: {
    avatarUrl:"",//这里放了一张灰色头像图片
    nickName:"点击获取头像和昵称",//用户昵称
  },
  getUserProfile(){
    wx.getUserProfile({
      desc: '登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        })
        wx.setStorage({    //数据缓存方法
          key: 'nickName',   //关键字，本地缓存中指定的key
          data: res.userInfo.nickName,    //缓存微信用户公开信息，
          success: function() {      //缓存成功后，输出提示
            console.log('写入nickName缓存成功')
          },
          fail: function() {        //缓存失败后的提示
            console.log('写入nickName发生错误')
          }
        })
        wx.setStorage({    //数据缓存方法
          key: 'avatarUrl',   //关键字，本地缓存中指定的key
          data: res.userInfo.avatarUrl,    //缓存微信用户公开信息，
          success: function() {      //缓存成功后，输出提示
            console.log('写入avatarUrl缓存成功')
          },
          fail: function() {        //缓存失败后的提示
            console.log('写入avatarUrl发生错误')
          }
        })
      },
      fail: res => {
        console.log("获取用户信息失败", res)
      }
    })
   
  }, 
  // 退出登录
  loginout(){
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定')
          wx.setStorageSync('token', '');//将token置空
          wx.redirectTo({
            url: '/pages/mine/mine',//跳去登录页
          })
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
 
  to_distance(){
    wx.navigateTo({
      url: "/pages/volunteer_distance/volunteer_distance",
    })
  },
  onLoad: function (e) {
    // console.log("加载mine页面");
    // console.log(this.data.nickName);
  },
  onShow:function(e){
    console.log("加载mine页面");
    console.log(app.globalData.nickName);
  },
   /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    app.globalData.avatarUrl=this.data.avatarUrl;
    app.globalData.nickName=this.data.nickName;
    console.log("隐藏mine页面");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log("mine页面卸载");
  },
})