// pages/foodDetails/foodDetails.js
let energeTure=new Array();
let flag=new Array();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grandient:new Array(),
    energe:new Array(),
    flag:new Array(),
    length:false,
    load: true
  },
  showMore(e)
  {
    const i=e.currentTarget.dataset.index;
    if(!energeTure[i])
    {
      const db=wx.cloud.database();
      db.collection('food').where({
        name: this.data.grandient[i],
        })
      .get()
      .then(res=>{
        if(res.data.length==0)
        {
            db.collection('food').where({
             name:db.RegExp({
             regexp: this.data.grandient[i],
             options: 'i',
              })})
            .orderBy('name','asc')
            .get()
           .then(res=>{
            if(res.data.length==0)
             {
                console.log("获取失败",res)
                wx.showToast({
                  title: '暂时没有该食材的营养信息'
                })
             }
             else{
                console.log("获取成功",res);
                this.setData({
                  energe:res.data[0].info
                })
                if(res.data.length)
                {
                  flag[i]=true;
                  this.setData({
                    flag:flag
                  })
                  energeTure[i]=true;
                }
             }
            })
           .catch(err=>{
              console.log("获取失败",err);
            })
        }
        else{
          console.log("获取成功",res);
          this.setData({
            energe:res.data[0].info
          })
          if(res.data.length)
          {
            flag[i]=true;
            this.setData({
              flag:flag
            })
            energeTure[i]=true
          }
        }
      })
      .catch(err=>{
        console.log("获取失败",err);
      })
    }
    else
    {
      flag[i]=true;
      this.setData({
         flag:flag
      })
    }
  },
  close(e)
  {
    const i=e.currentTarget.dataset.index;
    flag[i]=false;
     this.setData({
        flag:flag
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    console.log(options.grandient);
    this.setData({
      grandient:options.grandient.split(',')
    })
    if(options.grandient.split(',')[0]!="")
    {
      this.setData({
        length:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      load:false
    })
    wx.hideLoading()
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

  }
})