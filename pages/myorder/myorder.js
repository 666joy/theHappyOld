// pages/willgo/willgo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    flag:0, 
    current:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  backbtn:function()
  {
    wx.navigateBack()
  },
  bindchange: function (e) {
    //console.log(e.detail.current)
    this.setData({ current: e.detail.current})
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
})