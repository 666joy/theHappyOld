// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    currentTab:0,
    flag:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    indicatorDots:true,
    imgUrls:[
      'http://r.photo.store.qq.com/psc?/V53g3jj51xYYHN1aGTvl0344zM2EMq9T/45NBuzDIW489QBoVep5mcRT.EdV7iP8g4Bv*atLtk**lqlm69Z*aKd5ZpalrMbnfK2UBMnBSmZSur2uFJsXRebr9lxTFcHcom9BqAkpHkOs!/r',
      'http://r.photo.store.qq.com/psc?/V53g3jj51xYYHN1aGTvl0344zM2EMq9T/45NBuzDIW489QBoVep5mcWkdkHA5iMDkDNZHI.7agV92KH5w9mrpEZFUwjoaa6ihPQhk*ay0F1GPDzYF2LcP1Y9BiW.u*Zt3eCY5gzyGquc!/r',
      'http://r.photo.store.qq.com/psc?/V53g3jj51xYYHN1aGTvl0344zM2EMq9T/45NBuzDIW489QBoVep5mcWkdkHA5iMDkDNZHI.7agV8Q.UJSBB0.72J*lI6sup*YujRUKRDC*gQg8lt1i7f5zGm4FL2Otw598Ex1qeJ91qs!/r',
      'http://r.photo.store.qq.com/psc?/V53g3jj51xYYHN1aGTvl0344zM2EMq9T/45NBuzDIW489QBoVep5mcWkdkHA5iMDkDNZHI.7agV9WIinKuh7T1.WzbJnii4fAzgineimbiH3X9VmGtsZIw1.0TtqOmzdibhVFEp1NHVk!/r',
      'http://r.photo.store.qq.com/psc?/V53g3jj51xYYHN1aGTvl0344zM2EMq9T/45NBuzDIW489QBoVep5mcWkdkHA5iMDkDNZHI.7agV9s9Cl6X1VQHAJLmabV49Vdtj7Zf9nD9oPnPovAi9tDgF*Ypq24VFLwQ03AIgWa1D0!/r',
      'http://r.photo.store.qq.com/psc?/V53g3jj51xYYHN1aGTvl0344zM2EMq9T/45NBuzDIW489QBoVep5mcQiNAW4hdlJO0lPPtZXENqZFOGLxN0F6VR2gkjdCIGSU0KE*lFzN*2tFOO9gtLexGcrrJbTXJ6w3ok4iZ*eb4ec!/r',
    ]
  },
  seeDetail:function(e){//美食推荐轮播
    var id = e.currentTarget.id;
    wx.navigateTo({
      url:'../subjectDetail/subjectDetail?id='+id
    })
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
      desc:'菜品识别',
      path:'/pages/index/index.js'
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
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
  },
  kaluli(){
    wx.navigateTo({
      url: '/pages/try-04/try-04?name1=value1&name2=value2',
    })
  },
})
