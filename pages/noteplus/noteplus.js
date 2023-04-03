// pages/note/note.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  /** 跳转到个人中心页面 */
  send_note() {
    wx.showModal({
        title: '提示',
        content: '是否确认发布笔记',
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定')
                wx.showToast({
                    title: '发布成功',
                    duration: 1000,
                    success: function () {
                    setTimeout(function () {
                      // wx.redirectTo({
                      //   url: '../user/user',
                      // })
                      wx.navigateBack({
                        delta: getCurrentPages()-1,
                      })
                    }, 1000);
                 }
               })
                                                        
            }else{
               console.log('取消'),
               wx.showToast({
                title: '取消发布',
               })
            }

        }
    })
  },
})