/*
 * @Author: Xu Bai
 * @Date: 2020-07-03 23:21:38
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-04 22:26:50
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/login',
  component: Login
},
{
  path: '/',
  redirect: '/login'
},
{
  path: '/home',
  component: Home
}
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
// next:是函数表示放行。next()或者next('要强制跳转的路径')
  if (to.path === '/login') { return next() }

  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
