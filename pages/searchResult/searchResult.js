// pages/searchResult/searchResult.js
let that='';
const app = getApp();
let i=0;
Page({
  data: {
    tag:'',
    list:new Array(),
    repairList:new Array(),
    record:false,
    grandient:new Array(),
    flag:new Array(),
    dishName:'',
    // page:1,
    pageSize:0,
    num:100,
    load:true
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    that=this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.setData({
      dishName:options.dishName,
      classid:options.classid
    })
    // console.log(this.data.dishName)
    if(this.data.dishName)
    this.getToken1(function (token) {//获取极速数据api的access-token
      that.getResult1(token);
    })
    if(this.data.classid)
    {
      this.getToken2(function (token) {//获取极速数据api的access-token
        that.getResult2(token);
      })
    }
  },
  further(e){
    var index=e.currentTarget.dataset['index'];
    let list = JSON.stringify(this.data.list[index]);
    wx.navigateTo({
          url: '../further/further?list='+encodeURIComponent(list),
        })
  },
  showMore(e){
    var index=e.currentTarget.dataset['index'];
    var grandient=new Array();
        for(var i=0;i<this.data.list[index].material.length;i++)
        {
          grandient[i]=this.data.list[index].material[i]['mname'];
        }
        that.setData({
          grandient:grandient
        })
    wx.navigateTo({
        url: '../foodDetails/foodDetails?grandient='+this.data.grandient+'&dishName='+this.data.list[index]['name'],
      })
  },
 
  getToken1: function (callback) {
    wx.request({
      url: 'https://api.jisuapi.com/recipe/search?keyword='+this.data.dishName+'num=1000&start=0&appkey=19d5a7a361fa3bf6',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success(res) {
        var token = res.data.access_token;
        return callback(token);
      }
    });
  },
  getResult1: function (token) {
    let that = this;
    wx.request({
      url: 'https://api.jisuapi.com/recipe/search?keyword='+this.data.dishName+'&num=1000&start='+that.data.pageSize+'&appkey=19d5a7a361fa3bf6',
      method: "post",
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res);
        String.prototype.replaceAll=function(a,b){//吧a替换成b
          var reg=new RegExp(a,"g"); //创建正则RegExp对象   
          return this.replace(reg,b); 
        }
        if(res.data.result!="")
        {
          var x=res.data.result.list;
          for(var i=0;i<x.length;i++)
          {
              x[i]['content']=x[i]['content'].replaceAll('<br />','');
              x[i]['tag']=x[i]['tag'].replaceAll('<br />','');
              for(var j=0;j<x[i]['process'].length;j++)
              {
                x[i]['process'][j]['pcontent']=x[i]['process'][j]['pcontent'].replaceAll('<br />','');
              }
          }
          that.setData({
            record:true
          });
        }
        else{
          wx.showToast({
            title: '搜索不到该菜品',
          })
          setTimeout(function () {
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];   //当前页面
            var prevPage = pages[pages.length - 2];  //上一个页面
            wx.navigateBack({//返回
              delta: 2
            })
           
          }, 1000); 
        }
        let repairList;
        if(res.result!='')
        {
          repairList=that.data.repairList.concat(res.data.result.list)
          that.setData({
            pageSize:that.data.pageSize+res.data.result.list.length,
            repairList:repairList
          })
          if(that.data.repairList.length<40&&res.data.result.list.length==20)
         {
            that.getResult1()
         }
      }
      if(res.data.result.list.length!=20||that.data.repairList.length>=40){
        that.setData({
          list:that.data.repairList,
        });
      }
      wx.hideLoading();
        // console.log(that.data.list);
      }
    });
  },
  getToken2: function (callback) {
    wx.request({
      url: 'https://api.jisuapi.com/recipe/byclass?num=1000&start=0&classid='+that.data.classid+"/"+'&appkey=19d5a7a361fa3bf6',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success(res) {
        var token = res.data.access_token;
        return callback(token);
      }
    });
  },
  getResult2: function (token) {
    let that=this;
    wx.request({
      url: 'https://api.jisuapi.com/recipe/byclass?num=1000&start='+that.data.pageSize+'&classid='+that.data.classid+'&appkey=19d5a7a361fa3bf6',
      method: "post",
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res);
        String.prototype.replaceAll=function(a,b){//吧a替换成b
          var reg=new RegExp(a,"g"); //创建正则RegExp对象   
          return this.replace(reg,b); 
        }
        if(res.data.result!="")
        {
          var x=res.data.result.list;
          for(var i=0;i<x.length;i++)
          {
              x[i]['content']=x[i]['content'].replaceAll('<br />','');
              x[i]['tag']=x[i]['tag'].replaceAll('<br />','');
              for(var j=0;j<x[i]['process'].length;j++)
              {
                x[i]['process'][j]['pcontent']=x[i]['process'][j]['pcontent'].replaceAll('<br />','');
              }
          }
          that.setData({
            record:true
          });
        }
        else{
          wx.showToast({
            title: '搜索不到该菜品',
          })
          setTimeout(function () {
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];   //当前页面
            var prevPage = pages[pages.length - 2];  //上一个页面
            wx.navigateBack({//返回
              delta: 2
            })
           
          }, 3000);
        }
        let repairList;
        if(res.result!='')
        {
          repairList=that.data.repairList.concat(res.data.result.list)
          that.setData({
            pageSize:that.data.pageSize+res.data.result.list.length,
            repairList:repairList
          })
          if(that.data.repairList.length<40&&res.data.result.list.length==20)
         {
            that.getResult2()
         }
      }
      if(res.data.result.list.length!=20||that.data.repairList.length>=40){
        that.setData({
          list:that.data.repairList,
        });
      }
      wx.hideLoading();
      console.log(that.data.list,that.data.pageSize);
      }
    });
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
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    if(that.data.pageSize%20==0){
      if(that.data.dishName)
      {
        that.getResult1();
      }
      else if(that.data.classid)
      {
        that.getResult2();
      }
    }
      else{
        wx.showToast({
          title: '你到了我的底线',
        })
      }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})