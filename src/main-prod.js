/*
 * @Author: Xu Bai
 * @Date: 2020-07-03 23:21:38
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-08-19 22:43:26
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import Nprogress from 'nprogress'
// import 'nprogress/nprogress.css'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// config就是请求对象，header头条件字段
// 在request拦截器中展示进度条
axios.interceptors.request.use(config => {
  Nprogress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在response中隐藏进度条
axios.interceptors.response.use(config => {
  Nprogress.done()
  return config
})
Vue.prototype.$http = axios
// 设置访问的根路径

// 每个vue的组件都能直接通过$http直接访问
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)
// 全局过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
