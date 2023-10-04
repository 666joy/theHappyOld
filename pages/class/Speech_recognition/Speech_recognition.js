const recorderManager = wx.getRecorderManager()
const options = {
    duration: 60000,//指定录音的时长，单位 ms
    sampleRate: 16000,//采样率
    numberOfChannels: 1,//录音通道数
    encodeBitRate: 48000,//编码码率
    format: 'pcm',//音频格式，有效值 aac/mp3
  }
  var filesize,tempFilePath
Page({
    /**
     * 页面的初始数据
     */
    data: {
        token:'',
        content:''
    },

  onLoad(options) {
    //获取storge中的token
    let that=this;
    wx.getStorage({
        key:'expires_in',
        success(res){
            console.log("缓存中有access_token")
            console.log("token失效时间：",res.data)
            const newT = new Date().getTime();
            // 用当前时间和存储的时间判断，token是否已过期
            if (newT > parseInt(res.data)) {
                console.log("token过期，重新获取token")
                that.getToken();
            } else {
                console.log("获取本地缓存的token")
                that.setData({
                    token:wx.getStorageSync('access_token')
                });
            }
        },fail(){
            console.log("缓存中没有access_token")
            that.getToken();
        }
    });
  },

// 获取token
  getToken:function(){
    let that=this;
    let ApiKey='XQjmkbPCRLp95Yo4m2OrTmyF';//你自己的apikey
    let SecretKey='0w62A6yHhaOwvGTp6lofZF69i8tlufja';//你自己的SecretKey
    const url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id='+ApiKey+'&client_secret='+SecretKey
    wx.request({
        url:url,
        method: 'POST',
        success(res){
          console.log("创建access_token成功",res)
            //将access_token存储到storage中
            wx.setStorage({
              key:'access_token',
              data:res.data.access_token
            });
            var date=new Date().getTime();
            let time=date+2592000*1000;
            console.log('三十天后的时间',time);
            wx.setStorage({
              key:'expires_in',
              data:time
            });
            that.setData({
                token:res.data.access_token
            });
            },
    });
  },
  //开始录音
  touchStart: function () {
    wx.authorize({
      scope: 'scope.record',
      success() {
        console.log("录音授权成功");
        recorderManager.start(options);
        recorderManager.onStart(() => {
          console.log('recorder start')
        });
      },
      fail() {
        console.log("录音失败");
      },
  })
},

  //停止录音
  touchEnd: function () {
    let that = this
    recorderManager.stop();
    recorderManager.onStop((res) => {
    console.log('文件路径==', res)
    tempFilePath= res.tempFilePath;
    //获取文件长度
    wx.getFileSystemManager().getFileInfo({
        filePath: tempFilePath,
        success: function (res) {
          filesize = res.size
          console.log('文件长度', res)
          that.shibie()
        }, fail: function (res) {   
          console.log("读取文件长度错误",res);
        }
      })   
    });
  },
 //语音识别
 shibie(){
  let that = this
  wx.getFileSystemManager().readFile({
    filePath: tempFilePath,
    encoding: 'base64',
    success: function (res) {
      wx.request({
        url: 'https://vop.baidu.com/server_api',
        data: {
          token: that.data.token,
          cuid: "12_5625",
          format: 'pcm',
          rate: 16000,
          channel: 1,
          speech: res.data,
          len: filesize
        },
        headers: {
          'Content-Type': 'application/json' 
        }, 
        method: "post",
        success: function (res) {
            if (res.data.result == '') {
                wx.showModal({
                  title: '提示',
                  content: '听不清楚，请重新说一遍！',
                  showCancel: false
                })
                return;
            }
            console.log("识别成功==",res.data);
            that.setData({
               content:res.data.result
            })        
        },
        fail: function (res) {
          console.log("失败",res);
        }
      }); //语音识别结束
    }
  })     
 }
})