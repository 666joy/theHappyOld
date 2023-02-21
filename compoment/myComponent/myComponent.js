// compoment/myComponent/myComponent.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      // value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    customMethod(){
      console.log('hello world! I am learning 微信小程序')
    },
    aa(){
      console.log('good')
    }
  },
  attached: function() {
    console.log('123');
    this.__proto__.customMethod();
    this.__proto__.aa();
  }
})
