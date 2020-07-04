/*
 * @Author: Xu Bai
 * @Date: 2020-07-03 23:21:38
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-04 21:34:03
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
Vue.prototype.$http = axios
// 设置访问的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 每个vue的组件都能直接通过$http直接访问
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
