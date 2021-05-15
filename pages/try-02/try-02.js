// pages/try-02/try-02.js
var app = getApp();
var that = '';
Page({
  data: {
    img: 'http://r.photo.store.qq.com/psc?/V53g3jj51xYYHN1aGTvl0344zM2EMq9T/45NBuzDIW489QBoVep5mcT4rQKW9LeEFZCXHVno98OfE949IhXhJ5jUCzUGjBcSTOEC4kSvYjXYkVCkBS0s2WRw*ozXCxI3*PzRQ3vpcEGY!/r',
    imgB64: '',
    content: '',
    ishow: false,
    circleList: [],
    colorCircleFirst: '#FFDF2F',
    colorCircleSecond: '#FE4D32',
  },
  onLoad: function (options) {
    that = this;
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var circleList = [];
    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        topCircle = 15;
        leftCircle = 15;
      } else if (i < 6) {
        topCircle = 7.5;
        leftCircle = leftCircle + 102.5;
      } else if (i == 6) {
        topCircle = 15
        leftCircle = 620;
      } else if (i < 12) {
        topCircle = topCircle + 94;
        leftCircle = 620;
      } else if (i == 12) {
        topCircle = 565;
        leftCircle = 620;
      } else if (i < 18) {
        topCircle = 570;
        leftCircle = leftCircle - 102.5;
      } else if (i == 18) {
        topCircle = 565;
        leftCircle = 15;
      } else if (i < 24) {
        topCircle = topCircle - 94;
        leftCircle = 7.5;
      } else {
        return
      }
      circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
    }
    that.setData({
      circleList: circleList
    })
  },
  twinkle:function(){
    setInterval(function () {
      if (that.data.colorCircleFirst == '#FFDF2F') {
        that.setData({
          colorCircleFirst: '#FE4D32',
          colorCircleSecond: '#FFDF2F',
        })
      } else {
        that.setData({
          colorCircleFirst: '#FFDF2F',
          colorCircleSecond: '#FE4D32',
        })
      }
    }, 500)
  },
  chooseImg: function () {
    that.setData({
      ishow: false,
      content: ''
    });
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0];
        that.getB64ByUrl(tempFilePaths);
        that.setData({
          img: tempFilePaths
        });
      }
    })
  },
  getB64ByUrl: function (url) {
    const FileSystemManager = wx.getFileSystemManager();
    FileSystemManager.readFile({
      filePath: url,
      encoding: 'base64',
      success(res) {
        that.setData({
          imgB64: res.data
        });
      }
    })
  },
  
  foodTap: function (e) {
    const imgB64 = that.data.imgB64;
    if (!imgB64) {
      wx.showToast({
        title: '请上传图片',
      })
      return;
    };
    that.twinkle()
    that.getToken(function (token) {
      that.getResult(token);
    });
  },
  getToken: function (callback) {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=laVgfleAVTKrRUo8F9o31gGC&client_secret=YG3kUDg6C2HbkdmSwIRaq7QUlxPX84GN',
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
  getResult: function (token) {
    wx.request({
      url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=' + token,
      method: "post",
      data: {
        image: that.data.imgB64,
        baike_num: 1,
        top_num: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        that.setData({
          dishName: res.data.result[0].name,
          calorie: res.data.result[0].calorie,
          probability: res.data.result[0].probability,
          description: res.data.result[0].baike_info.description,
          image_url: res.data.result[0].baike_info.image_url,                    baike_url: res.data.result[0].baike_info.baike_url
        });
        wx.showModal({
          title: '菜品为' +that.data.dishName,
          content: '热量为' + that.data.calorie+'是否查看详情',
          success(res){
            if (res.confirm) {
              that.setData({ishow:true}) 
            }
            else{
              return
            }
          }
          
        })
       
      }
    });
  }
})
