// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// babel
import 'babel-polyfill'
// element-ui
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import './assets/css/default.scss'
import 'element-ui/lib/theme-chalk/index.css'
// 字体图标
import './assets/font/iconfont.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
