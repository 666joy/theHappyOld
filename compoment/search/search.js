// pages/search.js

// Component({
//   /**
//    * 组件的属性列表
//    */
//   properties: {
//     key: {
//       type: String,
//       value: '', // 属性值 (可选)
//       observer: function(newVal, oldVal){ // 属性被改变时执行的函数(可选),可以监听外部值的改变，从而进行对应操作
//       }
//     }
//   },

//   /**
//    * 组件的初始数据
//    */
//   data: {
//     value: '' // 组件内自定义的数据
//   },
//   /**
//   * 组件生命周期函数，在组件实例进入页面节点树时执行
//   */
//   attached: function () {// 将外部传入的值复制给value，当然也可以直接使用key值 
//     this.setData({
//     value: this.data.key 
//   }) 
//   },
//   /**
//    * 组件的方法列表
//    */
//   methods: {
//     // 获取input中的值
//     getValue: function(e) {
//     // e.detail.value取到的就是input输入的值
//     this.setData({
//     value: e.detail.value
//   })
//   // 如果想要输入就向外部传值，则可以在这里传值
//   // this.triggerEvent('getKey', e.detail.value)
//   },
//   // 点击button才向外部传值
//   getSearchWords: function() {
//   this.triggerEvent('getKey', this.data.value)
//   }
//   }
// })

const App = getApp();
Component({
  // 组件的属性列表
  properties: {
    pageName: String, //中间的title
    showNav: { //判断是否显示左上角的按钮    
      type: Boolean,
      value: true
    },
    showHome: { //判断是否显示左上角的home按钮
      type: Boolean,
      value: true
    }
  },
  // 组件的初始数据
  data: {
    showNav: true, //判断是否显示左上角的home按钮
    showHome: true, //判断是否显示左上角的按钮
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      //console.log('123')
      this.setData({
        navHeight: App.globalData.navHeight, //导航栏高度
        navTop: App.globalData.navTop, //胶囊按钮与顶部的距离
        jnheight: App.globalData.jnheight, //胶囊高度
        jnwidth: App.globalData.jnwidth //胶囊宽度
      })
    }
  },
  // 组件的方法列表
  methods: {
    //回退
    navBack: function() {
      wx.navigateBack()
    },
    //回主页
    navHome: function() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
  
})