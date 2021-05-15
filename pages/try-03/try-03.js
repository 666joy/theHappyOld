// pages/try-03/try-03.js
Page({
  data:{
    book:[],
  },
  putimg: function(){// 添加照片
      let that=this;
      let img=that.data.img;
      let word=that.data.word;
      let word1=that.data.word1;
      wx.chooseImage({
        success: function(res) {
          that.setData({
            img:res.tempFilePaths[0], //赋予img图片地址（img）
            word: wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"), //将图片转为base64（word）
            word1: encodeURIComponent(wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], "base64"))//将base64转为urlencode
          })
        },
        count: 1,
      });
    },
  
    test: function(){ //获取百度api的access-token
      let that = this;
      let key =that.data.key;
      wx.request({
        url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=laVgfleAVTKrRUo8F9o31gGC&client_secret=YG3kUDg6C2HbkdmSwIRaq7QUlxPX84GN&',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
         that.setData({ key: res.data.access_token}) //获取access-token赋值为key
        },
        fail: function(){
          console.log("fail")
        }
      })  
    },
    
    test2: function(){
      let that =this;
      let key =that.data.key;
      let word = that.data.word;
      let word1 = that.data.word1;
      let book = that.data.book;
      wx.request({
        url: "https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token="+key,
        method: "POST",
        data:{
          image:word
        },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          that.setData({ book: res.data.result})
          console.log(res.data.result);
        },
      })
    },
 
})