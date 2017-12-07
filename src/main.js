//插件
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'

//组件
import router from './router'
import App from './app'

//数据
import store from './store'

//样式
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './lib/highlight.style.min.css'

//注册
Vue.use(VueResource)
Vue.use(ElementUI)

Vue.config.ignoredElements = ['page']  //取消page标签的检测
Vue.config.productionTip = false

/* eslint-disable no-new */
var $app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
