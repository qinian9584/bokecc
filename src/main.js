// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/css/main.scss"
import App from './App'
import router from './router'
import store from './store'//引入store
import i18n from './lang' // Internationalization
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  store,//使用store
  i18n,
  components: { App },
  template: '<App/>'
})
