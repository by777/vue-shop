/*
 * @Author: Xu Bai
 * @Date: 2020-07-03 23:21:38
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-08-19 21:13:59
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import GoodsList from '../components/goods/List.vue'
import Add from '../components/goods/Add.vue'
import Order from '../components/order/Order.vue'
import Report from '../components/report/Report'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
// error: Avoided redundant navigation to current location:报错显示是路由重复，
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
  component: Home,
  redirect: '/welcome',
  children: [
    { path: '/welcome', component: Welcome },
    { path: '/users', component: Users },
    { path: '/rights', component: Rights },
    { path: '/roles', component: Roles },
    { path: '/categories', component: Cate },
    { path: '/params', component: Params },
    { path: '/goods', component: GoodsList },
    { path: '/goods/add', component: Add },
    { path: '/orders', component: Order },
    { path: '/reports', component: Report }
  ]
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
