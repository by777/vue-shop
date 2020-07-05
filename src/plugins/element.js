/*
 * @Author: Xu Bai
 * @Date: 2020-07-05 11:13:51
 * @LastEditors: Xu Bai
 * @LastEditTime: 2020-07-05 22:42:02
 */
import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main, Menu, Submenu,
  MenuItemGroup, MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row, Col
} from 'element-ui'
// Message弹窗组件、有点区别，需要全局挂载

// 注册为全局可用的组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$message = Message
